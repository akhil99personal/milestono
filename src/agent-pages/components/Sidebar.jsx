import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Building2,
  ChevronLeft,
  ChevronRight,
  Eye,
  Home,
  LineChart,
  Menu,
  MessageSquare,
  Plus,
  Settings,
  Users,
} from "lucide-react";
import "./Sidebar.css";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  useEffect(() => {
    const savedState = localStorage.getItem("sidebar-collapsed");
    if (savedState !== null) {
      setCollapsed(JSON.parse(savedState));
    }
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--sidebar-width",
      collapsed ? "70px" : "260px",
    );
  }, [collapsed]);

  const toggleSidebar = () => {
    const newState = !collapsed;
    setCollapsed(newState);
    localStorage.setItem("sidebar-collapsed", JSON.stringify(newState));
  };

  const toggleMobileSidebar = () => {
    setMobileOpen(!mobileOpen);
  };

  const navItems = [
    { icon: <Home size={20} />, label: "Dashboard", path: "/agent-dashboard" },
    {
      icon: <Building2 size={20} />,
      label: "Properties & Projects",
      path: "/agent-properties-and-projects",
    },
    {
      icon: <MessageSquare size={20} />,
      label: "Inquiries",
      path: "/agent-inquiries",
    },
    { icon: <Users size={20} />, label: "Profile", path: "/agent-profile" },
  ];

  const overlayClass =
    isMobile && mobileOpen
      ? "agents-dashboard-sidebar-overlay active"
      : "agents-dashboard-sidebar-overlay";
  const sidebarClass = `agents-dashboard-sidebar ${collapsed ? "collapsed" : ""} ${isMobile ? "mobile" : ""} ${mobileOpen ? "mobile-open" : ""}`;

  return (
    <>
      {isMobile && (
        <button
          className="agents-dashboard-mobile-toggle"
          onClick={toggleMobileSidebar}
        >
          <Menu size={24} />
        </button>
      )}
      {isMobile && (
        <div className={overlayClass} onClick={toggleMobileSidebar}></div>
      )}

      <div className={sidebarClass}>
        <div className="agents-dashboard-sidebar-header">
          <div className="agents-dashboard-logo-container">
            <a
              href="/"
              className="agents-dashboard-logo"
              style={{ textDecoration: "none" }}
            >
              milestono
            </a>
            <button
              className="agents-dashboard-toggle-button"
              onClick={toggleSidebar}
            >
              {collapsed ? (
                <ChevronRight size={20} />
              ) : (
                <ChevronLeft size={20} />
              )}
            </button>
          </div>
          <a
            href="/agent-properties-and-projects"
            style={{ textDecoration: "none" }}
          >
            <button className="agents-dashboard-add-property-button">
              <Plus size={16} />
              <span className="agents-dashboard-button-text">
                Add New Property
              </span>
            </button>
          </a>
        </div>

        <nav className="agents-dashboard-sidebar-nav">
          <ul className="agents-dashboard-nav-list">
            {navItems.map((item, index) => {
              const isActive = location.pathname === item.path;
              return (
                <li
                  key={index}
                  className={`agents-dashboard-nav-item ${isActive ? "active" : ""}`}
                >
                  <a href={item.path} className="agents-dashboard-nav-link">
                    <span className="agents-dashboard-nav-icon">
                      {item.icon}
                    </span>
                    <span className="agents-dashboard-nav-label">
                      {item.label}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
