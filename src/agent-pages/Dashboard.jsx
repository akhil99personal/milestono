import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";
import {
  Building2,
  Eye,
  MessageSquare,
  LineChartIcon,
  Calendar,
  User,
  MessageCircle,
} from "lucide-react";
import Sidebar from "./components/Sidebar";
import "./Dashboard.css";
import dummyImg from "../images/dummyImage.webp";
import axios from "axios";

const Dashboard = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [periodFilter, setPeriodFilter] = useState("This Month");
  const [chartPeriod, setChartPeriod] = useState("6 Months");
  const [activePropertyType, setActivePropertyType] = useState(null);
  const [activeInquirySource, setActiveInquirySource] = useState(null);
  const [agentDetails, setAgentDeatils] = useState({
    totalProperties: 0,
    totalViews: 0,
    lastMonthViews: 0,
    thisMonthViews: 0,
    totalContactViews: 0,
    lastMonthContactViews: 0,
    thisMonthContactViews: 0,
    totalEnquiries: 0,
    lastMonthEnquiries: 0,
    thisMonthEnquiries: 0,
  });
  const [performanceData, setPerformanceData] = useState([
    { month: "Jan", views: 0, inquiries: 0 },
    { month: "Feb", views: 0, inquiries: 0 },
    { month: "Mar", views: 0, inquiries: 0 },
    { month: "Apr", views: 0, inquiries: 0 },
    { month: "May", views: 0, inquiries: 0 },
    { month: "Jun", views: 0, inquiries: 0 },
  ]);

  const [propertyTypes, setPropertyTypes] = useState([
    { name: "Viewed", value: 0 },
    { name: "Saved", value: 0 },
    { name: "Contacted", value: 0 },
    { name: "Enquired", value: 0 },
  ]);
  const [monthlyData, setMonthlyData] = useState([
    { month: "Jan", views: 0, contacted: 0 },
    { month: "Feb", views: 0, contacted: 0 },
    { month: "Mar", views: 0, contacted: 0 },
    { month: "Apr", views: 0, contacted: 0 },
    { month: "May", views: 0, contacted: 0 },
    { month: "Jun", views: 0, contacted: 0 },
  ]);

  const [topProperties, setTopProperties] = useState([]);

  const fetchAgentsDetails = async () => {
    try {
      const token = localStorage.getItem("auth");
      const response = await axios.get(`${BASE_URL}/api/agent-details`, {
        headers: {
          Authorization: token,
        },
      });
      setAgentDeatils(response.data);
    } catch (err) {
      console.error(err.message);
    }
  };
  const fetchperformanceData = async () => {
    try {
      const token = localStorage.getItem("auth");
      const response = await axios.get(
        `${BASE_URL}/api/last-6-month-agent-property-details`,
        {
          headers: {
            Authorization: token,
          },
        },
      );
      setPerformanceData(response.data);
    } catch (err) {
      console.error(err.message);
    }
  };
  const fetchPropertyTypes = async () => {
    try {
      const token = localStorage.getItem("auth");
      const response = await axios.get(
        `${BASE_URL}/api/stats-of-agent-properties`,
        {
          headers: {
            Authorization: token,
          },
        },
      );
      setPropertyTypes(response.data);
    } catch (err) {
      console.error(err.message);
    }
  };
  const fetchmonthlyPerformanceData = async () => {
    try {
      const token = localStorage.getItem("auth");
      const response = await axios.get(
        `${BASE_URL}/api/last-6-month-agent-contacted`,
        {
          headers: {
            Authorization: token,
          },
        },
      );
      setMonthlyData(response.data);
    } catch (err) {
      console.error(err.message);
    }
  };

  const fetchTopProperties = async () => {
    try {
      const token = localStorage.getItem("auth");
      const response = await axios.get(`${BASE_URL}/api/agent-top-properties`, {
        headers: {
          Authorization: token,
        },
      });
      setTopProperties(response.data);
    } catch (err) {
      console.error(err.message);
    }
  };
  useEffect(() => {
    fetchAgentsDetails();
    fetchperformanceData();
    fetchPropertyTypes();
    fetchmonthlyPerformanceData();
    fetchTopProperties();
  }, []);

  const inquirySources = [
    { name: "Website", value: 40 },
    { name: "Social Media", value: 30 },
    { name: "Referrals", value: 20 },
    { name: "Other", value: 10 },
  ];

  const marketTrends = [
    { month: "Jan", portfolio: 520000, market: 450000 },
    { month: "Feb", portfolio: 530000, market: 455000 },
    { month: "Mar", portfolio: 540000, market: 460000 },
    { month: "Apr", portfolio: 550000, market: 460000 },
    { month: "May", portfolio: 570000, market: 465000 },
    { month: "Jun", portfolio: 590000, market: 470000 },
  ];

  const recentActivity = [
    {
      id: 1,
      type: "inquiry",
      property: "Luxury Villa 1",
      time: "1:00:00 PM",
      date: "6/29/2023",
      icon: <MessageCircle size={16} />,
    },
    {
      id: 2,
      type: "showing",
      property: "Luxury Villa 2",
      time: "12:00:00 PM",
      date: "6/28/2023",
      icon: <User size={16} />,
    },
    {
      id: 3,
      type: "view",
      property: "Luxury Villa 3",
      time: "11:00:00 AM",
      date: "6/27/2023",
      icon: <Eye size={16} />,
    },
    {
      id: 4,
      type: "inquiry",
      property: "Luxury Villa 4",
      time: "10:00:00 AM",
      date: "6/26/2023",
      icon: <MessageCircle size={16} />,
    },
    {
      id: 5,
      type: "showing",
      property: "Luxury Villa 5",
      time: "9:00:00 AM",
      date: "6/25/2023",
      icon: <User size={16} />,
    },
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="agent-dashboard-custom-tooltip">
          <p className="agent-dashboard-tooltip-label">{`${label}`}</p>
          {payload.map((entry, index) => (
            <p
              key={index}
              className="agent-dashboard-tooltip-value"
              style={{ color: entry.color }}
            >
              {`${entry.name}: ${entry.value.toLocaleString()}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const COLORS = {
    views: "#7C3AED",
    inquiries: "#10B981",
    deals: "#34D399",
    portfolio: "#7C3AED",
    market: "#3B82F6",
  };

  const propertyTypeColors = ["#7C3AED", "#F59E0B", "#10B981", "#3B82F6"];
  const inquirySourceColors = ["#3B82F6", "#7C3AED", "#F59E0B", "#10B981"];

  const defaultProperty = propertyTypes[0];
  const defaultInquiry = inquirySources[1];

  const periodMap = { "3 Months": 3, "6 Months": 6 };
  const filteredPerformanceData = performanceData.slice(
    -periodMap[chartPeriod] || performanceData.length,
  );
  const filteredMonthlyData = monthlyData.slice(
    -periodMap[chartPeriod] || monthlyData.length,
  );

  const getPercentageChange = (lastMonth, current) => {
    if (lastMonth === 0) return current > 0 ? 100 : 0;
    const change = ((current - lastMonth) / lastMonth) * 100;
    return change.toFixed(1);
  };

  return (
    <div className="agent-dashboard-container">
      <Sidebar />

      <div className="agent-dashboard-main-content">
        <div className="agent-dashboard-dashboard-header-section">
          <div className="agent-dashboard-dashboard-title">
            <h1>Dashboard</h1>
            <p className="agent-dashboard-subtitle">
              Welcome back! Here&rsquo;s an overview of your real estate
              portfolio.
            </p>
          </div>
        </div>

        <div className="agent-dashboard-stats-grid">
          <div className="agent-dashboard-stat-card agent-dashboard-left-accent">
            <div className="agent-dashboard-stat-header">
              <h3>Total Properties</h3>
              <Building2 size={20} className="agent-dashboard-stat-icon" />
            </div>
            <div className="agent-dashboard-stat-value">
              {agentDetails.totalProperties}
            </div>
          </div>

          <div className="agent-dashboard-stat-card">
            <div className="agent-dashboard-stat-header">
              <h3>Total Views</h3>
              <Eye size={20} className="agent-dashboard-stat-icon" />
            </div>
            <div className="agent-dashboard-stat-value">
              {agentDetails.totalViews}
            </div>
            <div className="agent-dashboard-stat-change agent-dashboard-positive">
              ↑{" "}
              {getPercentageChange(
                agentDetails.lastMonthViews,
                agentDetails.thisMonthViews,
              )}
              % from last month
            </div>
          </div>

          <div className="agent-dashboard-stat-card">
            <div className="agent-dashboard-stat-header">
              <h3>Total Contacted</h3>
              <LineChartIcon size={20} className="agent-dashboard-stat-icon" />
            </div>
            <div className="agent-dashboard-stat-value">
              {agentDetails.totalContactViews}
            </div>
            <div className="agent-dashboard-stat-change agent-dashboard-positive">
              ↑{" "}
              {getPercentageChange(
                agentDetails.lastMonthContactViews,
                agentDetails.thisMonthContactViews,
              )}
              % from last month
            </div>
          </div>

          <div className="agent-dashboard-stat-card">
            <div className="agent-dashboard-stat-header">
              <h3>Property Inquiries</h3>
              <MessageSquare size={20} className="agent-dashboard-stat-icon" />
            </div>
            <div className="agent-dashboard-stat-value">
              {agentDetails.totalEnquiries}
            </div>
            <div className="agent-dashboard-stat-change agent-dashboard-positive">
              ↑{" "}
              {getPercentageChange(
                agentDetails.lastMonthEnquiries,
                agentDetails.thisMonthEnquiries,
              )}
              % from last month
            </div>
          </div>
        </div>

        <div className="agent-dashboard-charts-flex">
          <div className="agent-dashboard-chart-card-first">
            <div className="agent-dashboard-chart-header">
              <div>
                <h3>Property Performance</h3>
                <p>
                  Views vs. Inquiries for the last {chartPeriod.toLowerCase()}
                </p>
              </div>
              <div className="agent-dashboard-chart-period-selector">
                <select
                  value={chartPeriod}
                  onChange={(e) => setChartPeriod(e.target.value)}
                >
                  <option>3 Months</option>
                  <option>6 Months</option>
                </select>
              </div>
            </div>
            <div className="agent-dashboard-chart-content">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={filteredPerformanceData}
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
                    dataKey="views"
                    name="Views"
                    fill={COLORS.views}
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="inquiries"
                    name="Inquiries"
                    fill={COLORS.inquiries}
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
              <div className="agent-dashboard-chart-legend">
                <div className="agent-dashboard-legend-item">
                  <div
                    className="agent-dashboard-legend-color"
                    style={{ backgroundColor: COLORS.views }}
                  ></div>
                  <span>Views</span>
                </div>
                <div className="agent-dashboard-legend-item">
                  <div
                    className="agent-dashboard-legend-color"
                    style={{ backgroundColor: COLORS.inquiries }}
                  ></div>
                  <span>Inquiries</span>
                </div>
              </div>
            </div>
          </div>

          <div className="agent-dashboard-chart-card-second">
            <div className="agent-dashboard-chart-header">
              <div>
                <h3>Property Condition</h3>
                <p>Distribution of your property portfolio</p>
              </div>
            </div>
            <div className="agent-dashboard-chart-content">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={propertyTypes}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={90}
                    paddingAngle={2}
                    dataKey="value"
                    startAngle={90}
                    endAngle={-270}
                    onMouseEnter={(data, index) => setActivePropertyType(data)}
                    onMouseLeave={() => setActivePropertyType(null)}
                  >
                    {propertyTypes.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={propertyTypeColors[index]}
                        stroke="none"
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="agent-dashboard-donut-center-label">
                <div className="agent-dashboard-donut-percent">
                  {activePropertyType
                    ? `${((activePropertyType.value / propertyTypes.reduce((sum, type) => sum + type.value, 0)) * 100).toFixed(1)}%`
                    : `${((propertyTypes[0].value / propertyTypes.reduce((sum, type) => sum + type.value, 0)) * 100).toFixed(1)}%`}
                </div>
                <div className="agent-dashboard-donut-label">
                  {activePropertyType
                    ? activePropertyType.name
                    : propertyTypes[0].name}
                </div>
              </div>
              <div className="agent-dashboard-chart-legend agent-dashboard-property-types-legend">
                <div className="agent-dashboard-legend-item">
                  <div
                    className="agent-dashboard-legend-dot"
                    style={{ backgroundColor: propertyTypeColors[0] }}
                  ></div>
                  <span>Viewed</span>
                </div>
                <div className="agent-dashboard-legend-item">
                  <div
                    className="agent-dashboard-legend-dot"
                    style={{ backgroundColor: propertyTypeColors[1] }}
                  ></div>
                  <span>Saved</span>
                </div>
                <div className="agent-dashboard-legend-item">
                  <div
                    className="agent-dashboard-legend-dot"
                    style={{ backgroundColor: propertyTypeColors[2] }}
                  ></div>
                  <span>Contacted</span>
                </div>
                <div className="agent-dashboard-legend-item">
                  <div
                    className="agent-dashboard-legend-dot"
                    style={{ backgroundColor: propertyTypeColors[3] }}
                  ></div>
                  <span>Enquired</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="agent-dashboard-charts-grid">
          <div className="agent-dashboard-chart-card">
            <div className="agent-dashboard-chart-header">
              <div>
                <h3>Monthly Performance</h3>
                <p>
                  Views, Contacted over time for the last{" "}
                  {chartPeriod.toLowerCase()}
                </p>
              </div>
              <div className="agent-dashboard-chart-period-selector">
                <select
                  value={chartPeriod}
                  onChange={(e) => setChartPeriod(e.target.value)}
                >
                  <option>3 Months</option>
                  <option>6 Months</option>
                </select>
              </div>
            </div>
            <div className="agent-dashboard-chart-content">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart
                  data={filteredMonthlyData}
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
                    stroke={COLORS.views}
                    strokeWidth={2}
                    dot={{ r: 4, fill: COLORS.views, strokeWidth: 0 }}
                    activeDot={{ r: 6, fill: COLORS.views, strokeWidth: 0 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="contacted"
                    name="Contacted"
                    stroke="#FB923C"
                    strokeWidth={2}
                    dot={{ r: 4, fill: "#FB923C", strokeWidth: 0 }}
                    activeDot={{ r: 6, fill: "#FB923C", strokeWidth: 0 }}
                  />
                </LineChart>
              </ResponsiveContainer>
              <div className="agent-dashboard-chart-legend">
                <div className="agent-dashboard-legend-item">
                  <div
                    className="agent-dashboard-legend-color"
                    style={{ backgroundColor: COLORS.views }}
                  ></div>
                  <span>Views</span>
                </div>
                <div className="agent-dashboard-legend-item">
                  <div
                    className="agent-dashboard-legend-color"
                    style={{ backgroundColor: "#FB923C" }}
                  ></div>
                  <span>Contacted</span>
                </div>
              </div>
            </div>
          </div>

          <div className="agent-dashboard-properties-card">
            <div className="agent-dashboard-properties-header">
              <div>
                <h3>Top Performing Properties</h3>
                <p>Properties with highest views and inquiries</p>
              </div>
            </div>
            <div className="agent-dashboard-properties-list">
              {topProperties.map((property, i) => (
                <div key={i} className="agent-dashboard-property-item">
                  <img
                    src={property.image || dummyImg}
                    className="agent-dashboard-property-image"
                  />
                  <div className="agent-dashboard-property-info">
                    <h4>{property.name}</h4>
                    <p className="agent-dashboard-property-address">
                      {property.address}
                    </p>
                    <div className="agent-dashboard-property-stats">
                      <div className="agent-dashboard-stat-item">
                        <Eye size={14} />
                        <span>{property.views}</span>
                      </div>
                      <div className="agent-dashboard-stat-item">
                        <MessageSquare size={14} />
                        <span>{property.inquiries}</span>
                      </div>
                      <div className="agent-dashboard-stat-item agent-dashboard-price">
                        <span>{property.price}</span>
                      </div>
                    </div>
                  </div>
                  <div
                    className={`agent-dashboard-property-tag ${property.status === "Featured" ? "agent-dashboard-featured" : "agent-dashboard-high-demand"}`}
                  >
                    {property.status}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
