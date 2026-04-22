import React, { useState, useEffect } from "react";
import axios from "axios";
import FadeLoader from "react-spinners/FadeLoader";
import AdminNavbar from "./AdminNavbar";
import toast from "react-hot-toast";
import "./PremiumForm.css";

function App() {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    packageName: "",
    radiusRange: "",
    numOfContactDetails: "",
    numOfProperties: "",
    validity: "",
    price: "",
    accountFor: "user",
  });

  const [subscriptions, setSubscriptions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const fetchSubscriptions = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BASE_URL}/api/accounts`);
      setSubscriptions(response.data);
    } catch (error) {
      console.error("Error fetching subscriptions:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(`${BASE_URL}/api/accounts`, form);
      toast.success("Form submitted successfully!");
      setForm({
        packageName: "",
        radiusRange: "",
        numOfContactDetails: "",
        numOfProperties: "",
        validity: "",
        price: "",
        accountFor: "user",
      });
      fetchSubscriptions();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to submit the form. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`${BASE_URL}/api/accounts/${id}`);
      toast.success("Subscription deleted successfully!");
      fetchSubscriptions();
    } catch (error) {
      console.error("Error deleting subscription:", error);
      toast.error("Failed to delete the subscription. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const totalPages = Math.ceil(subscriptions.length / rowsPerPage);
  const displayedSubscriptions = subscriptions.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage,
  );

  return (
    <div className="table-container">
      <AdminNavbar />
      {loading ? (
        <div className="loading-center">
          <FadeLoader color="var(--primary-color)" />
        </div>
      ) : (
        <div className="admin-section">
          <div className="premium-form-container">
            <div className="premium-form-header">
              <div>New Premium Account Form</div>
            </div>
            <div className="premium-form">
              <div className="package-details">
                <label htmlFor="accountFor">Account for</label>
                <select
                  id="accountFor"
                  name="accountFor"
                  value={form.accountFor}
                  onChange={handleChange}
                >
                  <option value="user">User</option>
                  <option value="agent">Agent</option>
                </select>

                <label htmlFor="packageName">Package Name:</label>
                <input
                  type="text"
                  id="packageName"
                  name="packageName"
                  value={form.packageName}
                  onChange={handleChange}
                />

                <label htmlFor="radiusRange">
                  Increase in Area Radius (km):
                </label>
                <input
                  type="number"
                  id="radiusRange"
                  name="radiusRange"
                  value={form.radiusRange}
                  onChange={handleChange}
                />

                <label htmlFor="numOfContactDetails">
                  Number of Contact Details:
                </label>
                <input
                  type="number"
                  id="numOfContactDetails"
                  name="numOfContactDetails"
                  value={form.numOfContactDetails}
                  onChange={handleChange}
                />

                <label htmlFor="numOfProperties">
                  Number of Properties He Can Add:
                </label>
                <input
                  type="number"
                  id="numOfProperties"
                  name="numOfProperties"
                  value={form.numOfProperties}
                  onChange={handleChange}
                />

                <label htmlFor="validity">
                  Validity of Package (in months):
                </label>
                <input
                  type="number"
                  id="validity"
                  name="validity"
                  value={form.validity}
                  onChange={handleChange}
                />

                <label htmlFor="price">Price for Package:</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                />
              </div>
              <button
                className="submit-button"
                type="submit"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>

          <div className="admin-news-header-section">
            <h2 className="section-title">All Subscriptions</h2>
          </div>

          <table className="table">
            <thead>
              <tr>
                <th>Sr No</th>
                <th>Package Name</th>
                <th>Account For</th>
                <th>Radius Range (km)</th>
                <th>Contact Details</th>
                <th>Properties</th>
                <th>Validity (months)</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {displayedSubscriptions.map((subscription, index) => (
                <tr key={subscription._id}>
                  <td>{(currentPage - 1) * rowsPerPage + index + 1}</td>
                  <td>{subscription.packageName}</td>
                  <td>{subscription.accountFor}</td>
                  <td>{subscription.radiusRange}</td>
                  <td>{subscription.numOfContactDetails}</td>
                  <td>{subscription.numOfProperties}</td>
                  <td>{subscription.validity}</td>
                  <td>{subscription.price}</td>
                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(subscription._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="pagination">
            <button
              className="page-button prev-next"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                className={`page-button ${
                  currentPage === index + 1 ? "active" : ""
                }`}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </button>
            ))}
            <button
              className="page-button prev-next"
              disabled={currentPage === totalPages}
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
