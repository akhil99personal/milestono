import React, { useEffect, useState } from "react";
import Tabs from "../../others/Tabs";
import "./MyProperty.css";
import UserHeader from "../UserHeader";
import UnlockedProperty from "./UnlockedProperty";
import SavedProperty from "./SavedProperty";
import SharedProperty from "./SharedProperty";
import MainNavBar from "../MainNavBar";
import { useLocation } from "react-router-dom";

const MyProperty = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const tab = queryParams.get("tab");

    if (tab === "saved") {
      setActiveTab(2);
    } else if (tab === "contacted") {
      setActiveTab(1);
    } else {
      setActiveTab(0);
    }
  }, [location]);

  const tabs = [
    { label: "Posted Propeties", content: <SharedProperty /> },
    { label: "Contact Unlocked Properties", content: <UnlockedProperty /> },
    { label: "Saved Properties", content: <SavedProperty /> },
  ];

  return (
    <div className="my-property-container">
      <MainNavBar />
      <Tabs tabs={tabs} passTab={tabs[activeTab].label} />
    </div>
  );
};

export default MyProperty;
