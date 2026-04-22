import React, { useEffect, useState } from "react";
import "./Tabs.css";
import PropTypes from "prop-types";

const Tabs = ({ tabs, passTab }) => {
  const [activeTab, setActiveTab] = useState(passTab || tabs[0]?.label);

  useEffect(() => {
    if (passTab) {
      setActiveTab(passTab);
    }
  }, [passTab]);

  const handleTabClick = (label) => {
    setActiveTab(label);
  };

  return (
    <div className="tabs-container">
      <ul className="tabs-header">
        {tabs.map((tab) => (
          <li
            key={tab.label}
            className={`tab-item ${activeTab === tab.label ? "active" : ""}`}
            onClick={() => handleTabClick(tab.label)}
          >
            {tab.label}
          </li>
        ))}
      </ul>
      <div className="tabs-content">
        {tabs.map((tab) => (
          <div
            key={tab.label}
            className={`tab-panel ${activeTab === tab.label ? "active" : ""}`}
          >
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
};

Tabs.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      content: PropTypes.node,
    }),
  ),
};

export default Tabs;
