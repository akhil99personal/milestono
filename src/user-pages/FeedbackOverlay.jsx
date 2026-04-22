import React, { useState } from "react";
import "./FeedbackOverlay.css";

import FeedBackIcon from "../images/feedback icon.png";
import axios from "axios";
import toast from "react-hot-toast";
import FadeLoader from "react-spinners/FadeLoader";

const FeedbackOverlay = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      await axios.post(`${BASE_URL}/api/feedback`, { name, email, feedback });
      toast.success("Form submitted successfully!");

      setEmail("");
      setName("");
      setFeedback("");
      closeModal();
      setIsConfirmationOpen(true);
    } catch (error) {
      toast.error("Error submitting form:" + error);
    } finally {
      setLoading(false);
    }
  };
  const closeConfirmationModal = () => setIsConfirmationOpen(false);

  return (
    <>
      <div className="feedback-container">
        <button className="feedback-button" onClick={openModal}>
          <img src={FeedBackIcon} alt="" />
          Feedback
        </button>
      </div>
      {isModalOpen && (
        <div className="feedback-modal-overlay">
          <div className="feedback-modal-content">
            {loading ? (
              <div className="loader-container">
                <FadeLoader color="var(--primary-color)" />
              </div>
            ) : (
              <>
                <div className="feedback-modal-header">
                  <h2>Feedback Form</h2>
                  <button
                    className="feedback-close-button"
                    onClick={closeModal}
                  >
                    &times;
                  </button>
                </div>
                <div className="feedback-modal-body">
                  <p>Please share your feedback for this page.</p>
                  <form onSubmit={handleSubmit}>
                    <label>
                      <span>
                        <span style={{ color: "red" }}>*</span> Email:
                      </span>
                      <input
                        type="email"
                        required
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </label>
                    <label>
                      <span>
                        <span style={{ color: "red" }}>*</span> Name:
                      </span>
                      <input
                        type="text"
                        required
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </label>
                    <label>
                      <span>
                        <span style={{ color: "red" }}>*</span> Feedback:
                      </span>
                      <textarea
                        required
                        placeholder="My idea for this page is..."
                        maxLength={1000}
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                      ></textarea>
                    </label>
                    <div className="feedback-modal-footer">
                      <button type="submit" className="feedback-send-button">
                        Send
                      </button>
                      <button
                        type="button"
                        className="feedback-cancel-button"
                        onClick={closeModal}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </>
            )}
          </div>
        </div>
      )}
      {isConfirmationOpen && (
        <div className="feedback-modal-overlay">
          <div className="feedback-modal-content feedback-confirmation-content">
            <p>Your Feedback is submitted successfully!</p>
            <button onClick={closeConfirmationModal} className="close-button">
              X
            </button>
            <button onClick={closeConfirmationModal} className="ok-button">
              OK
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default FeedbackOverlay;
