import React from "react";
import Tabs from "../../others/Tabs";
import "./MyService.css";
import UserHeader from "../UserHeader";
import ProvidedService from "./ProvidedService.js";
import RequestedService from "./RequestedService.js";
import MainNavBar from "../MainNavBar.jsx";

const MyService = () => {
  const tabs = [
    { label: "Requested Services", content: <RequestedService /> },
    { label: "Provided Services", content: <ProvidedService /> },
  ];

  return (
    <div className="my-service-container">
      <MainNavBar />
      <Tabs tabs={tabs} />
    </div>
  );
};

export default MyService;
