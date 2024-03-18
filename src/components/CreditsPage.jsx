import React from "react";
import "../style/CreditsPage.css";

const CreditsPage = () => {
  return (
    <div className="credits-container">
      <h1>Credits</h1>
      <div className="links">
        <p>
          Our Websites:
          <p></p>
          <a
            href="https://lby-rgyyt.github.io/"
            className="link"
            target="_blank"
            rel="noopener noreferrer"
          >
            lby-rgyyt.github.io
          </a>
          <p></p>
          <a
            href="https://kunwang0527.github.io/Personal-website/"
            className="link"
            target="_blank"
            rel="noopener noreferrer"
          >
            kunwang0527.github.io/Personal-website/
          </a>
        </p>
        <p>
          GitHub Repo:
          <p></p>
          <a
            href="https://github.com/lby-rgyyt/5610-poj2"
            className="link"
            target="_blank"
            rel="noopener noreferrer"
          >
            lby-rgyyt/5610-poj2
          </a>
        </p>
      </div>
    </div>
  );
};

export default CreditsPage;
