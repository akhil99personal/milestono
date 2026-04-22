import axios from "axios";
import FadeLoader from "react-spinners/FadeLoader";
import React, { useEffect, useState } from "react";
import AdminNavbar from "./AdminNavbar";
import "./UserDetails.css";

const UserDetails = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("auth");
      setLoading(true);
      const response = await axios.get(`${BASE_URL}/api/userdetails`, {
        headers: {
          Authorization: token,
        },
      });
      setUsers(response.data);
      setFilteredUsers(response.data);
    } catch (error) {
      console.error("Error fetching user details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const searchUsers = (val) => {
    let filtered = users;

    filtered = filtered.filter(
      (user) =>
        user.fullName?.toLowerCase().includes(val.toLowerCase()) ||
        user.email?.toLowerCase().includes(val.toLowerCase()) ||
        user.phone?.toLowerCase().includes(val.toLowerCase()),
    );

    setSearchQuery(val);
    setFilteredUsers(filtered);
  };

  return (
    <div className="table-container">
      <AdminNavbar />
      {loading ? (
        <div className="loading-center">
          <FadeLoader color="var(--primary-color)" />
        </div>
      ) : (
        <div className="admin-section">
          <div className="filter-container">
            <input
              type="text"
              placeholder="Search by Full Name, Email, Phone"
              value={searchQuery}
              onChange={(e) => searchUsers(e.target.value)}
              className="search-box"
            />
          </div>

          <p>count: {filteredUsers.length}</p>
          <table className="table">
            <thead>
              <tr>
                <th>Sr. No</th>
                <th>Profile</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Phone</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td className="admin-users-profile-image">
                    <img
                      src={
                        user.profile ||
                        "https://d30y9cdsu7xlg0.cloudfront.net/png/138926-200.png"
                      }
                      alt={user.fullName}
                      className="profile-image"
                    />
                  </td>
                  <td>{user.fullName}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserDetails;
