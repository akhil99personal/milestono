import React from "react";
import "./MainNavBar.css";
import UserProfileNavbar from "./UserProfileNavbar";
import { useNavigate } from "react-router-dom";
function MainNavBar() {
  const navigate = useNavigate();
  return (
    <div className="main-nav-bar">
      <h1
        onClick={() => {
          navigate("/");
        }}
      >
        milestono
      </h1>
      <div>
        <div
          className="user-login-container"
          style={{
            position: "relative",
            display: "inline-block",
            marginRight: "10px",
          }}
        >
          <svg
            className="userprof"
            fill="#ffffff"
            width="35px"
            height="35px"
            style={{ marginTop: "5px", cursor: "pointer" }}
            viewBox="-1 0 19 19"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g>
              <path d="M16.417 9.583A7.917 7.917 0 1 1 8.5 1.666a7.917 7.917 0 0 1 7.917 7.917zm-6.24-.064H6.81a2.528 2.528 0 0 0-2.692 2.303v1.51a.794.794 0 0 0 .792.792h7.166a.794.794 0 0 0 .792-.791V11.82a2.528 2.528 0 0 0-2.692-2.302zM6.14 6.374a2.353 2.353 0 1 0 2.353-2.353A2.353 2.353 0 0 0 6.14 6.374z"></path>
            </g>
          </svg>

          <div className="user-login-menu">
            <h4>My Activity</h4>
            <ul>
              <li>
                <a href="/myproperty?tab=viewed">Recently viewed</a>
              </li>
              <li>
                <a href="/myproperty?tab=posted">Posted Property</a>
              </li>
              <li>
                <a href="/myproperty?tab=shortlisted">Shortlisted</a>
              </li>
              <li>
                <a href="/myproperty?tab=contacted">Contacted</a>
              </li>
            </ul>
          </div>
        </div>

        <span className="main-navbar-userprof">
          <UserProfileNavbar svgcolor={"white"} />
        </span>
      </div>
    </div>
  );
}

export default MainNavBar;
