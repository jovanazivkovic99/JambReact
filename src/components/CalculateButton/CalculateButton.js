import React, { useState, useEffect } from "react"; // Don't forget to import useState and useEffect
import axios from "axios";
import "./styles.css";

const CalculateButton = (props) => {
  const [sum, setSum] = useState(0);

  const calculateSum = (template) => {
    let sum = 0;

    for (let row of template) {
      for (let cell of row) {
        let numValue = parseFloat(cell.value);
        if (cell.valid && !isNaN(Number(numValue))) {
          sum += Number(cell.value);
        }
      }
    }
    console.log("Sum calculated:", sum);
    return sum;
  };

  useEffect(() => {
    console.log("Data received:", props.template);
    let calculatedSum = calculateSum(props.template);
    console.log("Initial sum:", calculatedSum);
    setSum(calculatedSum);
  }, [props.template]);

  const handleCalculateClick = async () => {
    let calculatedSum = calculateSum(props.template);

    setSum(calculatedSum);

    const templateWithSum = { numbers: props.template, sum: calculatedSum };
    const response = await axios.post("http://localhost:8081/template/result", templateWithSum);

    console.log("The total sum is:", response.data);
    setSum(response.data.sum);
  };
  /* const handleCalculateClick = async () => {
    const templateWithSum = { numbers: props.template, sum: sum };
    const response = await axios.post(
      "http://localhost:8081/template/result",
      templateWithSum
    );

    console.log("The total sum is:", response.data);
    setSum(response.data.sum); // Update the state with the response sum
  }; */
  
  return (
    <div className="calculate-button-container">
      <button className="calculate-button" onClick={handleCalculateClick}>
        Calculate Sum
      </button>
      {sum !== null && <p className="sum-text">Total Sum: {sum}</p>}{" "}
      {/* Display the sum if it's not null */}
    </div>
  );
};

export default CalculateButton;
