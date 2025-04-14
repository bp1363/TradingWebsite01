// src/Tutorial/TradingView_Alert.js
import React from "react";
import Footer from "../components/Footer";
import "./TradingViewAlert.css";

// Import images from assets
import trade1 from "../assets/trade1.png";
import trade2 from "../assets/trade2.png";
import trade3 from "../assets/trade3.png";

const TradingViewAlert = () => {
  return (
    <div>
      <h1>How to set up Algo Signal alerts on TradingView</h1>
      
      {/* New Card-Style Step Section */}
      <div className="tutorial-steps">
        <div className="tutorial-step">
          <img src={trade1} alt="Step 1" className="tutorial-img" />
          <div className="tutorial-text">
            <h3>Step 1</h3>
            <p>
              Move your cursor to the upper right, on Algo Signal, and click on
              the three (3) dots. <strong>Pine Editor</strong>.
            </p>
          </div>
        </div>

        <div className="tutorial-step">
          <img src={trade2} alt="Step 2" className="tutorial-img" />
          <div className="tutorial-text">
            <h3>Step 2</h3>
            <p>Click on the first option: "Add alert on Algo Signal"</p>
          </div>
        </div>

        <div className="tutorial-step">
          <img src={trade3} alt="Step 3" className="tutorial-img" />
          <div className="tutorial-text">
            <h3>Step 3</h3>
            <p>
              Select which Algo Signals you would like to receive (BUY or SELL)
              and click Create. Finished!
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TradingViewAlert;
