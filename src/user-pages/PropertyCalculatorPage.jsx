import React, { useState } from "react";
import "./PropertyCalculatorPage.css";
import Footer from "./homepage/Footer";

const PropertyCalculator = () => {
  const [propertyValue, setPropertyValue] = useState("");
  const [taxRate, setTaxRate] = useState("");
  const [loanPercentage, setLoanPercentage] = useState("");
  const [loanTerm, setLoanTerm] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [downPaymentPercentage, setDownPaymentPercentage] = useState(20);
  const [calculatedValue, setCalculatedValue] = useState(null);

  const calculateValue = () => {
    const taxAmount = (propertyValue * taxRate) / 100;
    const loanAmount = loanPercentage
      ? (propertyValue * loanPercentage) / 100
      : 0;
    const downPayment = (propertyValue * downPaymentPercentage) / 100;

    const r = interestRate / 1200;
    const n = loanTerm * 12;
    const emi = loanAmount
      ? (loanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
      : 0;

    const finalValue = propertyValue - taxAmount - loanAmount;

    setCalculatedValue({
      propertyValue: parseFloat(propertyValue).toFixed(2),
      taxAmount: taxAmount.toFixed(2),
      loanAmount: loanAmount.toFixed(2),
      emi: emi.toFixed(2),
      downPayment: downPayment.toFixed(2),
      loanTerm: loanTerm,
      interestRate: interestRate,
      finalValue: finalValue.toFixed(2),
    });
  };

  return (
    <>
      <div className="property-calculator">
        <section className="hero">
          <h1 className="hero-title">Property Value Calculator</h1>
          <p className="hero-description">
            Calculate the true value of your property after taxes and loans. Get
            insights on EMI and financial planning instantly.
          </p>
        </section>
        <div className="form">
          <label className="label">Enter Property Value (₹):</label>
          <input
            type="number"
            className="input"
            value={propertyValue}
            onChange={(e) => setPropertyValue(e.target.value)}
            placeholder="Example: 50,00,000"
          />

          <label className="label">Tax Rate (%):</label>
          <input
            type="number"
            className="input"
            value={taxRate}
            onChange={(e) => setTaxRate(e.target.value)}
            placeholder="Example: 10%"
          />

          <label className="label">Loan Percentage (Optional):</label>
          <input
            type="number"
            className="input"
            value={loanPercentage}
            onChange={(e) => setLoanPercentage(e.target.value)}
            placeholder="Example: 80%"
          />

          <label className="label">Loan Term (Years):</label>
          <input
            type="number"
            className="input"
            value={loanTerm}
            onChange={(e) => setLoanTerm(e.target.value)}
            placeholder="Example: 20 years"
          />

          <label className="label">Interest Rate (% per annum):</label>
          <input
            type="number"
            className="input"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
            placeholder="Example: 8%"
          />

          <label className="label">Down Payment Percentage (%):</label>
          <input
            type="number"
            className="input"
            value={downPaymentPercentage}
            onChange={(e) => setDownPaymentPercentage(e.target.value)}
            placeholder="Default: 20%"
          />

          <button className="calculate-btn" onClick={calculateValue}>
            Calculate
          </button>
        </div>

        {calculatedValue && (
          <div className="result" data-aos="fade-up">
            <h2 className="result-title">Calculation Result</h2>
            <div className="document">
              <p>
                <strong>Initial Property Value:</strong> ₹
                {calculatedValue.propertyValue}
              </p>
              <p>
                <strong>Tax Deducted:</strong> ₹{calculatedValue.taxAmount}
              </p>
              <p>
                <strong>Loan Amount:</strong> ₹{calculatedValue.loanAmount}
              </p>
              <p>
                <strong>EMI:</strong> ₹{calculatedValue.emi} per month for{" "}
                {calculatedValue.loanTerm} years at{" "}
                {calculatedValue.interestRate}% interest rate
              </p>
              <p>
                <strong>Down Payment Required:</strong> ₹
                {calculatedValue.downPayment}
              </p>
              <p>
                <strong>Final Value:</strong> ₹{calculatedValue.finalValue}
              </p>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default PropertyCalculator;
