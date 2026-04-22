import React from "react";
import Tabs from "../../others/Tabs";
import "./MyPremiumAccount.css";
import UserHeader from "../UserHeader";
import User from "./UserPremimumAccount.js";
import Agent from "./AgentPremimumAccount.js";
import MainNavBar from "../MainNavBar.jsx";

const MyService = () => {
  const tabs = [
    { label: "User", content: <User /> },
    { label: "Agent", content: <Agent /> },
  ];

  return (
    <div className="my-premium-account-service-container">
      <MainNavBar />
      <Tabs tabs={tabs} />
    </div>
  );
};

export default MyService;
