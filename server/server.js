// Import dependencies
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const Razorpay = require('razorpay');

const app = express();

// Middleware setup
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

// MySQL connection check
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

// ✅ Create Razorpay order endpoint
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

// ✅ Save user to MySQL endpoint
app.post('/save-user', (req, res) => {
    const { name, phone, address, country, paymentId } = req.body;

    const sql = `INSERT INTO users (name, phone, address, country, paymentId) VALUES (?, ?, ?, ?, ?)`;
    db.query(sql, [name, phone, address, country, paymentId], (err, result) => {
        if (err) {
            console.error('❌ Error saving user:', err);
            res.status(500).send('Error saving user to database');
        } else {
            console.log('✅ User saved:', result.insertId);
            res.json({ status: 'User saved successfully' });
        }
    });
});

// ✅ Start server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
