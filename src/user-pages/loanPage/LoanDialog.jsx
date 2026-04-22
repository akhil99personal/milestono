import { useState } from "react";
import { X } from "lucide-react";
import "./LoanPage.css";
import axios from "axios";
import toast from "react-hot-toast";

export function LoanDetailsDialog({ open, onOpenChange, defaultValues }) {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [formData, setFormData] = useState({
    propertyIdentified: "",
    propertyCity: "Delhi",
    propertyCost: "37,50,000",
    employmentType: "Salaried",
    income: "1,00,000",
    currentEmi: "10,000",
    fullName: "",
    email: "",
    loanAmount: "",
    tenure: "",
    age: "",
    mobile: "",
    acceptTerms: false,
  });

  const handleSubmit = async () => {
    try {
      if (!formData.acceptTerms) {
        toast.error("You must accept the terms and conditions.");
        return;
      }

      if (!formData.fullName || !formData.email || !formData.mobile) {
        toast.error("Please fill in all required fields.");
        return;
      }
      await axios.post(`${BASE_URL}/api/bank-users`, formData);
      toast.success("Form submitted successfully!");
      setFormData({
        propertyIdentified: "",
        propertyCity: "Delhi",
        propertyCost: "37,50,000",
        employmentType: "Salaried",
        income: "1,00,000",
        currentEmi: "10,000",
        fullName: "",
        email: "",
        mobile: "",
        acceptTerms: false,
      });
      onOpenChange(false);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(
        "An error occurred while submitting the form. Please try again later.",
      );
    }
  };

  if (!open) return null;

  return (
    <div className="loan-dialog-overlay">
      <div className="loan-dialog-container">
        <div className="loan-dialog-content">
          <button
            onClick={() => onOpenChange(false)}
            className="loan-dialog-close"
          >
            <X className="loan-dialog-close-icon" />
          </button>

          <h2 className="loan-dialog-title">
            We just need a few details to match you with the right home loan
            product
          </h2>

          <form className="loan-dialog-loan-form" onSubmit={handleSubmit}>
            <div>
              <label className="loan-dialog-form-label">Loan amount</label>
              <div className="loan-dialog-input-wrapper">
                <span className="loan-dialog-currency-symbol">₹</span>
                <input
                  type="text"
                  placeholder={formData.loanAmount}
                  onChange={(e) =>
                    setFormData({ ...formData, loanAmount: e.target.value })
                  }
                  className="loan-dialog-form-input loan-dialog-readonly-input"
                  required
                />
              </div>
            </div>

            <div>
              <label className="loan-dialog-form-label">Tenure</label>
              <div className="loan-dialog-input-group">
                <input
                  type="text"
                  placeholder={formData.tenure}
                  onChange={(e) =>
                    setFormData({ ...formData, tenure: e.target.value })
                  }
                  className="loan-dialog-form-input loan-dialog-readonly-input"
                  required
                />
                <span className="loan-dialog-suffix-label">Years</span>
              </div>
            </div>

            <div>
              <label className="loan-dialog-form-label">Your Age</label>
              <div className="loan-dialog-input-group">
                <input
                  type="text"
                  placeholder={formData.age}
                  onChange={(e) =>
                    setFormData({ ...formData, age: e.target.value })
                  }
                  className="loan-dialog-form-input loan-dialog-readonly-input"
                  required
                />
                <span className="loan-dialog-suffix-label">Years</span>
              </div>
            </div>

            <div>
              <label className="loan-dialog-form-label">
                Is your property identified
              </label>
              <div className="loan-dialog-select-wrapper">
                <select
                  value={formData.propertyIdentified}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      propertyIdentified: e.target.value,
                    })
                  }
                  className="loan-dialog-form-select"
                >
                  <option value="">Select</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
                <div className="loan-dialog-select-arrow" />
              </div>
            </div>

            <div>
              <label className="loan-dialog-form-label">Property city</label>
              <div className="loan-dialog-input-wrapper">
                <input
                  type="text"
                  placeholder={formData.propertyCity}
                  onChange={(e) =>
                    setFormData({ ...formData, propertyCity: e.target.value })
                  }
                  className="loan-dialog-form-input"
                  required
                />
              </div>
            </div>

            <div>
              <label className="loan-dialog-form-label">Property Cost</label>
              <div className="loan-dialog-input-wrapper">
                <span className="loan-dialog-currency-symbol">₹</span>
                <input
                  type="text"
                  placeholder={formData.propertyCost}
                  onChange={(e) =>
                    setFormData({ ...formData, propertyCost: e.target.value })
                  }
                  className="loan-dialog-form-input"
                  required
                />
              </div>
            </div>

            <div>
              <label className="loan-dialog-form-label">
                How are you currently employed
              </label>
              <div className="loan-dialog-select-wrapper">
                <select
                  value={formData.employmentType}
                  onChange={(e) =>
                    setFormData({ ...formData, employmentType: e.target.value })
                  }
                  className="loan-dialog-form-select"
                >
                  <option value="salaried">Salaried</option>
                  <option value="self-employed">Self Employed</option>
                  <option value="business">Business Owner</option>
                </select>
                <div className="loan-dialog-select-arrow" />
              </div>
            </div>

            <div>
              <label className="loan-dialog-form-label">Your income</label>
              <div className="loan-dialog-input-group">
                <div className="loan-dialog-input-wrapper">
                  <span className="loan-dialog-currency-symbol">₹</span>
                  <input
                    type="text"
                    placeholder={formData.income}
                    onChange={(e) =>
                      setFormData({ ...formData, income: e.target.value })
                    }
                    className="loan-dialog-form-input"
                    required
                  />
                </div>
                <span className="loan-dialog-suffix-label">Monthly</span>
              </div>
            </div>

            <div>
              <label className="loan-dialog-form-label">
                Current total EMI
              </label>
              <div className="loan-dialog-input-group">
                <div className="loan-dialog-input-wrapper">
                  <span className="loan-dialog-currency-symbol">₹</span>
                  <input
                    type="text"
                    placeholder={formData.currentEmi}
                    onChange={(e) =>
                      setFormData({ ...formData, currentEmi: e.target.value })
                    }
                    className="loan-dialog-form-input"
                    required
                  />
                </div>
                <span className="loan-dialog-suffix-label">Monthly</span>
              </div>
            </div>

            <div>
              <label className="loan-dialog-form-label">
                Full Name (as per PAN)
              </label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
                className="loan-dialog-form-input"
                placeholder="Enter your full name"
                required
              />
            </div>

            <div>
              <label className="loan-dialog-form-label">Your Email Id</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="loan-dialog-form-input"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label className="loan-dialog-form-label">
                Mobile Number(OTP verification req)
              </label>
              <input
                type="tel"
                value={formData.mobile}
                onChange={(e) =>
                  setFormData({ ...formData, mobile: e.target.value })
                }
                className="loan-dialog-form-input"
                placeholder="Enter your mobile number"
                required
              />
            </div>

            <div className="loan-dialog-form-footer">
              <div className="loan-dialog-terms-wrapper">
                <input
                  type="checkbox"
                  id="terms"
                  checked={formData.acceptTerms}
                  onChange={(e) =>
                    setFormData({ ...formData, acceptTerms: e.target.checked })
                  }
                  className="loan-dialog-terms-checkbox"
                  required
                />
                <label htmlFor="terms" className="loan-dialog-terms-label">
                  I authorize{" "}
                  <a href="/" style={{ textDecoration: "none", color: "grey" }}>
                    Milestono.com
                  </a>{" "}
                  relevant loan providers and their representatives to call, SMS
                  or email me with reference to the application & accept
                  Milestono{" "}
                  <a href="/T&C" style={{ color: "grey" }}>
                    &quot;Terms & Conditions&quot;
                  </a>
                  . This consent shall override any DNC/NDNC registration.
                </label>
              </div>

              <button type="submit" className="loan-dialog-submit-button">
                Submit Details
              </button>

              <p className="loan-dialog-privacy-notice">
                *Please note that our{" "}
                <a href="/privacy-policy" style={{ color: "grey" }}>
                  privacy policy
                </a>{" "}
                does not govern the use of your data by financial institutions
                once it is shared. For more information, please refer the
                privacy policy of related concerned bank.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
