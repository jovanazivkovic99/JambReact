

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles.css";

const CalculateButton = (props) => {
  const [sum, setSum] = useState(props.initialSum);

  useEffect(() => {
    setSum(props.initialSum);
  }, [props.initialSum]);

  const handleCalculateClick = async () => {
    let calculatedSum = props.initialSum;
    setSum(null); // Set sum to null to show that it's loading

    const templateWithSum = { numbers: props.template, sum: calculatedSum };
    const response = await axios.post(
      "http://localhost:8081/template/result",
      templateWithSum
    );

    console.log("The total sum is:", response.data);
    setSum(response.data.sum);
  };

  return (
    <div className="calculate-button-container">
      <button className="calculate-button" onClick={handleCalculateClick}>
        Calculate Sum
      </button>
      <p className="sum-text">
        <span>Total Sum:</span>
        <span className="sum-value">{sum !== null ? sum : "\u00A0"}</span>
      </p>
    </div>
  );
};

export default CalculateButton;

