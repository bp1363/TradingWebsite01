import React from 'react';
import './AlgoSignalSetup.css';
import Footer from '../components/Footer';

// Importing images from assets folder
import setup3 from '../assets/setup3.png';
import setup4 from '../assets/setup4.png';
import setup5 from '../assets/setup5.png';

const AlgoSignalSetup = () => {
  return (
    <div className="setup-container">
      <div className="setup-header">
        <h1>How to set up Algo Signal on TradingView</h1>
        <p>
          *If you would like us to set up Algo Signal for you, make sure to select "Yes" in the first option when purchasing Algo Signal.
        </p>
      </div>

      <div className="setup-step">
        <h2>Step 1</h2>
        <p>
          You will need a TradingView account, create one if you don't have it already on <br />
          <a
            href="https://tradingview.com"
            target="_blank"
            rel="noopener noreferrer"
            className="link"
          >
            tradingview.com
          </a>
        </p>
        <p className="note">(You don't need a premium TradingView account to run Algo Signal)</p>
      </div>

      <div className="setup-step">
        <h2>Step 2</h2>
        <p>
          After a successful purchase, you will receive the script for the indicator in your email, copy that script.
        </p>
      </div>

      {/* Tutorial Card Section */}
      <div className="tutorial-steps">
        <div className="tutorial-step">
          <img src={setup3} alt="Step 3" className="tutorial-img" />
          <div className="tutorial-text">
            <h3>Step 3</h3>
            <p>
              Then you will need to create a new script in TradingView. <br />
              To do that, open up <strong>Pine Editor</strong>.
            </p>
          </div>
        </div>

        <div className="tutorial-step">
          <img src={setup4} alt="Step 4" className="tutorial-img" />
          <div className="tutorial-text">
            <h3>Step 4</h3>
            <p>
              Paste the script in the <strong>Pine Editor</strong>.
            </p>
          </div>
        </div>

        <div className="tutorial-step">
          <img src={setup5} alt="Step 5" className="tutorial-img" />
          <div className="tutorial-text">
            <h3>Step 5</h3>
            <p>
              After pasting the script, click <strong>Save</strong> and then <strong>Add to chart</strong>. <br />
              Enjoy the amazing Algo Signal.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AlgoSignalSetup;


