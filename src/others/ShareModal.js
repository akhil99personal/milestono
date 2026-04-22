import React, { useEffect } from "react";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";
import PropTypes from "prop-types";
import "./ShareModal.css";

const ShareModal = ({ isOpen, onClose, title, message, url }) => {
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;

    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = originalStyle;
      document.documentElement.style.overflow = originalStyle;
    }

    return () => {
      document.body.style.overflow = originalStyle;
      document.documentElement.style.overflow = originalStyle;
    };
  }, [isOpen]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(url);
    alert("Link copied to clipboard!");
  };

  if (!isOpen) return null;

  return (
    <div className="share-modal-overlay" onClick={handleOverlayClick}>
      <div className="share-modal-content">
        <h2>{title}</h2>
        <p>{message}</p>

        <div className="share-buttons">
          <FacebookShareButton url={url} quote={message}>
            <FacebookIcon size={40} round />
          </FacebookShareButton>

          <TwitterShareButton url={url} title={title}>
            <TwitterIcon size={40} round />
          </TwitterShareButton>

          <WhatsappShareButton url={url} title={title}>
            <WhatsappIcon size={40} round />
          </WhatsappShareButton>

          <button className="copy-link-btn" onClick={handleCopyLink}>
            Copy Link
          </button>
        </div>

        <button className="close-btn" onClick={onClose}>
          X
        </button>
      </div>
    </div>
  );
};
ShareModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  title: PropTypes.string,
  message: PropTypes.string,
  url: PropTypes.string,
};

export default ShareModal;
