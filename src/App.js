import React, { useEffect } from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "./App.css";
import HomePage from "./user-pages/HomePage";
import Login from "./authentication/Login.js";
import SignUp from "./authentication/SignUp.js";
import Error from "./others/Error";
import PropertyForm from "./user-pages/PropertyForm.js";
import SearchProperty from "./user-pages/SearchProperty.js";
import PropertyDetails from "./user-pages/PropertyDetails.js";
import ServiceForm from "./user-pages/serviceform/ServiceForm.js";
import ServiceDetails from "./admin-pages/ServiceDetails.js";
import PropertyDetails1 from "./admin-pages/PropertyDetails.js";
import PremiumForm from "./admin-pages/PremiumForm.js";
import ServiceRequestDetails from "./admin-pages/ServiceRequestDetails.js";
import AdminNotifications from "./admin-pages/AdminNotifications.js";
import PremimumAccount from "./user-pages/premiumaccount/MyPremiumAccount.js";
import MyProperty from "./user-pages/mypropety/MyProperty.js";
import MyService from "./user-pages/myservice/MyService.js";
import Chatbot from "./Chatbot.js";
import ProtectedRoute from "./authentication/ProtectedRoute.js";
import ForgotPassword from "./authentication/ForgotPassword.js";
import ResetPassword from "./authentication/ResetPassword.js";
import SelectService from "./user-pages/serviceform/SelectService.js";
import PayToServiceRequest from "./admin-pages/PayToServiceRequest";
import HomePageEdit from "./admin-pages/HomePageEdit.js";
import ContactUs from "./user-pages/contactus/contact.js";
import Faqs from "./user-pages/faqs/faqs.js";
import InsightsPage from "./user-pages/InsightsPage.jsx";
import TaxAndLegalAdviceIndia from "./user-pages/TaxAndLegalAdvice.jsx";
import PropertyCalculator from "./user-pages/PropertyCalculatorPage.jsx";
import AboutPage from "./user-pages/homepage/AboutUsPage.jsx";
import PostProperty from "./user-pages/post-property/PostProperty.jsx";
import PostPropertyForm from "./user-pages/post-property/PostPropertyForm.jsx";
import NewsAndArticles from "./user-pages/news-artical/NewsArticalsTemplate.jsx";
import AllNewsAndArticles from "./user-pages/news-artical/NewsArticalsPage.jsx";
import UnderConstructionPage from "./user-pages/UnderConstructionPage.jsx";
import MyActivity from "./user-pages/MyActivity.jsx";
import LoanPage from "./user-pages/loanPage/LoanPage.jsx";
import ExplorePojects from "./user-pages/explore projects/ExploreProjects.jsx";
import PrivacyPolicy from "./user-pages/terms policy/PrivacyPolicy.jsx";
import DeliveryTimeline from "./user-pages/terms policy/DeliveryTimeline.js";
import TermsCondition from "./user-pages/terms policy/TermsCondition.jsx";
import FeedbackDetailes from "./admin-pages/FeedbackDetailes.js";
import InquiryDestails from "./admin-pages/InquiryDetails.js";
import newProjects from "./admin-pages/newProjects.js";
import BankDetails from "./admin-pages/BankDetails.js";
import UserFeedbacks from "./user-pages/UserFeedbacks.jsx";
import GalleryImages from "./admin-pages/GalleryImages.js";
import MobGalleryImages from "./admin-pages/MobGalleryImages.js";
import TermsService from "./user-pages/terms policy/TermsService.jsx";
import Desclaimer from "./user-pages/terms policy/Desclaimer.jsx";
import RefundPolicy from "./user-pages/terms policy/RefundPolicy.jsx";
import PremiumAccountHistory from "./admin-pages/PremiumHistory.js";
import UserDetails from "./admin-pages/UserDetails.js";
import AgentsPage from "./user-pages/AgentsPage.jsx";
import PricingPage from "./user-pages/PricingPage.jsx";
import AdminDashboard from "./admin-pages/AdminDashboard.jsx"
import NewAgents from "./admin-pages/newAgents.js";
import AllAgentsFlow from "./admin-pages/AllAgentsFlow.js";
import ServiceProviderFlow from "./admin-pages/ServiceProviderFlow.js";
import AddNumber from "./authentication/AddNumber.js";
import AgentDashboard from "./agent-pages/Dashboard.jsx";
import AgentsPropertiesProjects from "./agent-pages/PropertiesAndProjects.jsx";
import AgentsInquiries from "./agent-pages/Inquiries.jsx";
import AgentsViewed from "./agent-pages/Viewed.jsx";
import AgentsAdvertisement from "./agent-pages/Advertisement.jsx";
import AgentsProfile from "./agent-pages/Profile.jsx";
import ServiceProviderMap from "./user-pages/newservicepage/ServicemansPage.jsx";
import ReceivedServiceRequestsPage from "./user-pages/receivedservicerequests/ReceivedServiceRequestsPage.jsx";
import UserProfile from "./user-pages/ProfilePage.jsx";
import { io } from "socket.io-client";
import { useRef } from "react";
import { useState } from "react";

function App() {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [problems, setProblems] = useState([]);
  const socketRef = useRef(null);

  useEffect(() => {
    const loadScript = (url) => {
      const script = document.createElement("script");
      script.src = url;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    };

    const googleApiKey = process.env.REACT_APP_GOOGLE_API_KEY;
    if (googleApiKey) {
      loadScript(
        `https://maps.googleapis.com/maps/api/js?key=${googleApiKey}&libraries=places`,
      );
    }
  }, []);

  const handleMarkAsRead = (nid) => {
    setProblems((prev) => prev.filter((n) => n._id !== nid));

    if (socketRef.current && socketRef.current.connected) {
      socketRef.current.emit("mark-notification-read", { notificationId: nid });
    } else {
      const token = localStorage.getItem("auth");
      if (token) {
        fetch(`${BASE_URL}/api/notification/${nid}`, {
          method: "PATCH",
          headers: {
            "Authorization": token
          }
        }).catch(err => console.error("Error marking notification as read:", err));
      }
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("auth");
    if (!token) return;

    if ("Notification" in window && Notification.permission !== "granted") {
      Notification.requestPermission();
    }

    const fetchProblems = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/notification`, {
          headers: { Authorization: token },
        });
        if (res.ok) {
          const data = await res.json();
          setProblems(data);
        }
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };
    fetchProblems();

    socketRef.current = io(BASE_URL, {
      transports: ["websocket"],
    });

    socketRef.current.on("connect", () => {
      socketRef.current.emit("register", { token });
    });

    socketRef.current.on("new-notification", (notification) => {
      setProblems((prev) => {
        // Prevent duplicates
        if (prev.some((n) => n._id === notification._id)) return prev;
        return [notification, ...prev];
      });

      if ("Notification" in window && Notification.permission === "granted") {
        new Notification("New Notification", {
          body: notification?.text || "You have a new update",
          icon: notification?.image,
        });
      }
    });

    // Listen for notification removal (when session ends or assigned to another vendor)
    socketRef.current.on("notification-removed", ({ notificationId }) => {
      setProblems((prev) => prev.filter((n) => n._id !== notificationId));
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  useEffect(() => {
    console.log(problems);
  }, [problems]);

  return (
    <div className="App">
      <Toaster position="top-right" reverseOrder={false} />
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                handleMarkAsRead={handleMarkAsRead}
                problems={problems}
                setProblems={setProblems}
              />
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/add-number" element={<AddNumber />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route
            path="/form"
            element={
              <ProtectedRoute
                component={PropertyForm}
                allowedRoles={["user"]}
              />
            }
          />
          <Route path="/premium" element={<PricingPage />} />
          <Route
            path="/serviceform"
            element={
              <ProtectedRoute component={ServiceForm} allowedRoles={["user"]} />
            }
          />
          <Route
            path="/requestserviceform"
            element={
              <ProtectedRoute
                component={SelectService}
                allowedRoles={["user"]}
              />
            }
          />
          <Route
            path="/search"
            element={
              <SearchProperty
                handleMarkAsRead={handleMarkAsRead}
                problems={problems}
                setProblems={setProblems}
              />
            }
          />
          <Route path="/details" element={<PropertyDetails />} />
          <Route path="/details/:id" element={<PropertyDetails />} />
          <Route
            path="/myproperty"
            element={
              <ProtectedRoute component={MyActivity} allowedRoles={["user"]} />
            }
          />
          <Route
            path="/myservice"
            element={
              <ProtectedRoute component={MyService} allowedRoles={["user"]} />
            }
          />

          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute
                component={AdminDashboard}
                allowedRoles={["admin"]}
              />
            }
          />

          <Route
            path="/admin-service"
            element={
              <ProtectedRoute
                component={ServiceDetails}
                allowedRoles={["admin"]}
              />
            }
          />

          <Route
            path="/admin-premium-users"
            element={
              <ProtectedRoute
                component={PremiumAccountHistory}
                allowedRoles={["admin"]}
              />
            }
          />
          <Route
            path="/admin-property"
            element={
              // <ProtectedRoute
              //   component={PropertyDetails1}
              //   allowedRoles={["admin"]}
              // />
              <PropertyDetails1 />
            }
          />
          <Route
            path="/admin-pay-requests"
            element={
              <ProtectedRoute
                component={PayToServiceRequest}
                allowedRoles={["admin"]}
              />
            }
          />
          <Route
            path="/admin-article"
            element={
              <ProtectedRoute
                component={HomePageEdit}
                allowedRoles={["admin"]}
              />
            }
          />

          <Route
            path="/admin-feedback"
            element={
              <ProtectedRoute
                component={FeedbackDetailes}
                allowedRoles={["admin"]}
              />
            }
          />

          <Route
            path="/admin-new-projects"
            element={
              <ProtectedRoute
                component={newProjects}
                allowedRoles={["admin"]}
              />
            }
          />

          <Route
            path="/admin-all-agents"
            element={
              <ProtectedRoute component={AllAgentsFlow} allowedRoles={["admin"]} />
            }
          />

          <Route
            path="/admin-service-vendors"
            element={
              <ProtectedRoute component={ServiceProviderFlow} allowedRoles={["admin"]} />
            }
          />

          <Route
            path="/admin-new-agents"
            element={
              <ProtectedRoute component={NewAgents} allowedRoles={["admin"]} />
            }
          />

          <Route
            path="/admin-inquries"
            element={
              <ProtectedRoute
                component={InquiryDestails}
                allowedRoles={["admin"]}
              />
            }
          />

          <Route
            path="/admin-bank-details"
            element={
              <ProtectedRoute
                component={BankDetails}
                allowedRoles={["admin"]}
              />
            }
          ></Route>

          <Route
            path="/admin-gallery-images"
            element={
              <ProtectedRoute
                component={GalleryImages}
                allowedRoles={["admin"]}
              />
            }
          ></Route>

          <Route
            path="/admin-mob-gallery-images"
            element={
              <ProtectedRoute
                component={MobGalleryImages}
                allowedRoles={["admin"]}
              />
            }
          ></Route>

          <Route
            path="/admin-user-details"
            element={
              <ProtectedRoute
                component={UserDetails}
                allowedRoles={["admin"]}
              />
            }
          ></Route>

          <Route path="*" element={<Error />} />
          <Route path="/contact-us" element={<ContactUs />}></Route>
          <Route path="/faqs" element={<Faqs />}></Route>
          <Route path="/insights" element={<InsightsPage />}></Route>
          <Route
            path="/tax-legal-advice"
            element={<TaxAndLegalAdviceIndia />}
          ></Route>
          <Route
            path="/property-calculator"
            element={<PropertyCalculator />}
          ></Route>
          <Route path="/AboutUs" element={<AboutPage />}></Route>
          <Route
            path="/under-construction"
            element={<UnderConstructionPage />}
          ></Route>

          <Route
            path="/post-property1"
            element={
              <ProtectedRoute
                component={PostProperty}
                allowedRoles={["user"]}
              />
            }
          />
          <Route
            path="/post-property"
            element={
              <ProtectedRoute
                component={PostPropertyForm}
                allowedRoles={["user"]}
              />
            }
          />

          <Route path="/agent-dashboard" element={<AgentDashboard />}></Route>
          <Route
            path="/agent-properties-and-projects"
            element={<AgentsPropertiesProjects />}
          ></Route>
          <Route path="/agent-inquiries" element={<AgentsInquiries />}></Route>
          <Route path="/agent-viewed" element={<AgentsViewed />}></Route>
          <Route
            path="/agent-advertisement"
            element={<AgentsAdvertisement />}
          ></Route>
          <Route path="/agent-viewed" element={<AgentsAdvertisement />}></Route>
          <Route path="/agent-profile" element={<AgentsProfile />}></Route>

          <Route path="/news-details" element={<NewsAndArticles />}></Route>
          <Route path="/all-news" element={<AllNewsAndArticles />}></Route>
          <Route path="/home-loan" element={<LoanPage />}></Route>
          <Route path="/explore-projects" element={<ExplorePojects />}></Route>
          <Route path="/user-feedbacks" element={<UserFeedbacks />}></Route>

          <Route path="/terms-condition" element={<TermsCondition />}></Route>
          <Route path="/privacy-policy" element={<PrivacyPolicy />}></Route>
          <Route
            path="/delivery-timeline"
            element={<DeliveryTimeline />}
          ></Route>

          <Route path="/terms-service" element={<TermsService />}></Route>
          <Route path="/desclaimer" element={<Desclaimer />}></Route>
          <Route path="/refund-policy" element={<RefundPolicy />}></Route>

          <Route path="/agents" element={<AgentsPage />}></Route>
          <Route
            path="/servicemans/:id"
            element={<ServiceProviderMap />}
          ></Route>
          <Route path="/servicemans" element={<ServiceProviderMap />}></Route>

          <Route
            path="/receivedservicerequests"
            element={<ReceivedServiceRequestsPage />}
          ></Route>
          <Route path="/profile" element={<UserProfile />}></Route>
        </Routes>

        <Chatbot />
      </Router>
    </div>
  );
}

export default App;
