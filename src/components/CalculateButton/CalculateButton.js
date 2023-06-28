import React, { useState } from "react"; // Don't forget to import useState
import axios from "axios";
import "./styles.css";

const CalculateButton = (props) => {
  const [sum, setSum] = useState(null); // Add this state variable

  const calculateSum = (template) => {
    let sum = 0;
    // Logic to calculate the sum based on the template.numbers field.
    for (let row of template) {
      for (let number of row) {
        sum += Number(number); // assuming the numbers are strings
      }
    }
    return sum;
  };

  const handleCalculateClick = async () => {
    let template = [...props.template];

    let calculatedSum = calculateSum(template);

    const templateWithSum = { numbers: template, sum: calculatedSum };

    const response = await axios.post("http://localhost:8081/template/result", templateWithSum);

    console.log("The total sum is:", response.data);

    setSum(response.data.sum); // Update the state with the response sum
  };

  return (
    <div className="calculate-button-container">
      <button className="calculate-button" onClick={handleCalculateClick}>
        Calculate Sum
      </button>
      {sum && <p className="sum-text">Total Sum: {sum}</p>} {/* Display the sum if it's not null */}
    </div>
  );
};

export default CalculateButton;
