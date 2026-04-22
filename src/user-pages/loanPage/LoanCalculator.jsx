import React, { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "./LoanCalculator.css";

const LoanCalculator = () => {
  const [age, setAge] = useState(35);
  const [income, setIncome] = useState(100000);
  const [emi, setEmi] = useState(10000);
  const [rate, setRate] = useState(8.9);
  const [tenure, setTenure] = useState(20);

  const calculateEMI = (P, r, n) => {
    r = r / (12 * 100);
    n = n * 12;
    return (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  };

  const sanitizedIncome = Math.max(income, 0);
  const sanitizedEMI = Math.max(emi, 0);
  const sanitizedRate = Math.max(rate, 0);
  const sanitizedTenure = Math.max(tenure, 1);

  const maxLoan = Math.max(
    (sanitizedIncome - sanitizedEMI) * 0.6 * 12 * sanitizedTenure,
    0,
  );
  const monthlyEMI = calculateEMI(maxLoan, sanitizedRate, sanitizedTenure);
  const totalPayable = monthlyEMI * sanitizedTenure * 12;

  const formatNumber = (value) => {
    if (value >= 10000000) return `${(value / 10000000).toFixed(1)} Cr`;
    if (value >= 100000) return `${(value / 100000).toFixed(1)} L`;
    if (value >= 1000) return `${(value / 1000).toFixed(1)} K`;
    return value.toFixed(2);
  };

  const graphData = Array.from({ length: sanitizedTenure + 1 }, (_, i) => {
    const monthlyRate = sanitizedRate / (12 * 100);
    const months = sanitizedTenure * 12;
    const remainingPrincipal =
      maxLoan * Math.pow(1 + monthlyRate, months - i * 12);
    const paidInterest = totalPayable - remainingPrincipal;
    return {
      year: i,
      Principal: Math.max(remainingPrincipal, 0),
      Interest: Math.max(paidInterest, 0),
    };
  });

  return (
    <div className="loan-calculator">
      <div className="loan-calculator-header">
        <h2 className="loan-callback-title">
          Calculate housing loan eligibility
        </h2>
        <p className="loan-callback-subtitle">
          Calculate your borrowing eligibility by submitting your details below
        </p>
      </div>
      <div className="loan-calculator-container">
        <div className="loan-calculator-calculator-inputs">
          <div className="loan-calculator-input-group">
            <label>Your Age</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(Math.max(Number(e.target.value), 18))}
            />
          </div>

          <div className="loan-calculator-input-group ">
            <label>Occupation</label>
            <select className="loan-comparison-filter-select">
              <option value="salaried">Salaried</option>
              <option value="self-employed">Self-Employed</option>
            </select>
          </div>

          <div className="loan-calculator-input-group">
            <label>Net Income (₹)</label>
            <input
              type="number"
              value={sanitizedIncome}
              onChange={(e) => setIncome(Number(e.target.value))}
              placeholder="Enter your Income"
            />
          </div>

          <div className="loan-calculator-input-group">
            <label>Existing Monthly EMI (₹)</label>
            <input
              type="number"
              value={sanitizedEMI}
              onChange={(e) => setEmi(Number(e.target.value))}
            />
          </div>

          <div className="loan-calculator-input-group-two-in-one">
            <div className="loan-calculator-input-group">
              <label>Rate of Interest (%)</label>
              <input
                type="number"
                value={sanitizedRate}
                onChange={(e) => setRate(Number(e.target.value))}
              />
            </div>

            <div className="loan-calculator-input-group">
              <label>Tenure (Years)</label>
              <input
                type="number"
                value={sanitizedTenure}
                onChange={(e) => setTenure(Math.max(Number(e.target.value), 1))}
              />
            </div>
          </div>

          <button className="loan-calculator-calculate-button">
            Calculate
          </button>
        </div>

        <div className="loan-calculator-calculator-results">
          <div className="loan-calculator-graph-container">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart
                data={graphData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#dcdcdc" />
                <XAxis dataKey="year" tickFormatter={(tick) => `${tick} yrs`} />
                <YAxis tickFormatter={(tick) => formatNumber(tick)} />
                <Tooltip
                  formatter={(value) => formatNumber(value)}
                  labelFormatter={(label) => `Year: ${label}`}
                />
                <Area
                  type="monotone"
                  dataKey="Principal"
                  stackId="1"
                  stroke="#4caf50"
                  fill="#81c784"
                />
                <Area
                  type="monotone"
                  dataKey="Interest"
                  stackId="1"
                  stroke="#f44336"
                  fill="#f00"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="loan-calculator-results-summary">
            <p>
              <span>You could borrow up to: </span>₹{formatNumber(maxLoan)}
            </p>
            <p className="all-green">
              <span>Total Payable Amount:</span> ₹{formatNumber(totalPayable)}
            </p>
          </div>

          <div className="loan-calculator-results-summary resultsemi">
            <p>
              <span>Monthly EMI: </span>₹{formatNumber(monthlyEMI)}
            </p>
          </div>

          <button className="loan-calculator-apply-button">
            Apply for Loan
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoanCalculator;
