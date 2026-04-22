import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ProfileModal.css";
import toast from "react-hot-toast";
import PropTypes from "prop-types";
import FadeLoader from "react-spinners/FadeLoader";

const ProfileModal = ({ onClose }) => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();

  const [userProfile, setUserProfile] = useState({});
  const [checkPassword, setCheckPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [user, setUser] = useState(null);
  const [imageSrc, setImageSrc] = useState(
    "https://d30y9cdsu7xlg0.cloudfront.net/png/138926-200.png",
  );
  const [phone, setPhone] = useState("");
  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const [deleteEmail, setDeleteEmail] = useState("");
  const [isEditingDeleteEmail, setIsEditingDeleteEmail] = useState(false);
  const [phoneOtp, setPhoneOtp] = useState("");
  const [otp, setOtp] = useState("");
  const [deleteOtp, setDeleteOtp] = useState("");
  const [userServiceData, setUserServiceData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.body.classList.add("modal-open1");
    document.body.style.paddingRight = `${window.innerWidth - document.documentElement.clientWidth}px`;

    return () => {
      document.body.classList.remove("modal-open1");
      document.body.style.paddingRight = "0";
    };
  }, []);

  const handleUpdateProfile = async () => {
    const token = localStorage.getItem("auth");
    try {
      setLoading(true);
      await axios.put(`${BASE_URL}/api/userprofile`, userProfile, {
        headers: {
          Authorization: token,
        },
      });
      toast.success("Profile updated successfully");
      onClose();
    } catch (error) {
      toast.error("Error updating profile:" + error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePassword = async () => {
    if (newPassword !== confirmPassword) {
      alert("New password and confirm password do not match!");
      return;
    }
    setLoading(true);

    const token = localStorage.getItem("auth");
    try {
      await axios.put(
        `${BASE_URL}/api/updatepassword`,
        { currentPassword: checkPassword, newPassword },
        {
          headers: {
            Authorization: token,
          },
        },
      );
      toast.success("Password updated successfully");
      onClose();
    } catch (error) {
      toast.error("Error updating password:" + error);
    } finally {
      setLoading(false);
    }
  };

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handleFileChange = async (e) => {
    const src = await toBase64(e.target.files[0]);
    setUserProfile({ ...userProfile, profile: src });
    setImageSrc(src);
  };

  const gcheck = () => {
    setLoading(true);
    axios
      .get(`${BASE_URL}/auth/login/success`, { withCredentials: true })
      .then((response) => {
        if (response.data.success) {
          setUser(response.data.user);
        } else {
          setUser(null);
        }
      })
      .catch((error) => {
        console.error("Error checking login status" + error);
        setUser(null);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getUserDetail = async () => {
    setLoading(true);
    const token = localStorage.getItem("auth");
    if (!token) {
      setLoading(false);
      toast.error("No auth token found");
      return;
    }
    try {
      const response = await axios.get(`${BASE_URL}/api/userdetail`, {
        headers: {
          Authorization: token,
        },
      });
      setUserProfile(response.data);
      setPhone(response.data.phone);
      if (response.data.profile) {
        setImageSrc(response.data.profile);
      }
    } catch (error) {
      console.error("Error fetching user details:" + error);
    } finally {
      setLoading(false);
    }
  };

  const getUserServiceDetail = async () => {
    setLoading(true);
    const token = localStorage.getItem("auth");
    if (!token) {
      setLoading(false);
      toast.error("No auth token found");
      return;
    }
    try {
      const response = await axios.get(`${BASE_URL}/api/userservicedetail`, {
        headers: {
          Authorization: token,
        },
      });
      setUserServiceData(response.data);
    } catch (error) {
      console.error("Error fetching user service details:" + error);
    } finally {
      setLoading(false);
    }
  };

  const verifyPhone = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}/api/verify-phone`, {
        phone,
      });
      setPhoneOtp(response.data.otp);
      toast.success("OTP sent");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePhoneChange = async () => {
    try {
      if (otp === phoneOtp) {
        setLoading(true);
        const token = localStorage.getItem("auth");
        await axios.put(
          `${BASE_URL}/api/userprofile`,
          { phone },
          {
            headers: {
              Authorization: token,
            },
          },
        );
        toast.success("Phone number updated successfully");
        setIsEditingPhone(false);
        getUserDetail();
      } else {
        toast.error("OTP verification failed");
      }
    } catch (error) {
      toast.error(error.response?.data?.error);
    } finally {
      setLoading(false);
    }
  };
  const glogout = () => {
    window.open(`${BASE_URL}/auth/logout`, "_self");
  };

  const verifyDeleteEmail = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("auth");
      const response = await axios.post(
        `${BASE_URL}/api/verify-delete-email`,
        { email: deleteEmail },
        {
          headers: {
            Authorization: token,
          },
        },
      );
      setDeleteOtp(response.data.otp);
      toast.success("OTP sent");
    } catch (error) {
      toast.error("Failed to send Email OTP:" + error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteEmailChange = async () => {
    try {
      if (otp === deleteOtp) {
        setLoading(true);
        const token = localStorage.getItem("auth");
        await axios.post(
          `${BASE_URL}/api/delete-account`,
          { email: deleteEmail },
          {
            headers: {
              Authorization: token,
            },
          },
        );
        toast.success("Account Deleted successfully");
        setIsEditingPhone(false);
        getUserDetail();
        localStorage.removeItem("auth");
        localStorage.removeItem("user_id");
        glogout();
        window.location.reload();
        navigate("/");
      } else {
        toast.error("OTP verification failed");
      }
    } catch (error) {
      toast.error("Error verifying OTP:" + error);
    } finally {
      setLoading(false);
    }
  };

  const handleServiceUpdate = async () => {
    const token = localStorage.getItem("auth");
    const {
      vendorImage,
      adharImage,
      panImage,
      certificateImage,
      ...nonImageData
    } = userServiceData;
    try {
      setLoading(true);
      await axios.put(`${BASE_URL}/api/update-service-profile`, nonImageData, {
        headers: {
          Authorization: token,
        },
      });
      toast.success("Service details updated successfully");
      getUserServiceDetail();
    } catch (error) {
      toast.error("Error updating service details:" + error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserDetail();
    getUserServiceDetail();
    gcheck();
  }, []);

  return (
    <div className="profile-modal-overlay" onClick={onClose}>
      <div className="profile-modal-modal" onClick={(e) => e.stopPropagation()}>
        <div className="profile-modal-header">
          <h2>User Profile</h2>
          <span className="profile-modal-close" onClick={onClose}>
            &times;
          </span>
        </div>
        {loading ? (
          <div className="loader-container">
            <FadeLoader color="var(--primary-color)" />
          </div>
        ) : (
          <div className="profile-modal-content">
            <div className="profile-modal-field-flex">
              <div className="profile-modal-user-pic">
                <img
                  alt="User Pic"
                  src={imageSrc}
                  id="profile-image1"
                  onClick={() =>
                    document.getElementById("profile-image-upload").click()
                  }
                />
                <input
                  id="profile-image-upload"
                  className="profile-modal-hidden"
                  type="file"
                  onChange={(e) => handleFileChange(e)}
                />
                <br />
                <button
                  onClick={handleUpdateProfile}
                  className="profile-modal-button"
                >
                  Update Profile
                </button>
              </div>
              <div>
                <div className="profile-modal-field">
                  <label>Email:</label>
                  <input
                    type="email"
                    name="email"
                    value={userProfile.email || ""}
                    disabled={true}
                  />
                </div>
                <div className="profile-modal-field">
                  <label>Phone:</label>
                  {isEditingPhone ? (
                    <>
                      <input
                        type="text"
                        name="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                      <button
                        onClick={verifyPhone}
                        className="profile-modal-send-otp"
                      >
                        Send OTP
                      </button>
                      <div>
                        <label>OTP:</label>
                        <input
                          type="text"
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)}
                        />
                        <button
                          onClick={handlePhoneChange}
                          className="profile-modal-verify"
                        >
                          Verify
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <input
                        type="text"
                        name="phone"
                        value={phone}
                        disabled={!isEditingPhone}
                      />
                      <br />
                      <button
                        onClick={() => setIsEditingPhone(true)}
                        className="profile-modal-change-number"
                      >
                        Change Number
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>

            {!user && (
              <>
                <div className="profile-modal-field">
                  <label>Current Password:</label>
                  <input
                    type="password"
                    name="checkPassword"
                    value={checkPassword}
                    onChange={(e) => setCheckPassword(e.target.value)}
                  />
                </div>
                <div className="profile-modal-field-flex">
                  <div className="profile-modal-field">
                    <label>New Password:</label>
                    <input
                      type="password"
                      name="newPassword"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </div>
                  <div className="profile-modal-field">
                    <label>Confirm Password:</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                </div>
                <button
                  onClick={handleUpdatePassword}
                  className="profile-modal-button"
                >
                  Update Password
                </button>
              </>
            )}
            {userServiceData ? (
              <>
                <h4>User Service Profile:</h4>

                <div className="profile-modal-field-flex-3">
                  <div className="profile-modal-field">
                    <label>District:</label>
                    <input
                      type="text"
                      name="district"
                      value={userServiceData.district || ""}
                      onChange={(e) =>
                        setUserServiceData({
                          ...userServiceData,
                          district: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="profile-modal-field">
                    <label>State:</label>
                    <input
                      type="text"
                      name="state"
                      value={userServiceData.state || ""}
                      onChange={(e) =>
                        setUserServiceData({
                          ...userServiceData,
                          state: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="profile-modal-field">
                    <label>Sub-District:</label>
                    <input
                      type="text"
                      name="subDistrict"
                      value={userServiceData.subDistrict || ""}
                      onChange={(e) =>
                        setUserServiceData({
                          ...userServiceData,
                          subDistrict: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="profile-modal-field">
                  <label>Address:</label>
                  <input
                    type="text"
                    name="address"
                    value={userServiceData.address || ""}
                    onChange={(e) =>
                      setUserServiceData({
                        ...userServiceData,
                        address: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="profile-modal-field-flex">
                  <div className="profile-modal-field">
                    <label>Account No:</label>
                    <input
                      type="text"
                      name="accountNo"
                      value={userServiceData.accountNo || ""}
                      onChange={(e) =>
                        setUserServiceData({
                          ...userServiceData,
                          accountNo: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="profile-modal-field">
                    <label>IFSC Code:</label>
                    <input
                      type="text"
                      name="ifsccode"
                      value={userServiceData.ifsccode || ""}
                      onChange={(e) =>
                        setUserServiceData({
                          ...userServiceData,
                          ifsccode: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <button
                  onClick={handleServiceUpdate}
                  className="profile-modal-button"
                >
                  Update Service Details
                </button>
              </>
            ) : (
              <div>
                <div className="profile-modal-add-service">
                  You don&apos;t have a Service Profile{" "}
                  <span
                    onClick={() => navigate("/serviceform")}
                    className="profile-modal-link"
                  >
                    Click Here
                  </span>{" "}
                  to activate.
                </div>
              </div>
            )}
            <div className="profile-modal-field delete-feild">
              {isEditingDeleteEmail ? (
                <>
                  <label>Verify Email to Delete Acccount</label>
                  <input
                    type="text"
                    name="email"
                    value={deleteEmail}
                    placeholder="Enter Account Email"
                    onChange={(e) => setDeleteEmail(e.target.value)}
                  />
                  <button
                    onClick={verifyDeleteEmail}
                    className="profile-modal-send-otp"
                  >
                    Send OTP
                  </button>
                  <div>
                    <label>OTP:</label>
                    <input
                      type="text"
                      value={otp}
                      placeholder="Confirm OTP"
                      onChange={(e) => setOtp(e.target.value)}
                    />
                    <button
                      onClick={handleDeleteEmailChange}
                      className="profile-modal-delete-account"
                    >
                      Confirm to Delete
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setIsEditingDeleteEmail(true)}
                    className="profile-modal-delete-account"
                  >
                    Delete Account
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
ProfileModal.propTypes = {
  onClose: PropTypes.func,
};

export default ProfileModal;
