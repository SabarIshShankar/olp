import React from "react";
import "./styles.css";
import "w3-css/w3.css";

function Bg() {
  return (
    <div class="wrapper">
      <div className="wp-block-cover-image has-background-dim w3-padding-32">
        <div className="w3-row w3-padding-16 " id="">
          <div className="w3-padding-small">
            <div className="w3-container w3-left w3-padding-16 wp-block-cover-image-text">
              <h1 className="w3-xxxlarge">Your next stop for your fashion. </h1>
              <h3>
                Enabling you to buy, sell and share fashion. A community built
                for you.
              </h3>

              <button type="button" className="button">
                Start
              </button>
              <button type="button" className="button">
                Playstore
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Bg;
