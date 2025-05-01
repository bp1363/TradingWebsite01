require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const Razorpay = require('razorpay');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// ✅ MySQL connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

db.connect((err) => {
    if (err) {
        console.error('❌ MySQL connection failed:', err);
    } else {
        console.log('✅ Connected to MySQL database');
    }
});

// ✅ Razorpay setup
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

// ✅ Create order
app.post('/create-order', async (req, res) => {
    const { amount } = req.body;

    try {
        const order = await razorpay.orders.create({
            amount,
            currency: 'INR',
            receipt: 'receipt#1',
        });
        res.json(order);
    } catch (err) {
        console.error('❌ Razorpay order error:', err);
        res.status(500).send('Error creating order');
    }
});

// ✅ Save user (disable download by default)
app.post('/save-user', (req, res) => {
    const { name, phone, address, country, paymentId } = req.body;

    const sql = `INSERT INTO users (name, phone, address, country, paymentId, canDownload) VALUES (?, ?, ?, ?, ?, ?)`;
    db.query(sql, [name, phone, address, country, paymentId, false], (err, result) => {
        if (err) {
            console.error('❌ Error saving user:', err);
            res.status(500).send('Error saving user to database');
        } else {
            console.log('✅ User saved:', result.insertId);
            // Return the download link anyway (access will be restricted)
            const downloadLink = `http://localhost:5000/download/${paymentId}`;
            res.json({ status: 'User saved successfully', downloadLink });
        }
    });
});

// ✅ Download route (check canDownload = true)
app.get('/download/:paymentId', (req, res) => {
    const { paymentId } = req.params;

    const sql = `SELECT * FROM users WHERE paymentId = ?`;
    db.query(sql, [paymentId], (err, results) => {
        if (err) {
            return res.status(500).send('Server error');
        }

        if (results.length === 0) {
            return res.status(404).send('User not found');
        }

        const user = results[0];
        if (!user.canDownload) {
            return res.status(403).send('Access denied. You are not allowed to download this file yet.');
        }

        const filePath = path.join(__dirname, 'downloadable', 'secret-file.pdf');
        res.download(filePath);
    });
});

// ✅ Delete all users and reset auto-increment
app.delete('/delete-users', (req, res) => {
    const sqlDelete = 'DELETE FROM users';

    db.query(sqlDelete, (err, result) => {
        if (err) {
            console.error('❌ Error deleting users:', err);
            return res.status(500).send('Error deleting users');
        }

        // Reset auto-increment value to start from 1 again
        const sqlResetAutoIncrement = 'ALTER TABLE users AUTO_INCREMENT = 1';

        db.query(sqlResetAutoIncrement, (err, result) => {
            if (err) {
                console.error('❌ Error resetting auto-increment:', err);
                return res.status(500).send('Error resetting auto-increment');
            }

            res.json({ status: 'Users deleted and auto-increment reset to 1' });
        });
    });
});

// ✅ Start server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
