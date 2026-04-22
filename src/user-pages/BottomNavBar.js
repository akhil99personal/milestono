import { React, useState, useRef, useEffect } from "react";
import "./BottomNavBar.css";
import UserProfileNavbar from "./UserProfileNavbar";

import Person1 from "../images/Person1.jpg";
import Person2 from "../images/Person2.jpg";
import PersonDummy from "../images/PersonDummy.png";
import TeamDummy from "../images/TeamDummy.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import FadeLoader from "react-spinners/FadeLoader";

const BottomNavBar = ({ handleMarkAsRead, problems, setProblems }) => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const [payToProblem, setPayToProblem] = useState([]);
  const [verifyProblem, setVerifiedProblem] = useState([]);
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOTPOpen, setIsOTPModalOpen] = useState(false);
  const [expectedPrice, setExpectedPrice] = useState("");
  const [otp, setOTP] = useState("");
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleNotificationModal = () => {
    setIsNotificationModalOpen(!isNotificationModalOpen);
  };

  const fetchProblems = async () => {
    try {
      const token = localStorage.getItem("auth");
      if (!token) {
        console.error("No auth token found");
        return;
      }
      const response = await axios.get(`${BASE_URL}/api/notification`, {
        headers: {
          Authorization: token,
        },
      });
      setProblems(response.data);
    } catch (error) {
      console.error("Error fetching problems:", error);
    }
  };
  useEffect(() => {
    fetchProblems();
  }, []);

  const openModal = (request) => {
    setSelectedProblem(request);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedProblem(null);
  };

  const toggleModal = () => {
    setIsModalOpen(false);
    setIsOTPModalOpen(false);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await axios.put(
        `${BASE_URL}/api/admin_servicerequest/${selectedProblem._id}`,
        { expectedPrice },
      );
      navigate("/");
    } catch (error) {
      console.error("Error submitting property details:", error);
    } finally {
      setLoading(false);
    }
    toggleModal();
  };

  const handlePaid = async (id) => {
    try {
      setLoading(true);
      await axios.put(`${BASE_URL}/api/paid_servicerequest/${id}`);
      navigate("/");
    } catch (error) {
      console.error("Error submitting property details:", error);
    } finally {
      setLoading(false);
    }
    fetchProblems();
  };

  const handleVerify = async () => {
    try {
      setLoading(true);
      await axios.put(
        `${BASE_URL}/api/verify_servicerequest/${selectedProblem._id}`,
        { otp },
      );
      navigate("/");
    } catch (error) {
      console.error("Error submitting property details:", error);
    } finally {
      setLoading(false);
    }
    toggleModal();
    fetchProblems();
  };

  const toggleRejectModal = () => {
    setIsRejectModalOpen(false);
  };
  const handleReject = async () => {
    try {
      setLoading(true);
      await axios.delete(
        `${BASE_URL}/api/servicerequest/${selectedProblem._id}`,
      );
      fetchProblems();
      navigate("/");
    } catch (error) {
      console.error("Error submitting property details:", error);
    } finally {
      setLoading(false);
    }
    setIsRejectModalOpen(false);
    fetchProblems();
  };

  const [inbox, setInbox] = useState([
    {
      id: 1,
      name: "Hailey Garza",
      profilePic: Person1,
      action: "added new tags to",
      project: "🔥 Ease Design System",
      tags: ["UI Design", "Dashboard", "Design system"],
      time: "1 min ago",
    },
    {
      id: 2,
      name: "Emily",
      profilePic: Person2,
      action: "asked to join",
      project: "🔥 Ease Design System",
      tags: ["Web dev"],
      time: "1 hour ago",
    },
    {
      id: 3,
      name: "Kamron",
      profilePic: PersonDummy,
      action: "asked to join",
      project: "🔥 Ease Design System",
      time: "1 hour ago",
    },
    {
      id: 4,
      name: "Hailey Garza",
      profilePic: Person1,
      action: "added new tags to",
      project: "🔥 Ease Design System",
      tags: ["UI Design", "Dashboard", "Design system"],
      time: "1 min ago",
    },
    {
      id: 5,
      name: "Emily",
      profilePic: Person2,
      action: "asked to join",
      project: "🔥 Ease Design System",
      tags: ["Web dev"],
      time: "1 hour ago",
    },
    {
      id: 6,
      name: "Kamron",
      profilePic: PersonDummy,
      action: "asked to join",
      project: "🔥 Ease Design System",
      time: "1 hour ago",
    },
  ]);

  const [team, setTeam] = useState([
    {
      id: 1,
      name: "Winfield",
      profilePic: TeamDummy,
      action: "mentioned you in",
      project: "🍉 Kohaku Landing Page",
      time: "Feb 8",
      comment:
        "Hey, I just brought in some missing states from our old design file. Can you help set up the components?",
    },
    {
      id: 2,
      name: "MG",
      profilePic: TeamDummy,
      action: "mentioned you in",
      project: "Cammins FAQs Page",
      time: "Dec 5",
      comment:
        "Hey, I just brought in some missing states from our old design file. Can you help set up the components?",
    },
  ]);

  const handleAccept = (id) => {
    if (activeTab === "Inbox") {
      setInbox((prev) => prev.filter((notification) => notification.id !== id));
    } else if (activeTab === "Team") {
      setTeam((prev) => prev.filter((notification) => notification.id !== id));
    }
  };

  const handleDecline = (id) => {
    if (activeTab === "Inbox") {
      setInbox((prev) => prev.filter((notification) => notification.id !== id));
    } else if (activeTab === "Team") {
      setTeam((prev) => prev.filter((notification) => notification.id !== id));
    }
  };

  const [activeTab, setActiveTab] = useState("Inbox");

  const renderContent = () => {
    const data = activeTab === "Inbox" ? inbox : team;
    return (
      <div className="menu-section">
        {data.map((item) => (
          <div key={item.id} className="notification-item">
            <img
              src={item.profilePic}
              alt={item.name}
              className="profile-pic"
            />
            <div className="notification-content">
              <p>
                <strong>{item.name}</strong> {item.action}{" "}
                <strong>{item.project}</strong>
              </p>
              {item.comment && <p className="comment">{item.comment}</p>}
              <span className="time">{item.time}</span>
              <div className="actions">
                <button
                  onClick={() => handleAccept(item.id)}
                  className="accept-button"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleDecline(item.id)}
                  className="decline-button"
                >
                  Decline
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderNotification = (item) => {
    return (
      <div key={item.id} className="notification-item">
        <img src={PersonDummy} alt="notification" className="profile-pic" />
        <div className="notification-content">
          <p>{item.textInfo}</p>
          <div className="actions">
            <button
              onClick={() => {
                item.firstFunction();
              }}
              className="accept-button"
            >
              {item.firstBtn}
            </button>
            <button
              onClick={() => {
                item.secondFunction();
              }}
              className="decline-button"
            >
              {item.secondBtn}
            </button>
          </div>
        </div>
      </div>
    );
  };

  const notiModalRef = useRef(null);

  const handleCloseModal = () => {
    document.getElementById("noti-model").classList.add("closing-animation");
    setTimeout(() => {
      toggleNotificationModal();
    }, 1500);
  };

  return (
    <div className="bottom-nav-bar">
      <a href="/" style={{ textDecoration: "none", color: "none" }}>
        <div className="bottom-nav-bar-nav-item">
          <i className="fa-solid fa-house"></i>
        </div>
      </a>
      <a href="/insights" style={{ textDecoration: "none", color: "none" }}>
        <div className="bottom-nav-bar-nav-item">
          <i className="fa-solid fa-lightbulb"></i>
        </div>
      </a>
      <a
        href="/post-property"
        style={{ textDecoration: "none", color: "none" }}
      >
        <div className="bottom-nav-bar-nav-item">
          <div className="bottom-nav-bar-nav-item-sell-rent-icon">
            <i className="fa-solid fa-plus"></i>
          </div>
        </div>
      </a>
      <div style={{ textDecoration: "none", color: "none" }}>
        <div
          className="bottom-nav-bar-nav-item"
          onClick={toggleNotificationModal}
        >
          <i className="fa-solid fa-bell"></i>
          {problems.length > 0 && (
            <span className="notification-count">{problems.length}</span>
          )}
        </div>
        {isNotificationModalOpen && (
          <div
            className={`notification-modal`}
            id="noti-model"
            ref={notiModalRef}
          >
            <h2>Notifications</h2>
            <button className="noti-close-btn" onClick={handleCloseModal}>
              X
            </button>
            <div className="notification-menu-notifications-container">
              <div className="tab-buttons">
                <button
                  onClick={() => setActiveTab("Inbox")}
                  className={`tab-button ${activeTab === "Inbox" ? "active-tab" : ""}`}
                >
                  Inbox ({problems.length})
                </button>
              </div>
              <div className="menu-section">
                {loading ? (
                  <div className="loader-container">
                    <FadeLoader color="var(--primary-color)" />
                  </div>
                ) : (
                  <>
                    {problems.map((pr, ind) =>
                      renderNotification({
                        id: ind,
                        textInfo: pr.text,
                        image: pr.image,
                        firstFunction: () => {
                          window.location.href = pr.redirect;
                        },
                        firstBtn: "Open",
                        secondFunction: () => {
                          handleMarkAsRead(pr._id);
                        },
                        secondBtn: "Mark as read",
                      }),
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      <div
        className="bottom-nav-bar-nav-item"
        style={{ marginRight: "-.6rem" }}
      >
        <UserProfileNavbar />
      </div>
      {modalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              ×
            </button>
            <h2 className="modal-title">Service Request Details</h2>
            {selectedProblem && (
              <div className="modal-body">
                <div className="modal-left">
                  <div className="modal-image">
                    <img src={selectedProblem.problemImage} alt="Problem" />
                  </div>
                </div>
                <div className="modal-right">
                  <div className="modal-details">
                    <p>
                      <strong>Name:</strong> {selectedProblem.name}
                    </p>
                    <p>
                      <strong>Service Category:</strong>{" "}
                      {selectedProblem.serviceCategory}
                    </p>
                    <p>
                      <strong>Problem Type:</strong>{" "}
                      {selectedProblem.problemType}
                    </p>
                    <p>
                      <strong>Problem Description:</strong>{" "}
                      {selectedProblem.problemDescription}
                    </p>
                    <p>
                      <strong>Address:</strong> {selectedProblem.address}
                    </p>
                    {selectedProblem.expectedPrice && (
                      <p>
                        <strong>Price:</strong> {selectedProblem.expectedPrice}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {selectedProblem && isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Enter Expected Price</h2>
            <div>
              <label>
                Expected Price:
                <input
                  type="number"
                  value={expectedPrice}
                  onChange={(e) => setExpectedPrice(e.target.value)}
                  required
                />
              </label>
              <div className="modal-buttons">
                <button type="button" className="red-btn" onClick={toggleModal}>
                  Cancel
                </button>
                <button
                  type="submit"
                  className="green-btn"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedProblem && isModalOTPOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Confirm Your OTP</h2>
            <div>
              <label>
                Enter Your OTP:
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOTP(e.target.value)}
                  required
                />
              </label>
              <div className="modal-buttons">
                <button type="button" className="red-btn" onClick={toggleModal}>
                  Cancel
                </button>
                <button
                  type="submit"
                  className="green-btn"
                  onClick={handleVerify}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedProblem && isRejectModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Confirm delete sevice detail?</h2>
            <div>
              <div className="modal-buttons">
                <button
                  type="button"
                  className="grey-btn"
                  onClick={toggleRejectModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="red-btn"
                  onClick={handleReject}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BottomNavBar;
