import React, { useState, useMemo } from "react";
import "./Advertisement.css";
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
import {
  Calendar,
  Eye,
  User,
  Clock,
  Percent,
  Search,
  Globe,
  TrendingUp,
  User2,
  UserCircle,
  LocateIcon,
  MapIcon,
  MapPin,
} from "lucide-react";
import Sidebar from "./components/Sidebar";
import dummyImg from "../images/dummyImage.webp";

const topStats = [
  {
    title: "Active Campaigns",
    value: 8,
    icon: <Eye size={20} className="advertisement-stat-icon" />,
    change: "+2 from last month",
    positive: true,
  },
  {
    title: "Total Ad Spend",
    value: "$2,450",
    icon: <User size={20} className="advertisement-stat-icon" />,
    change: "+$50 from last month",
    positive: true,
  },
  {
    title: "Ad Impressions",
    value: "45,678",
    icon: <Clock size={20} className="advertisement-stat-icon" />,
    change: "+2,000 from last month",
    positive: true,
  },
  {
    title: "Conversion Rate",
    value: "3.2%",
    icon: <Percent size={20} className="advertisement-stat-icon" />,
    change: "+0.3% from last month",
    positive: true,
  },
];

const campaignPerformanceData1Month = [
  { month: "W1", impressions: 1500, clicks: 120, inquiries: 30 },
  { month: "W2", impressions: 1700, clicks: 130, inquiries: 35 },
  { month: "W3", impressions: 1600, clicks: 125, inquiries: 32 },
  { month: "W4", impressions: 1800, clicks: 140, inquiries: 38 },
];

const campaignPerformanceData3Months = [
  { month: "Jan", impressions: 3000, clicks: 200, inquiries: 40 },
  { month: "Feb", impressions: 3500, clicks: 220, inquiries: 45 },
  { month: "Mar", impressions: 4000, clicks: 250, inquiries: 50 },
];

const campaignPerformanceData6Months = [
  { month: "Jan", impressions: 3000, clicks: 200, inquiries: 40 },
  { month: "Feb", impressions: 4000, clicks: 250, inquiries: 60 },
  { month: "Mar", impressions: 5000, clicks: 300, inquiries: 80 },
  { month: "Apr", impressions: 5500, clicks: 320, inquiries: 90 },
  { month: "May", impressions: 6000, clicks: 350, inquiries: 100 },
  { month: "Jun", impressions: 6500, clicks: 400, inquiries: 120 },
];

const campaignPerformanceData12Months = [
  { month: "Jan", impressions: 2000, clicks: 150, inquiries: 30 },
  { month: "Feb", impressions: 2500, clicks: 180, inquiries: 40 },
  { month: "Mar", impressions: 3000, clicks: 200, inquiries: 50 },
  { month: "Apr", impressions: 3500, clicks: 220, inquiries: 60 },
  { month: "May", impressions: 4000, clicks: 240, inquiries: 70 },
  { month: "Jun", impressions: 4500, clicks: 260, inquiries: 80 },
  { month: "Jul", impressions: 5000, clicks: 280, inquiries: 90 },
  { month: "Aug", impressions: 5500, clicks: 300, inquiries: 100 },
  { month: "Sep", impressions: 6000, clicks: 320, inquiries: 110 },
  { month: "Oct", impressions: 6500, clicks: 340, inquiries: 120 },
  { month: "Nov", impressions: 7000, clicks: 360, inquiries: 130 },
  { month: "Dec", impressions: 7500, clicks: 380, inquiries: 140 },
];

const adPlatformData = [
  { name: "Social Media", value: 45 },
  { name: "Search Engines", value: 25 },
  { name: "Partner Websites", value: 15 },
  { name: "Email", value: 10 },
  { name: "Others", value: 5 },
];
const adPlatformColors = [
  "#7C3AED",
  "#3B82F6",
  "#10B981",
  "#f97316",
  "#F59E0B",
];

const roiByCampaignTypeData = [
  { type: "Milestono Ads", roi: 350 },
  { type: "Social Media Ads", roi: 300 },
  { type: "Search Engine Ads", roi: 220 },
  { type: "Display Ads", roi: 120 },
  { type: "Partner Sites", roi: 80 },
];

const campaignEffectivenessData = [
  { promo: "Summer Promo", ctr: 2.5, conversion: 1.8, roi: 210 },
  { promo: "Holiday Deals", ctr: 3.2, conversion: 2.5, roi: 250 },
  { promo: "New Year", ctr: 2.9, conversion: 2.1, roi: 230 },
  { promo: "Spring Launch", ctr: 3.1, conversion: 2.4, roi: 240 },
];

const activeCampaignsData = [
  {
    id: "CAM-1",
    title: "Summer Campaign 1",
    started: "6/1/2023",
    statusLabel: "Active",
    performanceLabel: "High Performing",
    name: "Luxury Villa 1",
    type: "Project",
    platform: "Google Ads",
    budget: "$100/Week",
    impressions: 1500,
    clicks: 100,
    ctr: "1.7%",
    ctrTarget: "2%",
  },
  {
    id: "CAM-2",
    title: "Summer Campaign 2",
    started: "6/1/2023",
    statusLabel: "Active",
    performanceLabel: "High Performing",
    name: "Luxury Villa 1",
    type: "Project",
    platform: "Instagram",
    budget: "$80/Week",
    impressions: 2000,
    clicks: 120,
    ctr: "2.2%",
    ctrTarget: "2.5%",
  },
  {
    id: "CAM-3",
    title: "Summer Campaign 3",
    started: "6/1/2023",
    statusLabel: "Active",
    performanceLabel: "High Performing",
    name: "Luxury Villa 1",
    type: "Project",
    platform: "Facebook",
    budget: "$300/Week",
    impressions: 1800,
    clicks: 90,
    ctr: "1.5%",
    ctrTarget: "2%",
  },
  {
    id: "CAM-4",
    title: "Summer Campaign 4",
    started: "6/4/2023",
    statusLabel: "Active",
    performanceLabel: "",
    name: "Serene Meadows 2",
    type: "Property",
    platform: "Google Ads",
    budget: "$150/Week",
    impressions: 2500,
    clicks: 110,
    ctr: "1.2%",
    ctrTarget: "2%",
  },
  {
    id: "CAM-5",
    title: "Summer Campaign 5",
    started: "6/1/2023",
    statusLabel: "Active",
    performanceLabel: "",
    name: "Serene Meadows 5",
    type: "Property",
    platform: "Instagram",
    budget: "$50/Week",
    impressions: 1600,
    clicks: 85,
    ctr: "1.7%",
    ctrTarget: "2%",
  },
  {
    id: "CAM-6",
    title: "Summer Campaign 6",
    started: "6/1/2023",
    statusLabel: "Active",
    performanceLabel: "",
    name: "Luxury Villa 6",
    type: "Property",
    platform: "Instagram",
    budget: "$90/Week",
    impressions: 1400,
    clicks: 70,
    ctr: "1.5%",
    ctrTarget: "2%",
  },
];

const campaignPerformanceTableData = [
  {
    id: "CAM-1001",
    campaign: "Summer Campaign 1",
    property: "Luxury Villa 1",
    platform: "Google Ads",
    impressions: 1000,
    clicks: 50,
    ctr: "5.0%",
    inquiries: 10,
    convRate: "2.0%",
    roi: "200%",
  },
  {
    id: "CAM-1002",
    campaign: "Summer Campaign 2",
    property: "Serene Meadows 1",
    platform: "Instagram",
    impressions: 2000,
    clicks: 120,
    ctr: "6.0%",
    inquiries: 20,
    convRate: "3.0%",
    roi: "250%",
  },
  {
    id: "CAM-1003",
    campaign: "Summer Campaign 3",
    property: "Serene Meadows 3",
    platform: "Facebook",
    impressions: 3000,
    clicks: 150,
    ctr: "5.0%",
    inquiries: 30,
    convRate: "2.4%",
    roi: "240%",
  },
  {
    id: "CAM-1004",
    campaign: "Summer Campaign 4",
    property: "Luxury Villa 4",
    platform: "Google Ads",
    impressions: 2500,
    clicks: 100,
    ctr: "4.0%",
    inquiries: 25,
    convRate: "2.0%",
    roi: "270%",
  },
  {
    id: "CAM-1005",
    campaign: "Summer Campaign 5",
    property: "Serene Meadows 5",
    platform: "Instagram",
    impressions: 3200,
    clicks: 150,
    ctr: "4.7%",
    inquiries: 35,
    convRate: "3.0%",
    roi: "300%",
  },
];

const geographicPerformanceData = [
  { city: "New York", impressions: 14000, clicks: 700, inquiries: 50 },
  { city: "Los Angeles", impressions: 12000, clicks: 600, inquiries: 40 },
  { city: "Chicago", impressions: 10000, clicks: 500, inquiries: 30 },
  { city: "Houston", impressions: 9000, clicks: 450, inquiries: 25 },
  { city: "Miami", impressions: 8000, clicks: 400, inquiries: 20 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="advertisement-custom-tooltip">
        <p className="advertisement-tooltip-label">{label}</p>
        {payload.map((entry, index) => (
          <p
            key={index}
            className="advertisement-tooltip-value"
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

const recentMessages = [
  {
    userName: "User 1001",
    clickedOn: "Serene Meadows 1",
    source: "Google Ads",
    location: "Solapur, Maharastra",
    viewdPages: "3",
    time: "1:00 PM",
  },
  {
    userName: "User 1002",
    clickedOn: "Serene Meadows 1",
    source: "Instagram",
    location: "Solapur, Maharastra",
    viewdPages: "3",
    time: "1:00 PM",
  },
  {
    userName: "User 1003",
    clickedOn: "Serene Meadows 1",
    source: "Facebook",
    location: "Solapur, Maharastra",
    viewdPages: "4",
    time: "1:00 PM",
  },
  {
    userName: "User 1004",
    clickedOn: "Serene Meadows 1",
    source: "Google Ads",
    location: "Solapur, Maharastra",
    viewdPages: "5",
    time: "1:00 PM",
  },
  {
    userName: "User 1005",
    clickedOn: "Serene Meadows 1",
    source: "Instagram",
    location: "Solapur, Maharastra",
    viewdPages: "2",
    time: "1:00 PM",
  },
];

const Advertisement = () => {
  const [activeTab, setActiveTab] = useState("activeCampaigns");

  const [searchQuery, setSearchQuery] = useState("");

  const [activePieIndex, setActivePieIndex] = useState(null);

  const [campaignDuration, setCampaignDuration] = useState("6 Months");

  const filteredCampaigns = useMemo(() => {
    if (!searchQuery) return activeCampaignsData;
    return activeCampaignsData.filter((campaign) =>
      campaign.title.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [searchQuery]);

  const getCampaignPerformanceData = () => {
    switch (campaignDuration) {
      case "1 Month":
        return campaignPerformanceData1Month;
      case "3 Months":
        return campaignPerformanceData3Months;
      case "6 Months":
        return campaignPerformanceData6Months;
      case "12 Months":
        return campaignPerformanceData12Months;
      default:
        return campaignPerformanceData6Months;
    }
  };

  const activePieSegment =
    activePieIndex !== null
      ? adPlatformData[activePieIndex]
      : adPlatformData[0];

  return (
    <div className="agent-dashboard-container">
      <Sidebar />
      <div className="agent-dashboard-main-content">
        <div className="advertisement-header-section">
          <div className="advertisement-header-title">
            <h1>Advertisement</h1>
            <p className="advertisement-header-subtitle">
              Boost your properties with targeted advertisements
            </p>
          </div>
          <button
            className="advertisement-create-button"
            style={{ display: "flex", gap: "8px", alignItems: "center" }}
          >
            <TrendingUp size={18} /> Create New Campaign
          </button>
        </div>

        <div className="advertisement-stats-grid">
          {topStats.map((stat, idx) => (
            <div
              key={idx}
              className={`advertisement-stat-card ${idx === 0 ? "advertisement-left-accent" : ""}`}
            >
              <div className="advertisement-stat-header">
                <h3>{stat.title}</h3>
                {stat.icon}
              </div>
              <div className="advertisement-stat-value">{stat.value}</div>
              <div
                className={`advertisement-stat-change ${stat.positive ? "advertisement-positive" : "advertisement-negative"}`}
              >
                {stat.change}
              </div>
            </div>
          ))}
        </div>

        <div className="advertisement-charts-section">
          <div className="advertisement-trends-card">
            <div className="advertisement-chart-header">
              <div>
                <h3>Campaign Performance</h3>
                <p>Ad impressions and clicks over time</p>
              </div>
              <select
                value={campaignDuration}
                onChange={(e) => setCampaignDuration(e.target.value)}
                className="advertisement-select"
              >
                <option>1 Month</option>
                <option>3 Months</option>
                <option>6 Months</option>
                <option>12 Months</option>
              </select>
            </div>
            <div className="advertisement-chart-content">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={getCampaignPerformanceData()}>
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
                    dataKey="impressions"
                    name="impressions"
                    stroke="#7C3AED"
                    strokeWidth={2}
                    dot={{ r: 4, fill: "#7C3AED", strokeWidth: 0 }}
                    activeDot={{ r: 6, fill: "#7C3AED", strokeWidth: 0 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="clicks"
                    name="clicks"
                    stroke="#f97316"
                    strokeWidth={2}
                    dot={{ r: 4, fill: "#f97316", strokeWidth: 0 }}
                    activeDot={{ r: 6, fill: "#f97316", strokeWidth: 0 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="inquiries"
                    name="inquiries"
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
                  <span>Impressions</span>
                </div>
                <div className="agent-dashboard-legend-item">
                  <div
                    className="agent-dashboard-legend-color"
                    style={{ backgroundColor: "#f97316" }}
                  ></div>
                  <span>Clicks</span>
                </div>
                <div className="agent-dashboard-legend-item">
                  <div
                    className="agent-dashboard-legend-color"
                    style={{ backgroundColor: "#10B981" }}
                  ></div>
                  <span>Inquiries</span>
                </div>
              </div>
            </div>
          </div>

          <div className="advertisement-device-card">
            <div className="advertisement-chart-header">
              <div>
                <h3>Ad Platform Distribution</h3>
                <p>Where ads are being displayed</p>
              </div>
            </div>
            <div className="advertisement-chart-content">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={adPlatformData}
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
                    {adPlatformData.map((entry, idx) => (
                      <Cell
                        key={`cell-${idx}`}
                        fill={adPlatformColors[idx]}
                        stroke="none"
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="advertisement-donut-center-label">
                <div className="advertisement-donut-percent">
                  {activePieSegment.value}%
                </div>
                <div className="advertisement-donut-label">
                  {activePieSegment.name}
                </div>
              </div>
            </div>
            <div className="advertisement-chart-legend">
              {adPlatformData.map((item, idx) => (
                <div key={idx} className="advertisement-legend-item">
                  <span style={{ color: adPlatformColors[idx] }}>
                    {item.name} {item.value}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="advertisement-charts-section">
          <div className="advertisement-traffic-card">
            <div className="advertisement-chart-header">
              <div>
                <h3>ROI by Campaign Type</h3>
                <p>Return on investment for different ad types</p>
              </div>
            </div>
            <div
              className="advertisement-chart-content"
              style={{ marginBottom: "1rem" }}
            >
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={roiByCampaignTypeData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#EAEAEA"
                  />
                  <XAxis dataKey="type" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar
                    dataKey="roi"
                    name="ROI (%)"
                    fill="#7C3AED"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
              <div className="agent-dashboard-chart-legend">
                <div className="agent-dashboard-legend-item">
                  <div
                    className="agent-dashboard-legend-color"
                    style={{ backgroundColor: "#7C3AED" }}
                  ></div>
                  <span>roi</span>
                </div>
              </div>
            </div>
          </div>

          <div className="advertisement-trends-card">
            <div className="advertisement-chart-header">
              <div>
                <h3>Campaign Effectiveness</h3>
                <p>Key metrics across campaigns</p>
              </div>
            </div>
            <div className="advertisement-chart-content">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={campaignEffectivenessData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#EAEAEA"
                  />
                  <XAxis dataKey="promo" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Line
                    type="monotone"
                    dataKey="ctr"
                    name="CTR (%)"
                    stroke="#7C3AED"
                    strokeWidth={2}
                    dot={{ r: 4, fill: "#7C3AED", strokeWidth: 0 }}
                    activeDot={{ r: 6, fill: "#7C3AED", strokeWidth: 0 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="conversion"
                    name="Conversion (%)"
                    stroke="#f97316"
                    strokeWidth={2}
                    dot={{ r: 4, fill: "#f97316", strokeWidth: 0 }}
                    activeDot={{ r: 6, fill: "#f97316", strokeWidth: 0 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="roi"
                    name="ROI (%)"
                    stroke="#10B981"
                    strokeWidth={2}
                    dot={{ r: 4, fill: "#10B981", strokeWidth: 0 }}
                    activeDot={{ r: 6, fill: "#10B981", strokeWidth: 0 }}
                  />
                </LineChart>
              </ResponsiveContainer>
              <div className="agent-dashboard-chart-legend">
                <div className="agent-dashboard-legend-item">
                  <div
                    className="agent-dashboard-legend-color"
                    style={{ backgroundColor: "#7C3AED" }}
                  ></div>
                  <span>CTR</span>
                </div>
                <div className="agent-dashboard-legend-item">
                  <div
                    className="agent-dashboard-legend-color"
                    style={{ backgroundColor: "#f97316" }}
                  ></div>
                  <span>Conversion</span>
                </div>
                <div className="agent-dashboard-legend-item">
                  <div
                    className="agent-dashboard-legend-color"
                    style={{ backgroundColor: "#10B981" }}
                  ></div>
                  <span>ROI</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="advertisement-tabs-search">
          <div className="advertisement-dashboard-tabs">
            <button
              className={`advertisement-tab-button ${activeTab === "activeCampaigns" ? "active" : ""}`}
              onClick={() => setActiveTab("activeCampaigns")}
            >
              Active Campaigns
            </button>
            <button
              className={`advertisement-tab-button ${activeTab === "performance" ? "active" : ""}`}
              onClick={() => setActiveTab("performance")}
            >
              Performance
            </button>
          </div>
          <div className="advertisement-search-container">
            <Search size={18} className="advertisement-search-icon" />
            <input
              type="text"
              placeholder="Search campaigns..."
              className="advertisement-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="advertisement-tabs-content">
          {activeTab === "activeCampaigns" && (
            <div className="campaign-cards-grid">
              {filteredCampaigns.map((campaign) => (
                <div key={campaign.id} className="campaign-card">
                  <div className="campaign-card-header">
                    <div>
                      <h3 className="campaign-card-title">{campaign.title}</h3>
                      <p className="campaign-card-date">
                        Started: {campaign.started}
                      </p>
                    </div>
                    <span className="campaign-card-badge">
                      {campaign.statusLabel}
                    </span>
                  </div>

                  <div className="campaign-card-property">
                    <div className="campaign-card-property-icon">
                      <img src={dummyImg} alt="" />
                    </div>
                    <div>
                      <p className="campaign-card-property-name">
                        {campaign.name}
                      </p>
                      <p className="campaign-card-property-label">
                        {campaign.type}
                      </p>
                    </div>
                  </div>

                  <div className="campaign-card-stats">
                    <div className="campaign-card-stat">
                      <span className="campaign-card-stat-label">Platform</span>
                      <span className="campaign-card-stat-value">
                        <Globe
                          className="w-4 h-4 inline mr-1"
                          size={12}
                          style={{ marginRight: "5px" }}
                        />
                        {campaign.platform}
                      </span>
                    </div>

                    <div className="campaign-card-stat">
                      <span className="campaign-card-stat-label">Budget</span>
                      <span className="campaign-card-stat-value">
                        {campaign.budget}
                      </span>
                    </div>

                    <div className="campaign-card-stat">
                      <span className="campaign-card-stat-label">
                        Impressions
                      </span>
                      <span className="campaign-card-stat-value">
                        {campaign.impressions}
                      </span>
                    </div>

                    <div className="campaign-card-stat">
                      <span className="campaign-card-stat-label">Clicks</span>
                      <span className="campaign-card-stat-value">
                        {campaign.clicks}
                      </span>
                    </div>

                    <div className="campaign-card-stat-ctr">
                      <div className="flex justify-between">
                        <span className="campaign-card-stat-label">
                          CTR: {campaign.ctr}
                        </span>
                        <span className="campaign-card-stat-target">
                          Target: {campaign.ctrTarget}
                        </span>
                      </div>
                      <div className="campaign-card-progress">
                        <div
                          className="campaign-card-progress-bar"
                          style={{
                            width: `${Math.min((Number.parseInt(campaign.ctr) / Number.parseInt(campaign.ctrTarget)) * 100, 100)}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <div className="campaign-card-footer">
                    <button className="campaign-card-button-edit">Edit</button>
                    <button className="campaign-card-button-view">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        className="w-4 h-4 mr-1"
                      >
                        <path
                          d="M7 17L17 7M17 7H7M17 7V17"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      View
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "performance" && (
            <>
              <div className="advertisement-table-section">
                <h3 className="advertisement-table-title">
                  Campaign Performance
                </h3>
                <p className="advertisement-table-subtitle">
                  Detailed metrics for all your campaigns
                </p>
                <table className="advertisement-table">
                  <thead>
                    <tr>
                      <th>Campaign</th>
                      <th>Property/Project</th>
                      <th>Platform</th>
                      <th>Impressions</th>
                      <th>Clicks</th>
                      <th>CTR</th>
                      <th>Inquiries</th>
                      <th>Conv. Rate</th>
                      <th>ROI</th>
                    </tr>
                  </thead>
                  <tbody>
                    {campaignPerformanceTableData.map((item) => (
                      <tr key={item.id}>
                        <td>
                          <div className="advertisement-visitor-cell">
                            <span className="advertisement-visitor-name">
                              {item.campaign}
                            </span>
                            <span className="advertisement-visitor-email">
                              ID: {item.id}
                            </span>
                          </div>
                        </td>
                        <td>{item.property}</td>
                        <td>{item.platform}</td>
                        <td>{item.impressions}</td>
                        <td>{item.clicks}</td>
                        <td>{item.ctr}</td>
                        <td>{item.inquiries}</td>
                        <td>{item.convRate}</td>
                        <td>{item.roi}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="advertisement-visitor-engagement-section">
                <h3 className="advertisement-visitor-engagement-title">
                  Geographic Performance
                </h3>
                <p className="advertisement-visitor-engagement-subtitle">
                  How your ads perform across different locations
                </p>
                <div className="advertisement-visitor-engagement-chart">
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={geographicPerformanceData}>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        vertical={false}
                        stroke="#EAEAEA"
                      />
                      <XAxis dataKey="city" axisLine={false} tickLine={false} />
                      <YAxis axisLine={false} tickLine={false} />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar
                        dataKey="impressions"
                        name="impressions"
                        fill="#7C3AED"
                        radius={[4, 4, 0, 0]}
                      />
                      <Bar
                        dataKey="clicks"
                        name="clicks"
                        fill="#f97316"
                        radius={[4, 4, 0, 0]}
                      />
                      <Bar
                        dataKey="inquiries"
                        name="inquiries"
                        fill="#10B981"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="inquiries-recent-messages-section">
          <div className="inquiries-recent-header">
            <div>
              <h3 className="inquiries-recent-title">Recent Ad Interactions</h3>
              <p className="inquiries-recent-subtitle">
                Users who recently interacted with your ads
              </p>
            </div>
            <button className="inquiries-view-all-btn">View All</button>
          </div>

          <div className="inquiries-message-list">
            {recentMessages.map((msg) => (
              <div key={msg.id} className="inquiries-message-item">
                <div className="inquiries-message-top">
                  <div>
                    <div
                      style={{
                        display: "flex",
                        gap: "8px",
                        alignItems: "center",
                        marginBottom: "10px",
                      }}
                    >
                      <UserCircle />
                      <h4 className="inquiries-message-name">{msg.userName}</h4>
                    </div>
                    <p className="inquiries-message-property">
                      Clicked on :{msg.clickedOn}
                    </p>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "25px",
                      position: "relative",
                    }}
                  >
                    <div className="inquiries-message-time">{msg.time}</div>
                    <button
                      style={{
                        position: "absolute",
                        width: "120px",
                        top: "25px",
                        left: "-65px",
                        right: 0,
                      }}
                      className="campaign-card-button-view"
                    >
                      View Details
                    </button>
                  </div>
                </div>

                <div
                  className="inquiries-message-text"
                  style={{ display: "flex", gap: "25px", alignItems: "center" }}
                >
                  <div>
                    <Globe size={12} /> {msg.source}
                  </div>
                  <div>
                    <MapPin size={12} /> {msg.location}
                  </div>
                  <div>
                    <Calendar size={12} /> Viewed {msg.viewdPages} Pages
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Advertisement;
