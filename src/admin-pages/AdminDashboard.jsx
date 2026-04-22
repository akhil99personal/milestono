import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    BarChart,
    Bar
} from "recharts";
import FadeLoader from "react-spinners/FadeLoader";
import AdminNavbar from "./AdminNavbar";
import "./admin-global.css";
// Optional custom CSS for specific dashboard grid layout if needed later
import "./AdminDashboard.css";

const AdminDashboard = () => {
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const token = localStorage.getItem("auth");

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({
        properties: [],
        projects: [],
        users: [],
        premiumHistories: []
    });

    // State for Chart Filters
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth()); // 0-11
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                setLoading(true);
                const [propsRes, projRes, usersRes, premiumRes] = await Promise.all([
                    axios.get(`${BASE_URL}/api/property_details`),
                    axios.get(`${BASE_URL}/api/projects`),
                    axios.get(`${BASE_URL}/api/userdetails`, { headers: { Authorization: token } }),
                    axios.get(`${BASE_URL}/api/account-histories`)
                ]);

                setData({
                    properties: propsRes.data || [],
                    projects: projRes.data || [],
                    users: usersRes.data || [],
                    premiumHistories: premiumRes.data || []
                });
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, [BASE_URL, token]);


    // --- Data Processing for Line Chart (Properties & Projects over time) ---
    const lineChartData = useMemo(() => {
        // Generate an array of days for the selected month/year
        const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
        const daysMap = {};
        for (let i = 1; i <= daysInMonth; i++) {
            daysMap[i] = { day: i, Properties: 0, Projects: 0 };
        }

        // Process properties (Assuming they have 'createdAt' or 'date')
        data.properties.forEach(item => {
            const d = new Date(item.createdAt || item.date);
            if (d.getMonth() === selectedMonth && d.getFullYear() === selectedYear) {
                daysMap[d.getDate()].Properties += 1;
            }
        });

        // Process projects
        data.projects.forEach(item => {
            const d = new Date(item.date || item.createdAt);
            if (d.getMonth() === selectedMonth && d.getFullYear() === selectedYear) {
                daysMap[d.getDate()].Projects += 1;
            }
        });

        return Object.values(daysMap);
    }, [data.properties, data.projects, selectedMonth, selectedYear]);

    // --- Data Processing for Bar Chart (Premium Purchases per month) ---
    const barChartData = useMemo(() => {
        const monthsMap = {
            "Jan": 0, "Feb": 0, "Mar": 0, "Apr": 0, "May": 0, "Jun": 0,
            "Jul": 0, "Aug": 0, "Sep": 0, "Oct": 0, "Nov": 0, "Dec": 0
        };

        data.premiumHistories.forEach(item => {
            const d = new Date(item.paymentDate || item.createdAt);
            if (d.getFullYear() === selectedYear) {
                const m = d.toLocaleString('default', { month: 'short' });
                if (monthsMap[m] !== undefined) monthsMap[m] += 1;
            }
        });

        return Object.keys(monthsMap).map(key => ({
            month: key,
            PremiumUsers: monthsMap[key]
        }));
    }, [data.premiumHistories, selectedYear]);


    // --- Data for Lists & Stats ---

    // Total Counts
    const totalUsers = data.users.length;
    const totalProperties = data.properties.length;
    const totalProjects = data.projects.length;

    // Active Premium Users (Validity end date > today)
    const activePremiumUsers = data.premiumHistories.filter(h => new Date(h.validityEndDate) > new Date()).length;

    // Newest Users (Sort by _id or createdAt)
    const newestUsers = [...data.users]
        .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
        .slice(0, 5);

    // Latest Properties & Projects combined (Notifications feel)
    const latestUploads = [
        ...data.properties.map(p => ({ ...p, _type: 'Property', _date: new Date(p.createdAt || p.date) })),
        ...data.projects.map(p => ({ ...p, _type: 'Project', _date: new Date(p.createdAt || p.date) }))
    ].sort((a, b) => b._date - a._date).slice(0, 5);

    // Expiring soon premium accounts (Within next 7 days)
    const expiringPremium = data.premiumHistories.filter(h => {
        const expiry = new Date(h.validityEndDate);
        const now = new Date();
        const diffTime = Math.abs(expiry - now);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return expiry > now && diffDays <= 7;
    }).slice(0, 5);


    return (
        <div className="table-container">
            <AdminNavbar />
            {loading ? (
                <div className="loading-center">
                    <FadeLoader color="var(--admin-primary-blue)" />
                </div>
            ) : (
                <div className="admin-section dashboard-main">

                    <div className="dashboard-header-row">
                        <h2 className="section-title">Overview Dashboard</h2>
                        <div className="dashboard-filters">
                            <select
                                value={selectedMonth}
                                onChange={e => setSelectedMonth(Number(e.target.value))}
                                className="filter-dropdown"
                            >
                                {Array.from({ length: 12 }).map((_, i) => {
                                    const date = new Date(0, i);
                                    return <option key={i} value={i}>{date.toLocaleString('default', { month: 'long' })}</option>
                                })}
                            </select>
                            <select
                                value={selectedYear}
                                onChange={e => setSelectedYear(Number(e.target.value))}
                                className="filter-dropdown"
                            >
                                {[selectedYear - 1, selectedYear, selectedYear + 1].map(y => (
                                    <option key={y} value={y}>{y}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Metric Cards */}
                    <div className="metric-cards-container">
                        <div className="metric-card">
                            <div className="metric-title">Total Users</div>
                            <div className="metric-value">{totalUsers}</div>
                        </div>
                        <div className="metric-card">
                            <div className="metric-title">Total Properties</div>
                            <div className="metric-value">{totalProperties}</div>
                        </div>
                        <div className="metric-card">
                            <div className="metric-title">Total Projects</div>
                            <div className="metric-value">{totalProjects}</div>
                        </div>
                        <div className="metric-card highlight">
                            <div className="metric-title" style={{color: "white"}}>Active Premium Users</div>
                            <div className="metric-value">{activePremiumUsers}</div>
                        </div>
                    </div>

                    <div className="dashboard-grid">

                        {/* Line Chart Section */}
                        <div className="dashboard-chart-card article-section">
                            <h3>Uploads in {new Date(selectedYear, selectedMonth).toLocaleString('default', { month: 'long' })} {selectedYear}</h3>
                            <div style={{ width: '100%', height: 350 }}>
                                <ResponsiveContainer>
                                    <LineChart data={lineChartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                        <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                                        <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }} />
                                        <Legend wrapperStyle={{ paddingTop: '20px' }} />
                                        <Line type="monotone" dataKey="Properties" stroke="#2563eb" strokeWidth={3} dot={{ r: 4, fill: '#2563eb', strokeWidth: 0 }} activeDot={{ r: 8 }} />
                                        <Line type="monotone" dataKey="Projects" stroke="#10b981" strokeWidth={3} dot={{ r: 4, fill: '#10b981', strokeWidth: 0 }} activeDot={{ r: 8 }} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Bar Chart Section */}
                        <div className="dashboard-chart-card article-section">
                            <div className="card-header-flex">
                                <h3>Premium Purchases ({selectedYear})</h3>
                                <Link to="/admin-premium-users" className="global-link-btn">View All</Link>
                            </div>
                            <div style={{ width: '100%', height: 350 }}>
                                <ResponsiveContainer>
                                    <BarChart data={barChartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                        <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                                        <Tooltip cursor={{ fill: '#f1f5f9' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }} />
                                        <Bar dataKey="PremiumUsers" fill="#f59e0b" radius={[4, 4, 0, 0]} maxBarSize={50} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Lists Section */}
                        <div className="dashboard-lists-row">

                            {/* Latest Uploads Notification Style */}
                            <div className="dashboard-list-card article-section">
                                <h3>Latest Properties & Projects</h3>
                                <div className="notif-list">
                                    {latestUploads.length > 0 ? latestUploads.map((item, i) => (
                                        <div key={i} className="notif-item">
                                            <div className={`notif-icon ${item._type === 'Property' ? 'bg-blue' : 'bg-green'}`}>
                                                <i className={`fa-solid ${item._type === 'Property' ? 'fa-building' : 'fa-city'}`}></i>
                                            </div>
                                            <div className="notif-content">
                                                <h4>{item.propertyName || item.title || "Unnamed"}</h4>
                                                <p>New {item._type} added • {item._date.toLocaleDateString()}</p>
                                            </div>
                                        </div>
                                    )) : <p className="empty-text">No uploads yet.</p>}
                                </div>
                            </div>

                            {/* New Users */}
                            <div className="dashboard-list-card article-section">
                                <h3>Newly Registered Users</h3>
                                <div className="notif-list">
                                    {newestUsers.length > 0 ? newestUsers.map((user, i) => (
                                        <div key={i} className="notif-item">
                                            <img
                                                src={user.profile || "https://d30y9cdsu7xlg0.cloudfront.net/png/138926-200.png"}
                                                alt="User"
                                                className="small-avatar"
                                            />
                                            <div className="notif-content">
                                                <h4>{user.fullName || "User"}</h4>
                                                <p>{user.email || user.phone}</p>
                                            </div>
                                        </div>
                                    )) : <p className="empty-text">No new users.</p>}
                                </div>
                            </div>

                            {/* Expiring Premium */}
                            <div className="dashboard-list-card article-section">
                                <div className="card-header-flex">
                                    <h3>Expiring Premium Soon</h3>
                                </div>
                                <div className="notif-list">
                                    {expiringPremium.length > 0 ? expiringPremium.map((h, i) => {
                                        const expiry = new Date(h.validityEndDate);
                                        const now = new Date();
                                        const diffDays = Math.ceil(Math.abs(expiry - now) / (1000 * 60 * 60 * 24));
                                        return (
                                            <div key={i} className="notif-item warning">
                                                <div className="notif-icon bg-yellow">
                                                    <i className="fa-solid fa-triangle-exclamation"></i>
                                                </div>
                                                <div className="notif-content">
                                                    <h4>{h.accountName} - {h.email}</h4>
                                                    <p>Expires in {diffDays} day(s)</p>
                                                </div>
                                                <button className="sm-btn" onClick={() => window.location.href = `mailto:${h.email}`}>Email</button>
                                            </div>
                                        )
                                    }) : <p className="empty-text">No users expiring within 7 days.</p>}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;