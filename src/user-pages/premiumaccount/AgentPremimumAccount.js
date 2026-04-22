import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AgentPremimumAccount.css";
import { handlePayment } from "../../others/Payment";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const PremimumAccount = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();
  const [accountData, setAccountData] = useState([]);

  const handleGetAccounts = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/accounts`);
      setAccountData(response.data.filter((ele) => ele.accountFor === "agent"));
    } catch (error) {
      console.error("Error fetching property details:" + error);
    }
  };

  const handleTryNow = async (account) => {
    try {
      const token = localStorage.getItem("auth");
      if (!token) {
        console.error("No auth token found");
        return;
      }

      await axios.post(
        `${BASE_URL}/api/update-premium-account`,
        {
          radiusRange: account.radiusRange,
          numOfContactDetails: account.numOfContactDetails,
          numOfProperties: account.numOfProperties,
          validity: account.validity,
          name: account.packageName,
          price: account.price,
        },
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        },
      );
      toast.success("Account upgraded successfully! Check in Profile.");
      navigate("/");
    } catch (error) {
      console.error("Error upgrading account:" + error);
      toast.error("Failed to upgrade account.");
    }
  };

  useEffect(() => {
    handleGetAccounts();
  }, []);

  return (
    <>
      <div className="agent-premium-account-section">
        <h1>Upgrade Your Plan</h1>
        <p>
          Upgrade to our premium account for personalized property insights and
          priority access to new listings, ensuring you find your dream home
          faster and with ease.
        </p>
        <div className="agent-premium-account-container">
          {accountData.map((account, index) => (
            <div key={index} className="agent-premium-account-account-card">
              <h3 className="agent-premium-account-package-name agent-premium-account-dark-red">
                {account.packageName}
                <hr />
              </h3>
              <h2 className="agent-premium-account-account-detail1">
                <span className="agent-premium-account-price">
                  ₹{account.price.toFixed(2)}
                </span>
              </h2>
              <div
                className="agent-premium-account-try-now"
                onClick={() => {
                  handlePayment({
                    amount: account.price,
                    callback: () => handleTryNow(account),
                    description:
                      "Payment for " + account.packageName + " Taken",
                  });
                }}
              >
                TRY NOW
              </div>
              <hr />
              <p className="agent-premium-account-account-detail">
                Increase your search radius by{" "}
                <span className="agent-premium-account-highlight-account-details">
                  {account.radiusRange}KM
                </span>
              </p>
              <p className="agent-premium-account-account-detail">
                Provides access to{" "}
                <span className="agent-premium-account-highlight-account-details">
                  {account.numOfContactDetails}
                </span>{" "}
                contact details.
              </p>
              <p className="agent-premium-account-account-detail">
                Allows adding up to{" "}
                <span className="agent-premium-account-highlight-account-details">
                  {account.numOfProperties}
                </span>{" "}
                properties.
              </p>
              <p className="agent-premium-account-account-detail">
                Validity period:{" "}
                <span className="agent-premium-account-highlight-account-details">
                  {account.validity}
                </span>{" "}
                months
                <span className="agent-premium-account-highlight-account-details">
                  ({account.validity * 30} days).
                </span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default PremimumAccount;
