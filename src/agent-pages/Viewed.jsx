import React, { useState, useMemo } from "react";
import "./Viewed.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { Calendar, Eye, User, Clock, Percent, Search } from "lucide-react";
import Sidebar from "./components/Sidebar";
import dummyImg from "../images/dummyImage.webp";

const topStats = [
  {
    title: "Total Views",
    value: 3856,
    icon: <Eye size={20} className="viewed-stat-icon" />,
    change: "+2.5% from last month",
    positive: true,
  },
  {
    title: "Unique Visitors",
    value: 1245,
    icon: <User size={20} className="viewed-stat-icon" />,
    change: "+2.8% from last month",
    positive: true,
  },
  {
    title: "Avg Time on Page",
    value: "3:24",
    icon: <Clock size={20} className="viewed-stat-icon" />,
    change: "↑ 0:18 from last week",
    positive: true,
  },
  {
    title: "Inquiry Rate",
    value: "6.4%",
    icon: <Percent size={20} className="viewed-stat-icon" />,
    change: "+1.2% from last month",
    positive: true,
  },
];

const allViewTrendsData = {
  "7 Days": [
    { date: "2025-01-01", properties: 140, projects: 90 },
    { date: "2025-01-02", properties: 160, projects: 100 },
    { date: "2025-01-03", properties: 180, projects: 110 },
    { date: "2025-01-04", properties: 200, projects: 120 },
    { date: "2025-01-05", properties: 220, projects: 130 },
    { date: "2025-01-06", properties: 210, projects: 125 },
    { date: "2025-01-07", properties: 240, projects: 150 },
  ],
  "30 Days": [
    { date: "2025-01-01", properties: 140, projects: 90 },
    { date: "2025-01-02", properties: 150, projects: 95 },
    { date: "2025-01-03", properties: 160, projects: 100 },
    { date: "2025-01-04", properties: 170, projects: 105 },
    { date: "2025-01-05", properties: 180, projects: 110 },
    { date: "2025-01-06", properties: 190, projects: 115 },
    { date: "2025-01-07", properties: 200, projects: 120 },
    { date: "2025-01-08", properties: 210, projects: 125 },
    { date: "2025-01-09", properties: 220, projects: 130 },
    { date: "2025-01-10", properties: 230, projects: 135 },
    { date: "2025-01-11", properties: 240, projects: 140 },
    { date: "2025-01-12", properties: 250, projects: 145 },
    { date: "2025-01-13", properties: 260, projects: 150 },
    { date: "2025-01-14", properties: 220, projects: 130 },
    { date: "2025-01-15", properties: 200, projects: 120 },
    { date: "2025-01-16", properties: 210, projects: 125 },
    { date: "2025-01-17", properties: 220, projects: 130 },
    { date: "2025-01-18", properties: 230, projects: 135 },
    { date: "2025-01-19", properties: 240, projects: 140 },
    { date: "2025-01-20", properties: 220, projects: 130 },
    { date: "2025-01-21", properties: 210, projects: 125 },
    { date: "2025-01-22", properties: 220, projects: 130 },
    { date: "2025-01-23", properties: 230, projects: 135 },
    { date: "2025-01-24", properties: 240, projects: 140 },
    { date: "2025-01-25", properties: 250, projects: 145 },
    { date: "2025-01-26", properties: 260, projects: 150 },
    { date: "2025-01-27", properties: 270, projects: 155 },
    { date: "2025-01-28", properties: 280, projects: 160 },
    { date: "2025-01-29", properties: 270, projects: 155 },
    { date: "2025-01-30", properties: 260, projects: 150 },
  ],
  "60 Days": [
    { date: "2025-01-01", properties: 140, projects: 90 },
    { date: "2025-01-02", properties: 150, projects: 95 },
    { date: "2025-01-03", properties: 160, projects: 100 },
    { date: "2025-01-04", properties: 170, projects: 105 },
    { date: "2025-01-05", properties: 180, projects: 110 },
    { date: "2025-01-06", properties: 190, projects: 115 },
    { date: "2025-01-07", properties: 200, projects: 120 },
    { date: "2025-01-08", properties: 210, projects: 125 },
    { date: "2025-01-09", properties: 220, projects: 130 },
    { date: "2025-01-10", properties: 230, projects: 135 },
    { date: "2025-01-11", properties: 240, projects: 140 },
    { date: "2025-01-12", properties: 250, projects: 145 },
    { date: "2025-01-13", properties: 260, projects: 150 },
    { date: "2025-01-14", properties: 220, projects: 130 },
    { date: "2025-01-15", properties: 200, projects: 120 },
    { date: "2025-01-16", properties: 210, projects: 125 },
    { date: "2025-01-17", properties: 220, projects: 130 },
    { date: "2025-01-18", properties: 230, projects: 135 },
    { date: "2025-01-19", properties: 240, projects: 140 },
    { date: "2025-01-20", properties: 220, projects: 130 },
    { date: "2025-01-21", properties: 210, projects: 125 },
    { date: "2025-01-22", properties: 220, projects: 130 },
    { date: "2025-01-23", properties: 230, projects: 135 },
    { date: "2025-01-24", properties: 240, projects: 140 },
    { date: "2025-01-25", properties: 250, projects: 145 },
    { date: "2025-01-26", properties: 260, projects: 150 },
    { date: "2025-01-27", properties: 270, projects: 155 },
    { date: "2025-01-28", properties: 280, projects: 160 },
    { date: "2025-01-29", properties: 270, projects: 155 },
    { date: "2025-01-30", properties: 260, projects: 150 },
    { date: "2025-02-01", properties: 140, projects: 90 },
    { date: "2025-02-02", properties: 150, projects: 95 },
    { date: "2025-02-03", properties: 160, projects: 100 },
    { date: "2025-02-04", properties: 170, projects: 105 },
    { date: "2025-02-05", properties: 180, projects: 110 },
    { date: "2025-02-06", properties: 190, projects: 115 },
    { date: "2025-02-07", properties: 200, projects: 120 },
    { date: "2025-02-08", properties: 210, projects: 125 },
    { date: "2025-02-09", properties: 220, projects: 130 },
    { date: "2025-02-10", properties: 230, projects: 135 },
    { date: "2025-02-11", properties: 240, projects: 140 },
    { date: "2025-02-12", properties: 250, projects: 145 },
    { date: "2025-02-13", properties: 260, projects: 150 },
    { date: "2025-02-14", properties: 220, projects: 130 },
    { date: "2025-02-15", properties: 200, projects: 120 },
    { date: "2025-02-16", properties: 210, projects: 125 },
    { date: "2025-02-17", properties: 220, projects: 130 },
    { date: "2025-02-18", properties: 230, projects: 135 },
    { date: "2025-02-19", properties: 240, projects: 140 },
    { date: "2025-02-20", properties: 220, projects: 130 },
    { date: "2025-02-21", properties: 210, projects: 125 },
    { date: "2025-02-22", properties: 220, projects: 130 },
    { date: "2025-02-23", properties: 230, projects: 135 },
    { date: "2025-02-24", properties: 240, projects: 140 },
    { date: "2025-02-25", properties: 250, projects: 145 },
    { date: "2025-02-26", properties: 260, projects: 150 },
    { date: "2025-02-27", properties: 270, projects: 155 },
    { date: "2025-02-28", properties: 280, projects: 160 },
    { date: "2025-03-01", properties: 270, projects: 155 },
    { date: "2025-03-02", properties: 260, projects: 150 },
  ],
};

const trafficSourcesData = [
  { source: "Direct", views: 700 },
  { source: "Google", views: 980 },
  { source: "Social", views: 500 },
  { source: "Referrals", views: 300 },
  { source: "Email", views: 200 },
  { source: "Other", views: 100 },
];

const deviceDistributionData = [
  { name: "Mobile", value: 58 },
  { name: "Desktop", value: 35 },
  { name: "Tablet", value: 7 },
];
const deviceColors = ["#7C3AED", "#3B82F6", "#10B981"];

const mostViewedProperties = [
  {
    id: 1,
    name: "Luxury Villa 1",
    price: "₹ 1 Lakh",
    address: "123 Main St, City",
    uniqueVisitors: 380,
    avgTime: "3:40 min",
    inquiryRate: "75%",
    views: 900,
    image: dummyImg,
  },
  {
    id: 2,
    name: "Luxury Villa 2",
    price: "₹ 2 Lakh",
    address: "123 Main St, City",
    uniqueVisitors: 320,
    avgTime: "3:35 min",
    inquiryRate: "69%",
    views: 800,
    image: dummyImg,
  },
  {
    id: 3,
    name: "Luxury Villa 3",
    price: "₹ 3 Lakh",
    address: "123 Main St, City",
    uniqueVisitors: 280,
    avgTime: "3:30 min",
    inquiryRate: "63%",
    views: 700,
    image: dummyImg,
  },
  {
    id: 1,
    name: "Luxury Villa 1",
    price: "₹ 1 Lakh",
    address: "123 Main St, City",
    uniqueVisitors: 380,
    avgTime: "3:40 min",
    inquiryRate: "75%",
    views: 900,
    image: dummyImg,
  },
  {
    id: 2,
    name: "Luxury Villa 2",
    price: "₹ 2 Lakh",
    address: "123 Main St, City",
    uniqueVisitors: 320,
    avgTime: "3:35 min",
    inquiryRate: "69%",
    views: 800,
    image: dummyImg,
  },
  {
    id: 3,
    name: "Luxury Villa 3",
    price: "₹ 3 Lakh",
    address: "123 Main St, City",
    uniqueVisitors: 280,
    avgTime: "3:30 min",
    inquiryRate: "63%",
    views: 700,
    image: dummyImg,
  },
];

const mostViewedProjects = [
  {
    id: 1,
    name: "Serene Meadows 1",
    address: "Central District 1, City",
    uniqueVisitors: 290,
    avgTime: "3:20 min",
    inquiryRate: "70%",
    views: 720,
    image: dummyImg,
  },
  {
    id: 2,
    name: "Serene Meadows 2",
    address: "Central District 1, City",
    uniqueVisitors: 280,
    avgTime: "4:15 min",
    inquiryRate: "78%",
    views: 710,
    image: dummyImg,
  },
  {
    id: 3,
    name: "Serene Meadows 3",
    address: "Central District 1, City",
    uniqueVisitors: 230,
    avgTime: "4:20 min",
    inquiryRate: "70%",
    views: 690,
    image: dummyImg,
  },
  {
    id: 1,
    name: "Serene Meadows 1",
    address: "Central District 1, City",
    uniqueVisitors: 290,
    avgTime: "3:20 min",
    inquiryRate: "70%",
    views: 720,
    image: dummyImg,
  },
  {
    id: 2,
    name: "Serene Meadows 2",
    address: "Central District 1, City",
    uniqueVisitors: 280,
    avgTime: "4:15 min",
    inquiryRate: "78%",
    views: 710,
    image: dummyImg,
  },
  {
    id: 3,
    name: "Serene Meadows 3",
    address: "Central District 1, City",
    uniqueVisitors: 230,
    avgTime: "4:20 min",
    inquiryRate: "70%",
    views: 690,
    image: dummyImg,
  },
];

const recentVisitorsData = [
  {
    id: 1,
    visitorName: "Visitor 1",
    visitorEmail: "visitor@example.com",
    property: "Luxury Villa 1",
    date: "6/30/2025",
    time: "10:00 AM",
    duration: "2:24 min",
    source: "Social",
    device: "Desktop",
  },
  {
    id: 2,
    visitorName: "Visitor 2",
    visitorEmail: "visitor@example.com",
    property: "Serene Meadows 2",
    date: "6/30/2025",
    time: "9:30 AM",
    duration: "3:10 min",
    source: "Search",
    device: "Mobile",
  },
  {
    id: 3,
    visitorName: "Visitor 3",
    visitorEmail: "visitor@example.com",
    property: "Serene Meadows 3",
    date: "6/30/2025",
    time: "8:00 AM",
    duration: "5:24 min",
    source: "Direct",
    device: "Tablet",
  },
  {
    id: 4,
    visitorName: "Visitor 4",
    visitorEmail: "visitor@example.com",
    property: "Luxury Villa 2",
    date: "6/29/2025",
    time: "10:30 AM",
    duration: "3:00 min",
    source: "Social",
    device: "Mobile",
  },
  {
    id: 5,
    visitorName: "Visitor 5",
    visitorEmail: "visitor@example.com",
    property: "Serene Meadows 5",
    date: "6/29/2025",
    time: "9:15 AM",
    duration: "2:10 min",
    source: "Search",
    device: "Desktop",
  },
  {
    id: 6,
    visitorName: "Visitor 6",
    visitorEmail: "visitor@example.com",
    property: "Luxury Villa 6",
    date: "6/29/2025",
    time: "8:30 AM",
    duration: "3:10 min",
    source: "Mobile",
    device: "Mobile",
  },
  {
    id: 7,
    visitorName: "Visitor 7",
    visitorEmail: "visitor@example.com",
    property: "Serene Meadows 7",
    date: "6/28/2025",
    time: "7:00 AM",
    duration: "4:20 min",
    source: "Social",
    device: "Tablet",
  },
  {
    id: 8,
    visitorName: "Visitor 8",
    visitorEmail: "visitor@example.com",
    property: "Luxury Villa 8",
    date: "6/30/2025",
    time: "4:00 AM",
    duration: "9:24 min",
    source: "Search",
    device: "Tablet",
  },
];

const visitorEngagementData = [
  { page: "Homepage", bounceRate: 30, avgTime: 2, pagesPerSession: 4 },
  { page: "Property Listings", bounceRate: 25, avgTime: 3, pagesPerSession: 5 },
  { page: "Property Details", bounceRate: 40, avgTime: 4, pagesPerSession: 3 },
  {
    page: "Project Listings",
    bounceRate: 35,
    avgTime: 3.5,
    pagesPerSession: 4,
  },
  { page: "Project Details", bounceRate: 45, avgTime: 5, pagesPerSession: 2 },
  { page: "Contact Page", bounceRate: 20, avgTime: 1.5, pagesPerSession: 2 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="viewed-custom-tooltip">
        <p className="viewed-tooltip-label">{label}</p>
        {payload.map((entry, index) => (
          <p
            key={index}
            className="viewed-tooltip-value"
            style={{ color: entry.color }}
          >
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const Viewed = () => {
  const [viewTrendPeriod, setViewTrendPeriod] = useState("30 Days");

  const [activeTab, setActiveTab] = useState("properties");

  const [searchQuery, setSearchQuery] = useState("");

  const [activePieIndex, setActivePieIndex] = useState(null);

  const lineChartData = useMemo(() => {
    return allViewTrendsData[viewTrendPeriod] || [];
  }, [viewTrendPeriod]);

  const filteredProperties = useMemo(() => {
    if (!searchQuery) return mostViewedProperties;
    return mostViewedProperties.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [searchQuery]);

  const filteredProjects = useMemo(() => {
    if (!searchQuery) return mostViewedProjects;
    return mostViewedProjects.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [searchQuery]);

  const filteredVisitors = useMemo(() => {
    if (!searchQuery) return recentVisitorsData;
    return recentVisitorsData.filter((visitor) =>
      visitor.visitorName.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [searchQuery]);

  const activePieSegment =
    activePieIndex !== null
      ? deviceDistributionData[activePieIndex]
      : deviceDistributionData[0];

  return (
    <div className="agent-dashboard-container">
      <Sidebar />
      <div className="agent-dashboard-main-content">
        <div className="viewed-header-section">
          <div className="viewed-header-title">
            <h1>Viewed Properties &amp; Projects</h1>
            <p className="viewed-header-subtitle">
              Track who has viewed your properties and projects
            </p>
          </div>
          <div className="viewed-period-selector">
            <select defaultValue="This Month">
              <option>This Month</option>
              <option>Last Month</option>
              <option>This Year</option>
            </select>
            <Calendar className="viewed-calendar-icon" size={20} />
          </div>
        </div>

        <div className="viewed-stats-grid">
          {topStats.map((stat, idx) => (
            <div
              key={idx}
              className={`viewed-stat-card ${idx === 0 ? "viewed-left-accent" : ""}`}
            >
              <div className="viewed-stat-header">
                <h3>{stat.title}</h3>
                {stat.icon}
              </div>
              <div className="viewed-stat-value">{stat.value}</div>
              <div
                className={`viewed-stat-change ${
                  stat.positive ? "viewed-positive" : "viewed-negative"
                }`}
              >
                {stat.change}
              </div>
            </div>
          ))}
        </div>

        <div className="viewed-trends-card">
          <div className="viewed-chart-header">
            <div>
              <h3>View Trends</h3>
              <p>Daily property and project views over the selected period</p>
            </div>
            <div className="agent-dashboard-chart-period-selector">
              <select
                value={viewTrendPeriod}
                onChange={(e) => setViewTrendPeriod(e.target.value)}
              >
                <option>7 Days</option>
                <option>30 Days</option>
                <option>60 Days</option>
              </select>
            </div>
          </div>
          <div className="viewed-chart-content">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={lineChartData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#EAEAEA"
                />
                <XAxis dataKey="date" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="properties"
                  name="properties"
                  stroke="#7C3AED"
                  strokeWidth={2}
                  dot={{ r: 4, fill: "#7C3AED", strokeWidth: 0 }}
                  activeDot={{ r: 6, fill: "#7C3AED", strokeWidth: 0 }}
                />
                <Line
                  type="monotone"
                  dataKey="projects"
                  name="projects"
                  stroke="#f97316"
                  strokeWidth={2}
                  dot={{ r: 4, fill: "#f97316", strokeWidth: 0 }}
                  activeDot={{ r: 6, fill: "#f97316", strokeWidth: 0 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="viewed-charts-section">
          <div className="viewed-traffic-card">
            <div className="viewed-chart-header">
              <div>
                <h3>Traffic Sources</h3>
                <p>Where your visitors are coming from</p>
              </div>
            </div>
            <div className="viewed-chart-content">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={trafficSourcesData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#EAEAEA"
                  />
                  <XAxis dataKey="source" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar
                    dataKey="views"
                    name="views"
                    fill="#7C3AED"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="viewed-device-card">
            <div className="viewed-chart-header">
              <div>
                <h3>Device Distribution</h3>
                <p>Devices used to view your listings</p>
              </div>
            </div>
            <div className="viewed-chart-content">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={deviceDistributionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={90}
                    paddingAngle={2}
                    dataKey="value"
                    startAngle={90}
                    endAngle={-270}
                    onMouseEnter={(_, index) => setActivePieIndex(index)}
                    onMouseLeave={() => setActivePieIndex(null)}
                  >
                    {deviceDistributionData.map((entry, index) => (
                      <Cell
                        key={index}
                        fill={deviceColors[index]}
                        stroke="none"
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>

              <div className="viewed-donut-center-label">
                <div className="viewed-donut-percent">
                  {activePieSegment.value}%
                </div>
                <div className="viewed-donut-label">
                  {activePieSegment.name}
                </div>
              </div>
            </div>
            <div className="viewed-chart-legend">
              {deviceDistributionData.map((item, idx) => (
                <div key={idx} className="viewed-legend-item">
                  <div
                    className="viewed-legend-dot"
                    style={{ backgroundColor: deviceColors[idx] }}
                  ></div>
                  <span>
                    {item.name} — {item.value}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="viewed-tabs-search">
          <div className="viewed-dashboard-tabs">
            <button
              className={`viewed-tab-button ${activeTab === "properties" ? "active" : ""}`}
              onClick={() => setActiveTab("properties")}
            >
              Most Viewed Properties
            </button>
            <button
              className={`viewed-tab-button ${activeTab === "projects" ? "active" : ""}`}
              onClick={() => setActiveTab("projects")}
            >
              Most Viewed Projects
            </button>
            <button
              className={`viewed-tab-button ${activeTab === "visitors" ? "active" : ""}`}
              onClick={() => setActiveTab("visitors")}
            >
              Recent Visitors
            </button>
          </div>

          <div className="viewed-search-container">
            <Search size={18} className="viewed-search-icon" />
            <input
              type="text"
              placeholder="Search..."
              className="viewed-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="viewed-tabs-content">
          {activeTab === "properties" && (
            <div className="viewed-cards-grid">
              {filteredProperties.map((prop) => (
                <div className="viewed-card viewed-property-card" key={prop.id}>
                  <div className="viewed-card-views-badge">{prop.views}</div>
                  <img
                    src={prop.image}
                    alt={prop.name}
                    className="viewed-card-image"
                  />
                  <div className="viewed-card-content">
                    <div className="viewed-card-title">{prop.name}</div>
                    <div className="viewed-card-subtitle">{prop.price}</div>
                    <div className="viewed-card-subtitle">{prop.address}</div>
                    <div className="viewed-card-stats">
                      <span>Unique Visitors: {prop.uniqueVisitors}</span>
                      <span>Avg. Time: {prop.avgTime}</span>
                      <span>Inquiry Rate: {prop.inquiryRate}</span>
                    </div>
                    <div className="viewed-card-buttons">
                      <button className="viewed-card-button">Analytics</button>
                      <button className="viewed-card-button active">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "projects" && (
            <div className="viewed-cards-grid">
              {filteredProjects.map((proj) => (
                <div className="viewed-card viewed-project-card" key={proj.id}>
                  <div className="viewed-card-views-badge">{proj.views}</div>
                  <img
                    src={proj.image}
                    alt={proj.name}
                    className="viewed-card-image"
                  />
                  <div className="viewed-card-content">
                    <div className="viewed-card-title">{proj.name}</div>
                    <div className="viewed-card-subtitle">{proj.address}</div>
                    <div className="viewed-card-stats">
                      <span>Unique Visitors: {proj.uniqueVisitors}</span>
                      <span>Avg. Time: {proj.avgTime}</span>
                      <span>Inquiry Rate: {proj.inquiryRate}</span>
                    </div>
                    <div className="viewed-card-buttons">
                      <button className="viewed-card-button">Analytics</button>
                      <button className="viewed-card-button active">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "visitors" && (
            <div className="viewed-table-section">
              <h3 className="viewed-table-title">Recent Visitors</h3>
              <p className="viewed-table-subtitle">
                People who recently viewed your properties and projects
              </p>
              <table className="viewed-table">
                <thead>
                  <tr>
                    <th>Visitor</th>
                    <th>Property/Project</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Duration</th>
                    <th>Source</th>
                    <th>Device</th>
                    <th>Contact</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredVisitors.map((visitor) => (
                    <tr key={visitor.id}>
                      <td>
                        <div className="viewed-visitor-cell">
                          <span className="viewed-visitor-name">
                            {visitor.visitorName}
                          </span>
                          <span className="viewed-visitor-email">
                            {visitor.visitorEmail}
                          </span>
                        </div>
                      </td>
                      <td>{visitor.property}</td>
                      <td>{visitor.date}</td>
                      <td>{visitor.time}</td>
                      <td>{visitor.duration}</td>
                      <td>{visitor.source}</td>
                      <td>{visitor.device}</td>
                      <td>
                        <button className="viewed-table-action-btn">
                          Contact
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="viewed-visitor-engagement-section">
          <h3 className="viewed-visitor-engagement-title">
            Visitor Engagement
          </h3>
          <p className="viewed-visitor-engagement-subtitle">
            How visitors interact with your listings
          </p>
          <div
            className="viewed-visitor-engagement-chart"
            style={{ marginBottom: "2rem" }}
          >
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={visitorEngagementData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#EAEAEA"
                />
                <XAxis dataKey="page" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="bounceRate"
                  name="Bounce Rate"
                  stroke="#7C3AED"
                  strokeWidth={2}
                  dot={{ r: 4, fill: "#7C3AED", strokeWidth: 0 }}
                  activeDot={{ r: 6, fill: "#7C3AED", strokeWidth: 0 }}
                />
                <Line
                  type="monotone"
                  dataKey="avgTime"
                  name="Avg. Time (min)"
                  stroke="#f97316"
                  strokeWidth={2}
                  dot={{ r: 4, fill: "#f97316", strokeWidth: 0 }}
                  activeDot={{ r: 6, fill: "#f97316", strokeWidth: 0 }}
                />
                <Line
                  type="monotone"
                  dataKey="pagesPerSession"
                  name="Pages/Session"
                  stroke="#10B981"
                  strokeWidth={2}
                  dot={{ r: 4, fill: "#10B981", strokeWidth: 0 }}
                  activeDot={{ r: 6, fill: "#10B981", strokeWidth: 0 }}
                />
              </LineChart>
            </ResponsiveContainer>
            <div
              className="agent-dashboard-chart-legend"
              style={{ marginTop: "1rem" }}
            >
              <div className="agent-dashboard-legend-item">
                <div
                  className="agent-dashboard-legend-color"
                  style={{ backgroundColor: "#7C3AED" }}
                ></div>
                <span>Bounce Rate</span>
              </div>
              <div className="agent-dashboard-legend-item">
                <div
                  className="agent-dashboard-legend-color"
                  style={{ backgroundColor: "#f97316" }}
                ></div>
                <span>Avg. Time (min)</span>
              </div>
              <div className="agent-dashboard-legend-item">
                <div
                  className="agent-dashboard-legend-color"
                  style={{ backgroundColor: "#10B981" }}
                ></div>
                <span>Pages/Session</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Viewed;
