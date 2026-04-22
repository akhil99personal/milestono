import React, { useState, useMemo, useEffect } from "react";
import "./Inquiries.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
} from "recharts";
import {
  Calendar,
  MessageSquare,
  MessageCircle,
  TrendingUp,
  Percent,
  Search,
} from "lucide-react";
import Sidebar from "./components/Sidebar";
import dummyImg from "../images/dummyImage.webp";
import axios from "axios";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const Inquiries = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const [periodFilter, setPeriodFilter] = useState("This Month");
  const [barChartPeriod, setBarChartPeriod] = useState("6 Months");
  const [activeInquirySource, setActiveInquirySource] = useState(null);
  const [propertyInquiries, setPropertyInquiries] = useState([]);
  const [projectInquiries, setProjectInquiries] = useState([]);
  const [mobile, setMobile] = useState(false);
  const [topStat, setTopStat] = useState({
    totalInquiries: 0,
    lastMonthInquiries: 0,
    thisMonthInquiries: 0,

    totalPropertyInquiries: 0,
    lastMonthPropertyInquiries: 0,
    thisMonthPropertyInquiries: 0,

    totalProjectInquiries: 0,
    lastMonthProjectInquiries: 0,
    thisMonthProjectInquiries: 0,
  });

  const [inquiryAnalyticsData, setInquiryAnalyticsData] = useState([
    { month: "Jan", Residential: 0, Commercial: 0 },
    { month: "Feb", Residential: 0, Commercial: 0 },
    { month: "Mar", Residential: 0, Commercial: 0 },
    { month: "Apr", Residential: 0, Commercial: 0 },
    { month: "May", Residential: 0, Commercial: 0 },
    { month: "Jun", Residential: 0, Commercial: 0 },
  ]);

  const [inquirySources, setInquirySources] = useState([
    { name: "Commercial", value: 0 },
    { name: "Residential", value: 0 },
  ]);

  const [mostInquiredProperties, setMostInquiredProperties] = useState([]);

  const inquirySourceColors = ["#3B82F6", "#7C3AED"];
  const [inquiryConversionData, setInquiryConversionData] = useState([
    { month: "Nov", views: 0, propertyInquiries: 0, projectInquiries: 0 },
    { month: "Dec", views: 0, propertyInquiries: 0, projectInquiries: 0 },
    { month: "Jan", views: 0, propertyInquiries: 0, projectInquiries: 0 },
    { month: "Feb", views: 0, propertyInquiries: 0, projectInquiries: 0 },
    { month: "Mar", views: 0, propertyInquiries: 0, projectInquiries: 0 },
    { month: "Apr", views: 0, propertyInquiries: 0, projectInquiries: 0 },
  ]);

  const handleGetProperties = async () => {
    const token = localStorage.getItem("auth");
    if (!token) {
      console.error("No auth token found");
      return;
    }
    try {
      const response = await axios.get(`${BASE_URL}/api/agent-properties`, {
        headers: {
          Authorization: token,
        },
      });
      setPropertyInquiries(response.data);
    } catch (error) {
      console.error("Error fetching property details:" + error);
    }
  };
  const handleGetProjects = async () => {
    const token = localStorage.getItem("auth");
    if (!token) {
      console.error("No auth token found");
      return;
    }
    try {
      const response = await axios.get(`${BASE_URL}/api/agent-projects`, {
        headers: {
          Authorization: token,
        },
      });
      setProjectInquiries(response.data);
    } catch (error) {
      console.error("Error fetching property details:" + error);
    }
  };
  const handleExportStatus = async () => {
    const token = localStorage.getItem("auth");
    try {
      const response = await axios.get(`${BASE_URL}/api/check-export-status`, {
        headers: { Authorization: token },
      });
      if (response.data.status === "mobile") {
        setMobile(true);
      }
    } catch (error) {
      console.error("Error marking property as viewed:" + error);
    }
  };
  const fetchtopData = async () => {
    try {
      const token = localStorage.getItem("auth");
      const response = await axios.get(
        `${BASE_URL}/api/agent-inquiry-insights`,
        {
          headers: {
            Authorization: token,
          },
        },
      );
      setTopStat(response.data);
    } catch (err) {
      console.error(err.message);
    }
  };

  const fetchInquryAnalytics = async () => {
    try {
      const token = localStorage.getItem("auth");
      const response = await axios.get(
        `${BASE_URL}/api/agent-inquiry-trends-by-type`,
        {
          headers: {
            Authorization: token,
          },
        },
      );
      setInquiryAnalyticsData(response.data);
    } catch (err) {
      console.error(err.message);
    }
  };
  const fetchInqurySources = async () => {
    try {
      const token = localStorage.getItem("auth");
      const response = await axios.get(
        `${BASE_URL}/api/agent-total-inquiry-by-type`,
        {
          headers: {
            Authorization: token,
          },
        },
      );
      setInquirySources(response.data);
    } catch (err) {
      console.error(err.message);
    }
  };
  const fetchMostinquired = async () => {
    try {
      const token = localStorage.getItem("auth");
      const response = await axios.get(
        `${BASE_URL}/api/agent-top-properties-by-inquiries`,
        {
          headers: {
            Authorization: token,
          },
        },
      );
      setMostInquiredProperties(response.data);
    } catch (err) {
      console.error(err.message);
    }
  };
  const fetchConversionRate = async () => {
    try {
      const token = localStorage.getItem("auth");
      const response = await axios.get(
        `${BASE_URL}/api/agent-views-vs-inquiries`,
        {
          headers: {
            Authorization: token,
          },
        },
      );
      setInquiryConversionData(response.data);
    } catch (err) {
      console.error(err.message);
    }
  };
  useEffect(() => {
    handleGetProperties();
    handleGetProjects();
    handleExportStatus();
    fetchtopData();
    fetchInquryAnalytics();
    fetchInqurySources();
    fetchMostinquired();
    fetchConversionRate();
  }, []);

  const downloadExcel = () => {
    const ws = XLSX.utils.json_to_sheet(
      filteredPropertyInquiries.map((inquiry) => ({
        Client: inquiry.name,
        Email: inquiry.email,
        Property: inquiry.heading,
        Landmark: inquiry.landmark,
        Date: new Date(inquiry.date).toISOString().split("T")[0],
        Status: inquiry.status,
        ...(mobile ? { Contact: inquiry.mob } : {}),
      })),
    );

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Inquiries");
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });

    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8;",
    });
    saveAs(blob, "property_inquiries.xlsx");
  };

  const downloadProjectExcel = () => {
    const ws = XLSX.utils.json_to_sheet(
      filteredProjectInquiries.map((inquiry) => ({
        Client: inquiry.name,
        Email: inquiry.email,
        Project: inquiry.title,
        City: inquiry.city,
        Date: new Date(inquiry.date).toISOString().split("T")[0],
        Status: inquiry.status,
        ...(mobile ? { Contact: inquiry.mob } : {}),
      })),
    );

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Inquiries");
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });

    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8;",
    });
    saveAs(blob, "project_inquiries.xlsx");
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="inquiries-custom-tooltip">
          <p className="inquiries-tooltip-label">{`${label}`}</p>
          {payload.map((entry, index) => (
            <p
              key={index}
              className="inquiries-tooltip-value"
              style={{ color: entry.color }}
            >
              {`${entry.name}: ${entry.value}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const monthsToShow = barChartPeriod === "3 Months" ? 3 : 6;
  const filteredInquiryAnalyticsData = useMemo(() => {
    return inquiryAnalyticsData.slice(-monthsToShow);
  }, [barChartPeriod, inquiryAnalyticsData]);

  const StatusBadge = ({ status }) => {
    const statusClassMap = {
      Contacted: "inquiries-status-contacted",
      Enquired: "inquiries-status-scheduled",
      New: "inquiries-status-new",
      Closed: "inquiries-status-closed",
    };

    const className = `inquiries-status-badge ${statusClassMap[status] || ""}`;

    return <span className={className}>{status}</span>;
  };

  const [activeTab, setActiveTab] = useState("property");
  const [searchQuery, setSearchQuery] = useState("");

  const recentMessages = [
    {
      id: 1,
      name: "Alex Johnson 1",
      property: "Serene Meadows 1",
      time: "10:00 PM",
      date: "6/29/2023",
      contact: "+1 (555) 789-0123",
      email: "alex.johnson1@example.com",
      message:
        "Could you please provide more information about the floor plans and available units in this project?",
    },
    {
      id: 2,
      name: "Alex Johnson 2",
      property: "Luxury Villa 2",
      time: "10:00 PM",
      date: "6/28/2023",
      contact: "+1 (555) 789-0124",
      email: "alex.johnson2@example.com",
      message:
        "I am interested in this property and would like to schedule a viewing. Is it possible to visit this weekend?",
    },
    {
      id: 3,
      name: "Alex Johnson 3",
      property: "Serene Meadows 3",
      time: "10:00 PM",
      date: "6/27/2023",
      contact: "+1 (555) 789-0121",
      email: "alex.johnson3@example.com",
      message:
        "Could you please provide more information about the floor plans and available units in this project?",
    },
    {
      id: 4,
      name: "Alex Johnson 4",
      property: "Luxury Villa 4",
      time: "10:00 PM",
      date: "6/26/2023",
      contact: "+1 (555) 789-0122",
      email: "alex.johnson4@example.com",
      message:
        "I am interested in this property and would like to schedule a viewing. Is it possible to visit this weekend?",
    },
  ];

  const filteredPropertyInquiries = useMemo(() => {
    if (!searchQuery) return propertyInquiries;
    return propertyInquiries.filter((inquiry) =>
      inquiry.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [propertyInquiries, searchQuery]);

  const filteredProjectInquiries = useMemo(() => {
    if (!searchQuery) return projectInquiries;
    return projectInquiries.filter((inquiry) =>
      inquiry.client.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [projectInquiries, searchQuery]);

  return (
    <div className="agent-dashboard-container">
      <div className="agent-dashboard-main-content">
        <Sidebar />
        <div className="inquiries-header-section">
          <div className="inquiries-header-title">
            <h1>Inquiries</h1>
            <p className="inquiries-subtitle">
              Track and manage inquiries for your properties and projects
            </p>
          </div>
        </div>

        <div className="inquiries-stats-grid">
          <div className="inquiries-stat-card inquiries-left-accent">
            <div className="inquiries-stat-header">
              <h3>Total Inquiries</h3>
              <MessageSquare size={20} className="inquiries-stat-icon" />
            </div>
            <div className="inquiries-stat-value">{topStat.totalInquiries}</div>
            <div
              className={`inquiries-stat-change ${
                topStat.totalInquiries - topStat.lastMonthInquiries >= 0
                  ? "inquiries-positive"
                  : "inquiries-negative"
              }`}
            >
              {`↑ ${(topStat.totalInquiries - topStat.lastMonthInquiries).toFixed(0)} from last month`}
            </div>
          </div>

          <div className="inquiries-stat-card">
            <div className="inquiries-stat-header">
              <h3>This Month&rsquo;s Inquiries</h3>
              <MessageCircle size={20} className="inquiries-stat-icon" />
            </div>
            <div className="inquiries-stat-value">
              {topStat.thisMonthInquiries}
            </div>
          </div>

          <div className="inquiries-stat-card">
            <div className="inquiries-stat-header">
              <h3>Total Property Inquiries</h3>
              <TrendingUp size={20} className="inquiries-stat-icon" />
            </div>
            <div className="inquiries-stat-value">
              {topStat.totalPropertyInquiries}
            </div>
            <div
              className={`inquiries-stat-change ${
                topStat.totalPropertyInquiries -
                  topStat.lastMonthPropertyInquiries >=
                0
                  ? "inquiries-positive"
                  : "inquiries-negative"
              }`}
            >
              {`↑ ${(topStat.totalPropertyInquiries - topStat.lastMonthPropertyInquiries).toFixed(0)} from last month`}
            </div>
          </div>

          <div className="inquiries-stat-card">
            <div className="inquiries-stat-header">
              <h3>Total Project Inquiries</h3>
              <Percent size={20} className="inquiries-stat-icon" />
            </div>
            <div className="inquiries-stat-value">
              {topStat.totalProjectInquiries}
            </div>
            <div
              className={`inquiries-stat-change ${
                topStat.totalProjectInquiries -
                  topStat.lastMonthProjectInquiries >=
                0
                  ? "inquiries-positive"
                  : "inquiries-negative"
              }`}
            >
              {`↑ ${(topStat.totalProjectInquiries - topStat.lastMonthProjectInquiries).toFixed(0)} from last month`}
            </div>
          </div>
        </div>

        <div className="inquiries-charts-flex" style={{ marginBottom: "1rem" }}>
          <div className="inquiries-chart-card-first">
            <div className="inquiries-chart-header">
              <div>
                <h3>Inquiry Analytics</h3>
                <p>Track inquiries trends by property type</p>
              </div>
              <div className="inquiries-chart-period-selector">
                <select
                  value={barChartPeriod}
                  onChange={(e) => setBarChartPeriod(e.target.value)}
                >
                  <option>3 Months</option>
                  <option>6 Months</option>
                </select>
              </div>
            </div>
            <div className="inquiries-chart-content">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={filteredInquiryAnalyticsData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#EAEAEA"
                  />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />

                  <Bar
                    dataKey="residential"
                    name="Residential"
                    fill="#7C3AED"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="commercial"
                    name="Commercial"
                    fill="#10B981"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
                <div className="agent-dashboard-chart-legend">
                  <div className="agent-dashboard-legend-item">
                    <div
                      className="agent-dashboard-legend-color"
                      style={{ backgroundColor: "#7C3AED" }}
                    ></div>
                    <span>Residential</span>
                  </div>
                  <div className="agent-dashboard-legend-item">
                    <div
                      className="agent-dashboard-legend-color"
                      style={{ backgroundColor: "#10B981" }}
                    ></div>
                    <span>Commercial</span>
                  </div>
                </div>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="inquiries-chart-card-second">
            <div className="inquiries-chart-header">
              <div>
                <h3>Inquiry Sources</h3>
                <p>Where your inquiries are coming from</p>
              </div>
            </div>
            <div className="inquiries-chart-content">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={inquirySources}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={90}
                    paddingAngle={2}
                    dataKey="value"
                    startAngle={90}
                    endAngle={-270}
                    onMouseEnter={(data) => setActiveInquirySource(data)}
                    onMouseLeave={() => setActiveInquirySource(null)}
                  >
                    {inquirySources.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={inquirySourceColors[index]}
                        stroke="none"
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="inquiries-donut-center-label">
                <div className="inquiries-donut-percent">
                  {activeInquirySource
                    ? `${activeInquirySource.value}`
                    : `${inquirySources[0].value}`}
                </div>
                <div className="inquiries-donut-label">
                  {activeInquirySource
                    ? activeInquirySource.name
                    : inquirySources[0].name}
                </div>
              </div>
              <div className="inquiries-chart-legend inquiries-source-legend">
                {inquirySources.map((source, index) => (
                  <div key={index} className="inquiries-legend-item">
                    <div
                      className="inquiries-legend-dot"
                      style={{ backgroundColor: inquirySourceColors[index] }}
                    ></div>
                    <span>{source.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="inquiries-charts-grid">
          <div className="inquiries-properties-card">
            <div className="inquiries-properties-header">
              <div>
                <h3>Most Inquired Properties</h3>
                <p>Properties with highest inquiry rates</p>
              </div>
            </div>
            <div className="inquiries-properties-list">
              {mostInquiredProperties.map((prop) => (
                <div
                  key={prop.id}
                  className="inquiries-property-item"
                  style={{ alignItems: "center" }}
                >
                  <img
                    src={prop.image}
                    className="inquiries-property-image"
                    style={{ width: "100px", height: "75px" }}
                  />

                  <div className="inquiries-property-info">
                    <h4>{prop.name}</h4>
                    <p className="inquiries-property-address">{prop.address}</p>
                    <p style={{ fontSize: "14px", marginBottom: "4px" }}>
                      {prop.category}
                    </p>
                  </div>
                  <div
                    className="inquiries-property-tag inquiries-high-demand"
                    style={{ marginLeft: "auto" }}
                  >
                    {prop.inquiries}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="inquiries-chart-card">
            <div className="inquiries-chart-header">
              <div>
                <h3>Inquiry Conversion Rate</h3>
                <p>How inquiries convert to deals over time</p>
              </div>
            </div>
            <div className="inquiries-chart-content">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart
                  data={inquiryConversionData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#EAEAEA"
                  />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />

                  <Line
                    type="monotone"
                    dataKey="views"
                    name="Views"
                    stroke="#7C3AED"
                    strokeWidth={2}
                    dot={{ r: 4, fill: "#7C3AED", strokeWidth: 0 }}
                    activeDot={{ r: 6, fill: "#7C3AED", strokeWidth: 0 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="propertyInquiries"
                    name="Property Inquiries"
                    stroke="#10B981"
                    strokeWidth={2}
                    dot={{ r: 4, fill: "#10B981", strokeWidth: 0 }}
                    activeDot={{ r: 6, fill: "#10B981", strokeWidth: 0 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="projectInquiries"
                    name="Project Inquiries"
                    stroke="#FB923C"
                    strokeWidth={2}
                    dot={{ r: 4, fill: "#FB923C", strokeWidth: 0 }}
                    activeDot={{ r: 6, fill: "#FB923C", strokeWidth: 0 }}
                  />
                </LineChart>
                <div className="agent-dashboard-chart-legend">
                  <div className="agent-dashboard-legend-item">
                    <div
                      className="agent-dashboard-legend-color"
                      style={{ backgroundColor: "#7C3AED" }}
                    ></div>
                    <span>Views</span>
                  </div>
                  <div className="agent-dashboard-legend-item">
                    <div
                      className="agent-dashboard-legend-color"
                      style={{ backgroundColor: "#10B981" }}
                    ></div>
                    <span>Property Inquiries</span>
                  </div>
                  <div className="agent-dashboard-legend-item">
                    <div
                      className="agent-dashboard-legend-color"
                      style={{ backgroundColor: "#FB923C" }}
                    ></div>
                    <span>Project Inquiries</span>
                  </div>
                </div>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="inquiries-tabs-container">
          <div className="inquiries-dashboard-tabs">
            <button
              className={`inquiries-tab-button ${
                activeTab === "property" ? "active" : ""
              }`}
              onClick={() => setActiveTab("property")}
            >
              Property Inquiries
            </button>
            <button
              className={`inquiries-tab-button ${
                activeTab === "project" ? "active" : ""
              }`}
              onClick={() => setActiveTab("project")}
            >
              Project Inquiries
            </button>
          </div>

          <div className="inquiries-search-container">
            <Search size={18} className="inquiries-search-icon" />
            <input
              type="text"
              placeholder={`Search inquiries...`}
              className="inquiries-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {activeTab === "property" ? (
          <div className="inquiries-table-section">
            <div className="inquries-header">
              <div>
                <h3 className="inquiries-table-title">Property Inquiries</h3>
                <p className="inquiries-table-subtitle">
                  View and manage all property inquiries
                </p>
              </div>
              <div style={{ marginBottom: "10px" }}>
              
                <button
                  onClick={downloadExcel}
                  className="inquiries-download-btn"
                >
                  Download Excel
                </button>
              </div>
            </div>
            <table className="inquiries-table">
              <thead>
                <tr>
                  <th>Client</th>
                  <th>Property</th>
                  <th>Date</th>
                  <th>Status</th>
                  {mobile && <th>Contact</th>}
                </tr>
              </thead>
              <tbody>
                {filteredPropertyInquiries.map((inquiry) => (
                  <tr key={inquiry.id}>
                    <td>
                      <div className="inquiries-client-cell">
                        <span className="inquiries-client-name">
                          {inquiry.name}
                        </span>
                        <span className="inquiries-client-email">
                          {inquiry.email}
                        </span>
                      </div>
                    </td>
                    <td>
                      <div className="inquiries-property-cell">
                        <span className="inquiries-property-name">
                          {inquiry.heading}
                        </span>
                        <span className="inquiries-property-type">
                          {inquiry.landmark}
                        </span>
                      </div>
                    </td>
                    <td>
                      {new Date(inquiry.date).toISOString().split("T")[0]}
                    </td>
                    <td>
                      <StatusBadge status={inquiry.status} />
                    </td>
                    {mobile && <td>{inquiry.mob}</td>}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="inquiries-table-section">
            <div className="inquries-header">
              <div>
                <h3 className="inquiries-table-title">Project Inquiries</h3>
                <p className="inquiries-table-subtitle">
                  View and manage all project inquiries
                </p>
              </div>
              <div style={{ marginBottom: "10px" }}>
                <button
                  onClick={downloadProjectExcel}
                  className="inquiries-download-btn"
                >
                  Download Excel
                </button>
              </div>
            </div>
            <table className="inquiries-table">
              <thead>
                <tr>
                  <th>Client</th>
                  <th>Property</th>
                  <th>Date</th>
                  <th>Status</th>
                  {mobile && <th>Contact</th>}
                </tr>
              </thead>
              <tbody>
                {filteredProjectInquiries.map((inquiry) => (
                  <tr key={inquiry.id}>
                    <td>
                      <div className="inquiries-client-cell">
                        <span className="inquiries-client-name">
                          {inquiry.name}
                        </span>
                        <span className="inquiries-client-email">
                          {inquiry.email}
                        </span>
                      </div>
                    </td>
                    <td>
                      <div className="inquiries-property-cell">
                        <span className="inquiries-property-name">
                          {inquiry.title}
                        </span>
                        <span className="inquiries-property-type">
                          {inquiry.city}
                        </span>
                      </div>
                    </td>
                    <td>
                      {new Date(inquiry.date).toISOString().split("T")[0]}
                    </td>
                    <td>
                      <StatusBadge status={inquiry.status} />
                    </td>
                    {mobile && <td>{inquiry.mob}</td>}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Inquiries;
