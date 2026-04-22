import React, { useEffect, useState } from "react";
import "./NewsArticalsPage.css";
import MainNavBar from "../MainNavBar";
import dummyImage from "../../images/dummyImage.webp";
import Footer from "../homepage/Footer";
import { useLocation } from "react-router-dom";
import axios from "axios";
import FeedbackOverlay from "../FeedbackOverlay";
const NewsAndArticles = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const queryParams = new URLSearchParams(window.location.search);

  const tags = [
    "#Buyers",
    "#Infrastructure",
    "#Investment",
    "#Investors",
    "#Residential",
    "#What's New",
  ];

  const metaInfo = queryParams.get("meta") || "Published on: Today";

  const location = useLocation();
  const [article, setArticle] = useState(null);
  const [articleURL, setArticleURL] = useState(
    `${window.location.origin}/news-details?id=${article ? article._id : null}`,
  );

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get("id");

    const fetchArticle = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/articles/${id}`);
        setArticle(response.data);
      } catch (error) {
        console.error("Error fetching article details:", error);
      }
    };

    if (id) fetchArticle();
  }, [location]);

  useEffect(() => {
    setArticleURL(
      `${window.location.origin}/news-details?id=${article ? article._id : null}`,
    );
  }, [article]);

  if (!article) return <p>Loading...</p>;

  return (
    <>
      <MainNavBar />
      <FeedbackOverlay />
      <div
        className="news-article-page-container"
        style={{ paddingTop: "100px", cursor: "pointer" }}
      >
        <div className="news-article-page-content">
          <h2 className="news-article-page-title">{article.name}</h2>
          <div className="news-article-page-tags">
            {article.tags &&
              article.tags.match(/#\w+/g) &&
              article.tags
                .match(/#\w+/g)
                .map((tag, index) => <span key={index}>{tag}</span>)}
          </div>
          <div className="news-article-page-meta-info">
            <span>
              {article.updatedDate &&
                new Date(article.updatedDate).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
            </span>
            <div className="news-article-page-social-icons">
              <button
                className="news-article-page-icon twitter"
                onClick={() => {
                  window.open(
                    `https://twitter.com/intent/tweet?text=${encodeURIComponent(
                      article.name,
                    )}&url=${encodeURIComponent(articleURL)}`,
                    "_blank",
                    "noopener,noreferrer",
                  );
                }}
              >
                <svg
                  width="16"
                  height=""
                  viewBox="0 0 16 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.1111 1.45965C14.5884 1.69115 14.0262 1.84562 13.4333 1.91871C14.0361 1.56078 14.4999 0.989918 14.7176 0.315548C14.1535 0.646214 13.5285 0.889177 12.8636 1.01718C12.3326 0.454215 11.5753 0.10498 10.7362 0.10498C9.12433 0.10498 7.81786 1.39999 7.81786 2.99683C7.81786 3.2228 7.84433 3.44285 7.89411 3.65658C5.46922 3.5349 3.31851 2.38211 1.87969 0.632783C1.62686 1.06024 1.48463 1.56078 1.48463 2.08898C1.48463 3.09283 1.99861 3.97658 2.78241 4.49727C2.30399 4.48266 1.85362 4.34952 1.45935 4.13619C1.45935 4.14488 1.45935 4.15791 1.45935 4.17016C1.45935 5.57302 2.46557 6.74122 3.7993 7.0071C3.55554 7.07386 3.29796 7.111 3.03248 7.111C2.84404 7.111 2.66034 7.08966 2.48256 7.05766C2.85392 8.20413 3.93125 9.04206 5.20769 9.06695C4.20898 9.84127 2.9511 10.3051 1.5834 10.3051C1.34715 10.3051 1.11604 10.2916 0.887695 10.264C2.17994 11.0822 3.71436 11.5618 5.36137 11.5618C10.7283 11.5618 13.6644 7.15445 13.6644 3.33105C13.6644 3.20582 13.6604 3.08098 13.6545 2.95772C14.2273 2.55318 14.7212 2.04276 15.1111 1.45965Z"
                    fill="#03A9F4"
                  ></path>
                </svg>
              </button>
              <button
                className="news-article-page-icon whatsapp"
                onClick={() => {
                  window.open(
                    `https://wa.me/?text=${encodeURIComponent(
                      `${article.name} - ${articleURL}`,
                    )}`,
                    "_blank",
                    "noopener,noreferrer",
                  );
                }}
              >
                <svg
                  width="18"
                  height=""
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="18" height="18" fill="url(#pattern0)"></rect>
                  <rect
                    x="1.0166"
                    y="0.978027"
                    width="15.8952"
                    height="15.9356"
                    fill="url(#pattern1)"
                  ></rect>
                  <path
                    d="M1.375 16.4209L2.44919 12.5095C1.78871 11.365 1.43669 10.0648 1.44032 8.73563C1.44032 4.57064 4.8371 1.18433 9.01048 1.18433C11.0355 1.18433 12.9371 1.97024 14.3633 3.3972C15.7931 4.82417 16.5806 6.72195 16.577 8.73926C16.577 12.9042 13.1802 16.2906 9.00686 16.2906H9.00323C7.73669 16.2906 6.49194 15.9719 5.38508 15.3706L1.375 16.4209ZM5.57379 14.0016L5.80242 14.1393C6.76774 14.7115 7.8746 15.0121 9.00323 15.0157H9.00686C12.4726 15.0157 15.296 12.2016 15.296 8.73926C15.296 7.0624 14.6427 5.48694 13.456 4.29901C12.2694 3.11109 10.6871 2.45918 9.00686 2.45918C5.5375 2.45918 2.71411 5.27326 2.71411 8.73563C2.71411 9.91994 3.04436 11.0753 3.67581 12.0749L3.8246 12.3139L3.19315 14.6246L5.57379 14.0016Z"
                    fill="white"
                  ></path>
                  <path
                    d="M1.63672 16.1565L2.67462 12.3791C2.03591 11.2744 1.69841 10.0177 1.69841 8.73561C1.69841 4.71549 4.97906 1.44507 9.00365 1.44507C10.9597 1.44507 12.7924 2.20563 14.1714 3.58189C15.5504 4.95815 16.3089 6.79074 16.3089 8.73923C16.3089 12.7594 13.0283 16.0298 9.00365 16.0298H9.00002C7.77704 16.0298 6.57583 15.7219 5.5089 15.1425L1.63672 16.1565Z"
                    fill="url(#paint0_linear_928_18997)"
                  ></path>
                  <rect
                    x="0.907227"
                    y="0.760498"
                    width="16.1129"
                    height="16.1529"
                    fill="url(#pattern2)"
                  ></rect>
                  <path
                    d="M1.375 16.4209L2.44919 12.5095C1.78871 11.365 1.43669 10.0648 1.44032 8.73563C1.44032 4.57064 4.8371 1.18433 9.01048 1.18433C11.0355 1.18433 12.9371 1.97024 14.3633 3.3972C15.7931 4.82417 16.5806 6.72195 16.577 8.73926C16.577 12.9042 13.1802 16.2906 9.00686 16.2906H9.00323C7.73669 16.2906 6.49194 15.9719 5.38508 15.3706L1.375 16.4209ZM5.57379 14.0016L5.80242 14.1393C6.76774 14.7115 7.8746 15.0121 9.00323 15.0157H9.00686C12.4726 15.0157 15.296 12.2016 15.296 8.73926C15.296 7.0624 14.6427 5.48694 13.456 4.29901C12.2694 3.11109 10.6871 2.45918 9.00686 2.45918C5.5375 2.45918 2.71411 5.27326 2.71411 8.73563C2.71411 9.91994 3.04436 11.0753 3.67581 12.0749L3.8246 12.3139L3.19315 14.6246L5.57379 14.0016Z"
                    fill="url(#paint1_linear_928_18997)"
                  ></path>
                  <rect
                    x="4.71777"
                    y="4.85303"
                    width="8.60081"
                    height="8.04024"
                    fill="url(#pattern3)"
                  ></rect>
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M7.11648 5.57372C6.97495 5.25863 6.82616 5.25138 6.69188 5.24776C6.58301 5.24414 6.456 5.24414 6.32898 5.24414C6.20196 5.24414 5.99874 5.29122 5.82455 5.47955C5.65035 5.66788 5.16406 6.12422 5.16406 7.055C5.16406 7.98217 5.84269 8.88035 5.93705 9.00712C6.0314 9.13388 7.24713 11.1005 9.16688 11.8574C10.7637 12.4876 11.0903 12.3608 11.435 12.3282C11.7834 12.2956 12.5528 11.8719 12.7124 11.4301C12.8685 10.9882 12.8685 10.6115 12.8213 10.5319C12.7741 10.4522 12.6471 10.4051 12.4584 10.3109C12.2697 10.2168 11.3407 9.76044 11.1665 9.69524C10.9923 9.63367 10.8653 9.60108 10.7419 9.78941C10.6149 9.97774 10.252 10.4015 10.1431 10.5282C10.0342 10.655 9.92172 10.6695 9.73301 10.5753C9.5443 10.4812 8.93462 10.282 8.21245 9.6373C7.64995 9.1375 7.2689 8.51818 7.16003 8.32985C7.05116 8.14152 7.14914 8.04011 7.2435 7.94595C7.32696 7.86265 7.43221 7.72502 7.52656 7.61637C7.62092 7.50772 7.65358 7.42804 7.71527 7.30128C7.77696 7.17452 7.74793 7.06587 7.70075 6.9717C7.64995 6.88116 7.28342 5.94676 7.11648 5.57372Z"
                    fill="white"
                  ></path>
                  <defs>
                    <pattern
                      id="pattern0"
                      patternContentUnits="objectBoundingBox"
                      width="1"
                      height="1"
                    >
                      <use></use>
                    </pattern>
                    <pattern
                      id="pattern1"
                      patternContentUnits="objectBoundingBox"
                      width="1"
                      height="1"
                    >
                      <use></use>
                    </pattern>
                    <pattern
                      id="pattern2"
                      patternContentUnits="objectBoundingBox"
                      width="1"
                      height="1"
                    >
                      <use></use>
                    </pattern>
                    <pattern
                      id="pattern3"
                      patternContentUnits="objectBoundingBox"
                      width="1"
                      height="1"
                    >
                      <use></use>
                    </pattern>
                    <linearGradient
                      id="paint0_linear_928_18997"
                      x1="8.97523"
                      y1="16.1563"
                      x2="8.97523"
                      y2="1.44501"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#20B038"></stop>
                      <stop offset="1" stopColor="#60D66A"></stop>
                    </linearGradient>
                    <linearGradient
                      id="paint1_linear_928_18997"
                      x1="8.97485"
                      y1="16.42"
                      x2="8.97485"
                      y2="1.18116"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#F9F9F9"></stop>
                      <stop offset="1" stopColor="white"></stop>
                    </linearGradient>
                    <image id="image0_928_18997"></image>
                    <image id="image1_928_18997"></image>
                    <image id="image2_928_18997"></image>
                    <image id="image3_928_18997"></image>
                  </defs>
                </svg>
              </button>
              <button
                className="news-article-page-icon facebook"
                onClick={() => {
                  window.open(
                    `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                      articleURL,
                    )}`,
                    "_blank",
                    "noopener,noreferrer",
                  );
                }}
              >
                <svg
                  width="16"
                  height=""
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_928_36507)">
                    <path
                      d="M8 16.0022C12.4183 16.0022 16 12.4205 16 8.0022C16 3.58392 12.4183 0.00219727 8 0.00219727C3.58172 0.00219727 0 3.58392 0 8.0022C0 12.4205 3.58172 16.0022 8 16.0022Z"
                      fill="#1977F3"
                    ></path>
                    <path
                      d="M11.1145 10.3141L11.4689 8.00106H9.25032V6.50029C9.25032 5.86803 9.5597 5.2504 10.5542 5.2504H11.5634V3.28162C11.5634 3.28162 10.6476 3.12524 9.77233 3.12524C7.9453 3.12524 6.75053 4.23226 6.75053 6.23816V8.00106H4.71875V10.3141H6.75053V15.9043C7.15779 15.9684 7.57517 16.001 8.00043 16.001C8.42568 16.001 8.84306 15.9673 9.25032 15.9043V10.3141H11.1145Z"
                      fill="white"
                    ></path>
                  </g>
                  <defs>
                    <clipPath id="clip0_928_36507">
                      <rect width="16" height="16" fill="white"></rect>
                    </clipPath>
                  </defs>
                </svg>
              </button>
              <button
                className="news-article-page-icon linkedin"
                onClick={() => {
                  window.open(
                    `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
                      articleURL,
                    )}&title=${encodeURIComponent(article.name)}`,
                    "_blank",
                    "noopener,noreferrer",
                  );
                }}
              >
                <svg
                  width="16"
                  height=""
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.6663 12.8147C14.6663 13.8377 13.8375 14.6666 12.8145 14.6666H3.18486C2.16227 14.6666 1.33301 13.8377 1.33301 12.8147V3.1851C1.33301 2.16214 2.16227 1.33325 3.18486 1.33325H12.8145C13.8375 1.33325 14.6663 2.16214 14.6663 3.1851V12.8147Z"
                    fill="#0078D4"
                  ></path>
                  <path
                    opacity="0.05"
                    d="M10.0003 12.3334V8.96708C10.0003 8.40408 9.72733 8.06775 9.26966 8.06775C8.99799 8.06775 8.79833 8.22075 8.67666 8.52241C8.67099 8.54375 8.66299 8.63075 8.66633 8.89375L8.66699 12.3334H6.33366V6.00008H8.66699V6.35375C9.00766 6.11875 9.42533 6.00008 9.91299 6.00008C11.4287 6.00008 12.3333 7.03108 12.3333 8.75808L12.3337 12.3334H10.0003ZM3.66699 12.3334V6.00008H4.81933C4.15166 6.00008 3.66699 5.50941 3.66699 4.83308C3.66699 4.15741 4.15966 3.66675 4.83833 3.66675C5.50899 3.66675 5.98666 4.14375 6.00033 4.82641C6.00033 5.50775 5.50733 6.00008 4.82866 6.00008H6.00033V12.3334H3.66699Z"
                    fill="black"
                  ></path>
                  <path
                    opacity="0.07"
                    d="M10.1663 12.1666V8.96692C10.1663 8.30925 9.82267 7.90092 9.26901 7.90092C8.83734 7.90092 8.62401 8.20492 8.52134 8.45992C8.49401 8.52625 8.49767 8.78958 8.49901 8.90192L8.49967 12.1666H6.49967V6.16659H8.49967V6.71259C8.76467 6.43825 9.19134 6.16659 9.91234 6.16659C11.3233 6.16659 12.166 7.13525 12.166 8.75792L12.1663 12.1666H10.1663ZM3.83301 12.1666V6.16659H5.83301V12.1666H3.83301ZM4.81867 5.83325C4.24767 5.83325 3.83301 5.41259 3.83301 4.83292C3.83301 4.25359 4.25567 3.83325 4.83767 3.83325C5.41234 3.83325 5.82134 4.24292 5.83301 4.82959C5.83301 5.41259 5.41034 5.83325 4.82801 5.83325H4.81867Z"
                    fill="black"
                  ></path>
                  <path
                    d="M4 6.33333H5.66667V12H4V6.33333ZM4.82833 5.66667H4.819C4.32167 5.66667 4 5.296 4 4.833C4 4.36 4.33167 4 4.838 4C5.345 4 5.65733 4.36 5.66667 4.833C5.66667 5.29567 5.345 5.66667 4.82833 5.66667ZM12 12H10.3333V8.967C10.3333 8.23433 9.925 7.73433 9.26933 7.73433C8.769 7.73433 8.49833 8.07167 8.367 8.39767C8.319 8.51433 8.33333 8.837 8.33333 9V12H6.66667V6.33333H8.33333V7.20533C8.57367 6.83333 8.95 6.33333 9.91267 6.33333C11.1053 6.33333 11.9997 7.08333 11.9997 8.758L12 12Z"
                    fill="white"
                  ></path>
                </svg>
              </button>
              <button
                className="news-article-page-icon link"
                onClick={() => {
                  navigator.clipboard.writeText(articleURL).then(() => {
                    alert("Link copied to clipboard!");
                  });
                }}
              >
                <svg
                  width="16"
                  height=""
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.3337 4.66675H8.66699V6.00008H11.3337C12.4337 6.00008 13.3337 6.90008 13.3337 8.00008C13.3337 9.10008 12.4337 10.0001 11.3337 10.0001H8.66699V11.3334H11.3337C13.1737 11.3334 14.667 9.84008 14.667 8.00008C14.667 6.16008 13.1737 4.66675 11.3337 4.66675Z"
                    fill="#0078DB"
                  ></path>
                  <path
                    d="M7.33301 10.0001H4.66634C3.56634 10.0001 2.66634 9.10008 2.66634 8.00008C2.66634 6.90008 3.56634 6.00008 4.66634 6.00008H7.33301V4.66675H4.66634C2.82634 4.66675 1.33301 6.16008 1.33301 8.00008C1.33301 9.84008 2.82634 11.3334 4.66634 11.3334H7.33301V10.0001Z"
                    fill="#0078DB"
                  ></path>
                  <path
                    d="M5.33301 7.33325H10.6663V8.66659H5.33301V7.33325Z"
                    fill="#0078DB"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
          <p className="news-article-page-description">{article.paragraph}</p>
          <div className="news-article-page-image">
            <img src={article.imageSrc || dummyImage} alt="News" />
          </div>
          <a href={article.seeMore}>See More</a>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default NewsAndArticles;
