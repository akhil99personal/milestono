
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import "./NewServicesPage.css";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const ServicesPage = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [loading, setLoading] = useState(false);
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [showAddAddressForm, setShowAddAddressForm] = useState(false);
  const [showSaveLocationDialog, setShowSaveLocationDialog] = useState(false);
  const [detectedCoordinates, setDetectedCoordinates] = useState(null);
  const [newAddress, setNewAddress] = useState({
    label: "Home",
    customLabel: "",
    landmark: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    isDefault: false,
  });
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    landmark: "",
    category: "",
    image: null,
    address: "",
    district: "",
    city: "",
    state: "",
    pincode: "",
    status: "requested",
    price: "",
    otp: "",
    coordinates: [0, 0],
  });

  const navigate = useNavigate();

  const [formErrors, setFormErrors] = useState({});
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState("");
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const serviceCards = [
    {
      id: "property-legal",
      title: "Property Legal",
      icon: (
        <svg
          viewBox="0 0 492.508 492.508"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
        >
          <path d="M199.493 402.145c0-10.141-8.221-18.361-18.36-18.361H42.475c-10.139 0-18.36 8.221-18.36 18.361 0 3.195.818 6.199 2.255 8.816H0v38.067h223.607v-38.067h-26.369c.819-6.197 1.638-9.2 1.638-12.395z" />
          <path d="M175.898 88.224l117.157 74.396c9.111 4.643 20.43 1.678 26.021-7.129l5.622-8.85c5.938-9.354 3.171-21.75-6.182-27.69L204.592 46.608c-9.352-5.939-21.748-3.172-27.688 6.182l-5.622 8.851c-8.206 6.773-6.078 18.278 3.018 23.583z" />
          <path d="M492.456 372.433l-.082-1.771-.146-1.672c-.075-1.143-.235-2.159-.375-3.204-.562-4.177-1.521-7.731-2.693-10.946-2.377-6.386-5.738-11.222-9.866-14.845-1.027-.913-2.126-1.714-3.218-2.528l-3.271-2.443c-2.172-1.643-4.387-3.218-6.587-4.815-2.196-1.606-4.419-3.169-6.644-4.729-2.218-1.571-4.445-3.125-6.691-4.651-4.468-3.089-8.983-6.101-13.51-9.103l-6.812-4.464-6.85-4.405c-4.58-2.911-9.167-5.813-13.785-8.667-4.611-2.865-9.24-5.703-13.896-8.496l-13.979-8.363-14.072-8.22-14.149-8.096-14.219-7.987-14.287-7.882-14.354-7.773c-4.802-2.566-9.599-5.137-14.433-7.653-4.822-2.529-9.641-5.071-14.498-7.548l-4.398 6.928-22.17-10.449 24.781-39.026-117.156-74.395-60.944 95.974 117.157 74.395 24.781-39.026 18.887 15.622-4.399 6.929c4.309 3.343 8.657 6.619 12.998 9.91 4.331 3.305 8.698 6.553 13.062 9.808l13.14 9.686 13.211 9.577 13.275 9.474 13.346 9.361 13.422 9.242 13.514 9.095c4.51 3.026 9.045 6.009 13.602 8.964 4.547 2.967 9.123 5.882 13.707 8.792l6.898 4.324 6.936 4.266c4.643 2.818 9.289 5.625 13.985 8.357 2.337 1.383 4.689 2.739 7.055 4.078 2.358 1.349 4.719 2.697 7.106 4 2.383 1.312 4.75 2.646 7.159 3.912l3.603 1.922c1.201.64 2.394 1.296 3.657 1.837 5.036 2.194 10.841 3.18 17.63 2.614 3.409-.305 7.034-.949 11.054-2.216 1.006-.317 1.992-.606 3.061-1.023l1.574-.58 1.639-.68c2.185-.91 4.523-2.063 7.059-3.522 2.35-1.39 4.117-3.996 3.861-6.362z" />
          <path d="M67.897 261.877l113.922 72.341c9.354 5.938 21.75 3.172 27.689-6.181l5.621-8.852c5.592-8.808 3.462-20.311-4.615-26.583L93.358 218.207c-9.111-4.642-20.43-1.678-26.022 7.13l-5.62 8.85c-6.28 11.265-3.512 23.662 5.181 29.69z" />
        </svg>
      ),
    },
    {
      id: "electrician",
      title: "Electrician",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M13 2L3 14h9l-1 8l10-12h-9l1-8z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      id: "construction",
      title: "Construction",
      icon: (
        <svg
          viewBox="0 0 48 48"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M17.3199 9.03191C16.0703 10.7525 15.7978 12.6711 16.1312 13.6886C16.3032 14.2134 16.0172 14.7783 15.4923 14.9503C14.9675 15.1223 14.4026 14.8362 14.2307 14.3114C13.6416 12.5136 14.1942 9.9322 15.7017 7.85662C17.2562 5.71624 19.8935 4 23.6364 4C27.4396 4 30.2748 5.56203 32.0123 7.63324C33.713 9.66056 34.4127 12.2597 33.7587 14.3046C33.5905 14.8307 33.0276 15.1207 32.5016 14.9525C31.9756 14.7842 31.6855 14.2214 31.8538 13.6954C32.2437 12.4761 31.8697 10.5752 30.48 8.91861C29.1272 7.30587 26.8555 6 23.6364 6C20.5742 6 18.5225 7.37611 17.3199 9.03191Z"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M19 6C19.5523 6 20 6.44772 20 7L20 11C20 11.5523 19.5523 12 19 12C18.4477 12 18 11.5523 18 11L18 7C18 6.44772 18.4477 6 19 6Z"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M24 4C24.5523 4 25 4.44772 25 5L25 9C25 9.55228 24.5523 10 24 10C23.4477 10 23 9.55228 23 9L23 5C23 4.44772 23.4477 4 24 4Z"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M18.1254 29.6282C17.8971 29.1604 17.3814 28.9076 16.8786 29.0312C11.4745 30.3592 6 33.0671 6 37.1407V42V44H8H40H42V42V37.1407C42 33.0671 36.5255 30.3592 31.1214 29.0312C30.6186 28.9076 30.1029 29.1604 29.8746 29.6282L25.8105 29.6282C24.9218 29.6284 24.4693 29.6284 24.0248 29.6284C23.5637 29.6283 23.1112 29.6283 22.1893 29.6285L18.1254 29.6282ZM25.8109 31.6282C25.8107 31.6282 25.8106 31.6282 25.8105 31.6282C24.9162 31.6284 24.466 31.6284 24.024 31.6284C23.5658 31.6283 23.1162 31.6283 22.1898 31.6285L22.1892 31.6285L18.1252 31.6282L16.8758 31.6281L16.6456 31.1564C14.3233 31.7829 12.1328 32.655 10.5162 33.7244C8.69262 34.9307 8 36.0995 8 37.1407V42H40V37.1407C40 36.0995 39.3074 34.9307 37.4838 33.7244C35.8672 32.655 33.6767 31.7829 31.3544 31.1564L31.1242 31.6282L29.8746 31.6282L25.8109 31.6282Z"
          />
          <path d="M16 35C16 34.4477 16.4477 34 17 34C17.5523 34 18 34.4477 18 35V42C18 42.5523 17.5523 43 17 43C16.4477 43 16 42.5523 16 42V35Z" />
          <path d="M30 35C30 34.4477 30.4477 34 31 34C31.5523 34 32 34.4477 32 35V42C32 42.5523 31.5523 43 31 43C30.4477 43 30 42.5523 30 42V35Z" />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M29 6C29.5523 6 30 6.44772 30 7L30 11C30 11.5523 29.5523 12 29 12C28.4477 12 28 11.5523 28 11L28 7C28 6.44772 28.4477 6 29 6Z"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12.5684 15.7642C12.3912 14.5044 13.1346 13.3201 14.3357 12.2526L15.6644 13.7474C14.6154 14.6798 14.5151 15.2456 14.5489 15.4857C14.5843 15.7374 14.8366 16.1525 15.7341 16.6084C17.4886 17.4996 20.6705 18 24 18C27.3295 18 30.5114 17.4996 32.2659 16.6084C33.1635 16.1525 33.4158 15.7374 33.4512 15.4857C33.4849 15.2456 33.3846 14.6798 32.3357 13.7474L33.6644 12.2526C34.8654 13.3201 35.6089 14.5044 35.4317 15.7642C35.2561 17.0126 34.2428 17.8475 33.1716 18.3916C30.9886 19.5004 27.4205 20 24 20C20.5795 20 17.0114 19.5004 14.8284 18.3916C13.7572 17.8475 12.7439 17.0126 12.5684 15.7642Z"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M17 18C17 21.866 20.134 25 24 25C27.866 25 31 21.866 31 18H33C33 22.9706 28.9706 27 24 27C19.0294 27 15 22.9706 15 18H17Z"
          />
        </svg>
      ),
    },
    {
      id: "interior-designing",
      title: "Interior Designing",
      icon: (
        <svg
          viewBox="0 -12.98 122.88 122.88"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M9.57,49a7.72,7.72,0,0,1-5.28.25,6.28,6.28,0,0,1-2.91-2A6.48,6.48,0,0,1,0,43.88a8.33,8.33,0,0,1,2-6.13H2a2.46,2.46,0,0,1,.28-.28L60.11.46A1.74,1.74,0,0,1,62.36.37l57.9,37h0a.93.93,0,0,1,.21.19,7.81,7.81,0,0,1,2.22,7.21,6.66,6.66,0,0,1-1.52,2.89,6.5,6.5,0,0,1-2.69,1.82,7.25,7.25,0,0,1-5.64-.37V96.79h-4.13V47.54c0-.84-43.5-27.13-47.1-29.93-3.81,2.9-47.91,29-47.91,30.07V96.91l-4.13,0V49Zm72.37,5.79H93.38l4,14.77H78l4-14.77Zm10.4,16.21V93.36H92a.86.86,0,0,1,0,1.71H83.38a.86.86,0,0,1,0-1.71h3.2V72ZM57.94,92.47V95H55.46V92.47H32.36V95H29.87V92.48H29a3.08,3.08,0,0,1-2.1-.63A2.82,2.82,0,0,1,26,89.63V74a7,7,0,0,1-1.81-.78,3.91,3.91,0,0,1-1.55-1.73,4.94,4.94,0,0,1,.75-5.78,5.66,5.66,0,0,1,2.14-1.39A5.82,5.82,0,0,1,28.07,64a5.17,5.17,0,0,1,1.85.48v-5.9c0-3.16.48-4.81,1.7-5.74s2.9-.93,5.5-.93H50.74c2.83,0,4.55.11,5.68,1.12s1.46,2.75,1.46,6v5.78a5.64,5.64,0,0,1,2.49-.53,6.05,6.05,0,0,1,2.39.5,5.38,5.38,0,0,1,2,1.4,4.63,4.63,0,0,1,.46,5.43,4.44,4.44,0,0,1-1.55,1.68,6.83,6.83,0,0,1-1.81.8V89.61h0a2.79,2.79,0,0,1-.89,2.21,3.08,3.08,0,0,1-2.1.63h-.89Zm-26.62-26.87a5.38,5.38,0,0,1,1.1,2,5.93,5.93,0,0,1,.25,1.28,8.64,8.64,0,0,1,0,1.44v2H55V70.32a8.23,8.23,0,0,1,0-1.39,4.44,4.44,0,0,1,.3-1.35,5.58,5.58,0,0,1,1.06-1.71V59c0-2.75-.21-4.17-1-4.83s-2.2-.72-4.66-.72H37.12c-2.28,0-3.79,0-4.59.63s-1.08,1.89-1.08,4.52v7Zm1.35,8.32v2.57H55V73.92ZM28,65.49a4.57,4.57,0,0,0-1.9.27,3.54,3.54,0,0,0-2,5.12,2.53,2.53,0,0,0,.19,1.26,5.92,5.92,0,0,0,1.92.74h0a.76.76,0,0,1,.6.74V89.6a1.37,1.37,0,0,0,.35,1.08,1.7,1.7,0,0,0,1,0H29v-20.75h-2.27a1.83,1.83,0,0,0,0,3.66H29V70.26a6,6,0,0,0,0-1.2,4.07,4.07,0,0,0-.19-1A3.49,3.49,0,0,0,28,65.49Zm28.59,7.44a.85.85,0,0,1,0,.23.93.93,0,0,1,0,.24v3.69a1.45,1.45,0,0,1,0,.34V90.94h2.27A1.83,1.83,0,0,0,60,90.68a1.48,1.48,0,0,0,.35-1.07h0V73.43a.77.77,0,0,1,.65-.76,5.69,5.69,0,0,0,1.86-.73,2.84,2.84,0,0,0,1-1.09,3.16,3.16,0,0,0-.24-3.74,4,4,0,0,0-1.41-1,4.89,4.89,0,0,0-1.81-.38,3.78,3.78,0,0,0-3.65,2.41,2.86,2.86,0,0,0-.18.89,7.19,7.19,0,0,0,0,1.22.17.17,0,0,1,0,.07h0v2.61Zm-23.75,18H55V78H32.8V90.94Zm69.87-87.94l14.27.58V22.8L98.67,16V3Z"
          />
        </svg>
      ),
    },
    {
      id: "whitewash-paint",
      title: "Whitewash & Paint",
      icon: (
        <svg
          viewBox="0 0 512 512"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
        >
          <path d="M423.887 113.03V30.522c0-16.853-13.669-30.522-30.522-30.522H66.284c-16.853 0-30.522 13.669-30.522 30.522v82.508c0 16.853 13.669 30.522 30.522 30.522h327.082c16.853 0 30.522-13.668 30.522-30.522z" />
          <path d="M191.879 472.286c0 21.937 17.784 39.714 39.714 39.714h2.651c21.93 0 39.711-17.777 39.711-39.714V329.267h-82.076z" />
          <path d="M445.472 58.738v79.925c0 21.254-12.752 40.345-32.272 48.629l-180.304 86.662c-8.386 3.371-13.879 11.498-13.879 20.54v16.59h30.762v-16.59c0-21.262 12.76-40.352 32.26-48.636l180.311-86.67 0.473-0.188c8.389-3.372 13.887-11.513 13.887-20.533V58.738c0-21.308-12.61-39.61-30.754-47.992l-14.27-.58v19.8l14.27 6.8z" />
        </svg>
      ),
    },
    {
      id: "cleaning",
      title: "Cleaning",
      icon: (
        <svg
          viewBox="0 0 74.34 74.34"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
        >
          <path
            d="M29.52,53.303h-8.945c-0.552,0-1,0.448-1,1v8.104c0,0.343,0.176,0.662,0.466,0.845l4.473,2.826
             c0.163,0.103,0.349,0.155,0.534,0.155s0.371-0.052,0.534-0.155l4.473-2.826c0.29-0.183,0.466-0.502,0.466-0.845v-8.104
             C30.52,53.751,30.072,53.303,29.52,53.303z M28.52,61.856l-3.473,2.194l-3.473-2.194v-6.553h6.945V61.856z
             M22.81,28.413c0.925,8.32,7.514,12.07,11.993,12.07c4.479,0,11.067-3.75,11.993-12.07c1.333-0.702,3.13-2.447,3.039-5.548
             c-0.018-0.599-0.071-2.419-1.406-2.924c-1.313-0.497-2.638,0.819-2.891,1.088c-0.377,0.404-0.356,1.037,0.047,1.414
             s1.037,0.357,1.414-0.047c0.175-0.187,0.482-0.424,0.686-0.521c0.056,0.151,0.134,0.462,0.151,1.05
             c0.085,2.891-2.028,3.759-2.238,3.838l-3.894,0.853c-4.581-0.493-9.221-0.493-13.801,0l-3.901-0.854
             c-0.295-0.116-2.315-1.014-2.232-3.836c0.017-0.588,0.095-0.899,0.151-1.05c0.192,0.092,0.486,0.311,0.686,0.521
             c0.377,0.403,1.01,0.423,1.414,0.047c0.403-0.377,0.424-1.01,0.047-1.414c-0.252-0.269-1.572-1.589-2.891-1.088
             c-1.335,0.504-1.389,2.325-1.406,2.924C19.679,25.967,21.477,27.712,22.81,28.413z
             M24.92,29.009l1.998,0.438l0.589,5.339C26.295,33.365,25.331,31.47,24.92,29.009z
             M42.097,34.785l0.589-5.339l1.998-0.438C44.273,31.47,43.309,33.365,42.097,34.785z
             M40.667,29.515l-0.795,7.198c-0.002,0.017,0.005,0.032,0.004,0.048c-1.835,1.225-3.776,1.722-5.074,1.722
             c-1.296,0-3.232-0.496-5.064-1.716l-0.8-7.252C32.833,29.149,36.77,29.149,40.667,29.515z
             M29.438,42.722l-2.902,1.362l-0.255-4.656c-0.03-0.552-0.509-0.976-1.053-0.944
             c-0.551,0.03-0.974,0.502-0.944,1.053l0.053,0.972c-3.428,1.238-6.537,3.485-8.878,6.368
             c-0.137-0.803-0.428-1.572-1.058-2.206c-0.255-0.257-0.565-0.466-0.905-0.648v-7.55c0.279,0.079,0.586,0.216,0.861,0.458
             c0.67,0.587,1.009,1.63,1.009,3.101V43.2c0,0.552,0.448,1,1,1s1-0.448,1-1v-3.167c0-2.072-0.569-3.621-1.691-4.604
             c-0.728-0.638-1.544-0.897-2.185-0.996c-0.016-0.538-0.452-0.971-0.994-0.971H1c-0.552,0-1,0.448-1,1V37.5c0,0.552,0.448,1,1,1
             h3.09c0.14,1.476,0.632,4.212,2.33,5.737c-0.201,0.135-0.402,0.269-0.568,0.436c-1.194,1.201-1.185,2.886-1.177,4.372
             l0.001,6.94c0,1.83,0.909,3.448,2.297,4.437c-0.578,0.87-1.148,1.603-1.145,1.603c-3.024,3.302-2.698,9.679-2.683,9.949
             c0.03,0.529,0.468,0.943,0.999,0.943h13.131c0.53,0,0.968-0.414,0.999-0.943c0.015-0.27,0.341-6.648-2.662-9.925
             c-0.011-0.013-0.945-1.112-1.641-2.204c0.992-0.987,1.606-2.353,1.606-3.86l0.001-5.84c2.064-3.39,5.257-6.083,8.874-7.535
             l0.168,3.065c0.018,0.332,0.2,0.633,0.485,0.804c0.158,0.094,0.335,0.142,0.513,0.142c0.145,0,0.29-0.031,0.425-0.095
             l4.245-1.992c0.5-0.235,0.715-0.83,0.48-1.33C30.533,42.702,29.937,42.489,29.438,42.722z
             M2,35.461h1.13V36.5H2V35.461z M9.391,43.338c-3.29,0-3.357-5.784-3.357-5.842
             C6.03,36.98,5.633,36.57,5.13,36.519v-1.059h6.366v7.879l-1.361-0.001c-0.003,0-0.006,0-0.009,0L9.391,43.338z
             M6.675,49.034c-0.006-1.203-0.013-2.34,0.595-2.951c0.49-0.493,1.448-0.743,2.845-0.744l0.024,0
             c1.397,0.002,2.355,0.251,2.844,0.744c0.406,0.409,0.536,1.054,0.577,1.795h-2.325c-0.552,0-1,0.448-1,1s0.448,1,1,1h2.343
             l0,1.821h-2.343c-0.552,0-1,0.448-1,1s0.448,1,1,1h2.342l0,1.688h-2.342c-0.552,0-1,0.448-1,1s0.448,1,1,1h2.037
             c-0.539,1.204-1.743,2.047-3.145,2.047c-1.902,0-3.45-1.548-3.45-3.45L6.675,49.034z M5.133,70.917
             c0.007-0.393,0.031-0.897,0.079-1.451h10.995c0.048,0.553,0.071,1.058,0.078,1.451H5.133z
             M14.115,63.374c0.974,1.063,1.509,2.608,1.808,4.091H5.501c0.305-1.494,0.853-3.057,1.852-4.149
             c0.037-0.047,0.767-0.981,1.456-2.049c0.423,0.105,0.862,0.168,1.317,0.168c0.78,0,1.52-0.167,2.191-0.464
             C13.089,62.17,14.047,63.296,14.115,63.374z M21.2,16.754v1.046c0,0.552,0.448,1,1,1s1-0.448,1-1v-1.37
             c2.995-1.182,7.331-2.308,11.602-2.308c4.271,0,8.607,1.126,11.602,2.308v1.37c0,0.552,0.448,1,1,1s1-0.448,1-1v-1.046
             c0.266-0.186,0.428-0.489,0.428-0.815V5.24c0-0.395-0.232-0.753-0.594-0.914
             c-3.156-1.404-8.343-2.904-13.436-2.904c-5.094,0-10.281,1.5-13.436,2.904c-0.361,0.161-0.594,0.519-0.594,0.914v10.698
             C20.772,16.264,20.935,16.567,21.2,16.754z M22.772,5.9c2.999-1.241,7.556-2.477,12.03-2.477c4.474,0,9.03,1.236,12.03,2.477
             v8.546c-3.169-1.208-7.635-2.325-12.03-2.325c-4.396,0-8.86,1.117-12.03,2.325V5.9z
             M73.34,32.94h-25.23c-0.552,0-1,0.448-1,1v3.523c0,0.552,0.448,1,1,1h2.335l9.721,6.916v9.426
             c-1.676,0.08-2.913,0.494-3.715,1.301c-1.194,1.201-1.185,2.886-1.177,4.372l0.001,6.94c0,3.005,2.445,5.45,5.45,5.45
             s5.45-2.445,5.45-5.45l0.001-6.94c0.008-1.486,0.017-3.171-1.177-4.372c-0.658-0.662-1.595-1.068-2.833-1.239v-9.516
             c4.234-3.308,7.866-6.118,8.861-6.888h2.313c0.552,0,1-0.448,1-1V33.94C74.34,33.387,73.892,32.94,73.34,32.94z
             M64.176,60.468l-0.001,6.951c0,1.902-1.548,3.45-3.45,3.45c-1.402,0-2.606-0.844-3.145-2.047h2.037
             c0.552,0,1-0.448,1-1s-0.448-1-1-1h-2.342l0-1.688h2.342c0.552,0,1-0.448,1-1s-0.448-1-1-1h-2.343l0-1.821h2.343
             c0.552,0,1-0.448,1-1s-0.448-1-1-1h-2.325c0.041,0.741,0.171,1.386,0.577,1.795C62.365,60.424,63.323,60.468,64.176,60.468z"
          />
        </svg>
      ),
    },
    {
      id: "masonry",
      title: "Masonry",
      icon: (
        <svg
          viewBox="0 0 512.009 512.009"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
        >
          <path d="M486.409 406.591h-56.021c.034-.529.307-.973.307-1.502v-54.212c0-14.14-11.46-25.6-25.6-25.6h-56.021c.034-.529.307-.973.307-1.51v-54.212c0-14.14-11.46-25.6-25.6-25.6H188.245c-14.14 0-25.6 11.46-25.6 25.6v54.212c0 .538.273.981.307 1.51h-56.021c-14.14 0-25.6 11.46-25.6 25.6v54.212c0 .538.273.981.307 1.502h-56.03c-14.14 0-25.6 11.46-25.6 25.6v54.212c0 14.14 11.46 25.6 25.6 25.6h460.8c14.14 0 25.6-11.46 25.6-25.6v-54.212c0-14.14-11.461-25.6-25.6-25.6zM405.094 350.877v54.212H269.559v-54.212H405.094zM188.245 269.555h135.526v54.212H188.245V269.555zM106.931 350.877h135.526v54.212H106.931V350.877zM161.135 486.404H25.608v-54.212h135.527V486.404zM323.772 486.404H188.245v-54.212h135.527V486.404zM486.409 486.404H350.882v-54.212h135.527V486.404z" />
          <path d="M360.508 7.504c-7.313-7.305-18.296-9.506-27.853-5.572L178.782 65.292c-3.174 1.306-5.999 3.217-8.354 5.572-3.524 3.524-5.999 8.055-7.006 13.082-1.681 8.397.947 17.067 6.997 23.125l36.207 36.207-13.577 13.577-57.02-8.141c-3.985-.572-8.021.768-10.863 3.618l-18.099 18.099c-10.001-10.001-26.206-10.001-36.207 0l-63.36 63.36c-10.001 10.001-10.001 26.206 0 36.207l18.108 18.082c10.001 10.001 26.206 10.001 36.207 0l63.36-63.36c10.001-10.001 10.001-26.206 0-36.207l13.577-13.577 57.02 8.141c3.985.572 8.021-.768 10.863-3.618l18.099-18.099 36.207 36.207c6.05 6.05 14.729 8.678 23.125 6.997 5.026-1.007 9.557-3.482 13.082-6.997 2.355-2.355 4.267-5.18 5.572-8.354l63.36-153.865c4.405-10.714 2.212-21.696-5.101-29.001zM43.708 269.981l-18.099-18.099 63.36-63.36 18.099 18.099L43.708 269.981zM279.031 179.468l-36.207-36.207 27.153-27.153c5-5.001 5-13.099 0-18.099-5.001-5-13.099-5-18.099 0l-27.153 27.153-36.198-36.198 153.865-63.36L279.031 179.468z" />
        </svg>
      ),
    },
    {
      id: "other",
      title: "Other",
      icon: (
        <svg
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
        >
          <circle cx="6" cy="12" r="1.5" />
          <circle cx="12" cy="12" r="1.5" />
          <circle cx="18" cy="12" r="1.5" />
        </svg>
      ),
    },
  ];

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFileName(files[0].name);
      setFormData({ ...formData, ["image"]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    const token = localStorage.getItem("auth");
    if (!token) {
      setLoading(false);
      alert("You must be logged in.");
      navigate("/login");
      return;
    }
    e.preventDefault();
    detectLocation();
    try {
      if (formData.coordinates[0] === 0 && formData.coordinates[1] === 0) {
        const coords = await detectLocation();
        if (!coords) {
          setLoading(false);
          throw new Error("Could not determine location");
        }
      }
      const data = new FormData();
      data.append(
        "formData",
        JSON.stringify({
          name: formData.name,
          description: formData.description,
          category: formData.category,
          address: formData.address,
          status: formData.status,
          price: formData.price,
          otp: formData.otp,
          landmark: formData.landmark,
          coordinates: formData.coordinates,
        }),
      );
      data.append("serviceImage", formData.image);

      const response = await axios.post(`${BASE_URL}/api/services`, data, {
        headers: {
          Authorization: token,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Service created successfully!");

      navigate(`/servicemans/${response.data.serviceId}`);
      setFormData({
        name: "",
        description: "",
        landmark: "",
        category: "",
        image: null,
        address: "",
        district: "",
        city: "",
        state: "",
        pincode: "",
        status: "requested",
        price: "",
        otp: "",
        coordinates: [0, 0],
      });
      setLoading(false);
    } catch (err) {
      setLoading(false);
      toast.error(err.response?.data?.message || "An error occurred");
    }
  };

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFileName(e.dataTransfer.files[0].name);
      setFormData({ ...formData, ["image"]: e.dataTransfer.files[0] });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  const handleInputCoordinates = (e) => {
    const value = e.target.value;
    const [lat, lng] = value
      .split(",")
      .map((coord) => parseFloat(coord.trim()));

    if (!isNaN(lat) && !isNaN(lng)) {
      setFormData((prev) => ({
        ...prev,
        coordinates: [lat, lng],
      }));
    }
  };

  const handleAddAddress = async () => {
    const token = localStorage.getItem("auth");
    if (!token) {
      toast.error("Please login to add address");
      return;
    }

    // Validation
    if (!newAddress.landmark || !newAddress.city || !newAddress.state || !newAddress.pincode) {
      toast.error("Please fill all required fields");
      return;
    }

    // Ensure coordinates are detected (should always be true since form only opens via "Save & Use")
    if (!detectedCoordinates) {
      toast.error("Location not detected. Please use 'Use Current Location' first.");
      return;
    }

    try {
      const addressData = {
        ...newAddress,
        coordinates: detectedCoordinates,
      };

      const response = await axios.post(
        `${BASE_URL}/api/addresses`,
        addressData,
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("Address saved successfully!");

      // Refresh addresses list
      const addressesResponse = await axios.get(`${BASE_URL}/api/addresses`, {
        headers: { Authorization: token },
      });
      setSavedAddresses(addressesResponse.data);

      // Auto-select the newly saved address
      const savedAddress = response.data.address;
      setSelectedAddress(savedAddress);
      setFormData((prev) => ({
        ...prev,
        landmark: savedAddress.landmark,
        address: savedAddress.address || "",
        city: savedAddress.city || "",
        state: savedAddress.state || "",
        pincode: savedAddress.pincode || "",
        coordinates: savedAddress.coordinates && savedAddress.coordinates.length === 2
          ? [savedAddress.coordinates[1], savedAddress.coordinates[0]]
          : [0, 0],
      }));

      // Reset form and states
      setNewAddress({
        label: "Home",
        customLabel: "",
        landmark: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
        isDefault: false,
      });
      setDetectedCoordinates(null);
      setShowAddAddressForm(false);
      setShowAddressModal(false);
    } catch (error) {
      console.error("Error adding address:", error);
      toast.error(error.response?.data?.message || "Failed to add address");
    }
  };

  const handleUseCurrentLocation = async () => {
    try {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const coords = [position.coords.longitude, position.coords.latitude];
            setDetectedCoordinates(coords);
            // Show confirmation dialog
            setShowSaveLocationDialog(true);
          },
          (error) => {
            toast.error("Could not detect location. Please enable GPS.");
            console.error("Geolocation error:", error);
          }
        );
      } else {
        toast.error("Geolocation is not supported by your browser");
      }
    } catch (error) {
      toast.error("Error detecting location");
      console.error("Location detection error:", error);
    }
  };

  const handleSaveLocation = () => {
    // Close dialog and open add address form with pre-filled coordinates
    setShowSaveLocationDialog(false);
    setShowAddAddressForm(true);
    // No need for toast here - we have the green banner showing location detected
  };

  const handleJustUseOnce = () => {
    // Use location temporarily without saving
    if (detectedCoordinates) {
      setFormData((prev) => ({
        ...prev,
        coordinates: [detectedCoordinates[1], detectedCoordinates[0]],
      }));
      setSelectedAddress(null);
      setShowSaveLocationDialog(false);
      setShowAddressModal(false);
      toast.success("Using current location for this request");
    }
  };

  const handleDeleteAddress = async (addressId) => {
    const token = localStorage.getItem("auth");
    if (!token) {
      toast.error("Please login to delete address");
      return;
    }

    // Confirm before deleting
    if (!window.confirm("Are you sure you want to delete this address?")) {
      return;
    }

    try {
      await axios.delete(`${BASE_URL}/api/addresses/${addressId}`, {
        headers: { Authorization: token },
      });

      toast.success("Address deleted successfully!");

      // Refresh addresses list
      const response = await axios.get(`${BASE_URL}/api/addresses`, {
        headers: { Authorization: token },
      });
      setSavedAddresses(response.data);

      // If deleted address was selected, clear selection
      if (selectedAddress?._id === addressId) {
        setSelectedAddress(null);
        setFormData((prev) => ({
          ...prev,
          landmark: "",
          address: "",
          city: "",
          state: "",
          pincode: "",
          coordinates: [0, 0],
        }));
      }
    } catch (error) {
      console.error("Error deleting address:", error);
      toast.error(error.response?.data?.message || "Failed to delete address");
    }
  };

  const detectLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData((prev) => ({
            ...prev,
            coordinates: [position.coords.latitude, position.coords.longitude],
          }));
        },
        (error) => {
          console.error("Error detecting location:", error);
        },
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  // Fetch saved addresses
  useEffect(() => {
    const fetchAddresses = async () => {
      const token = localStorage.getItem("auth");
      if (!token) return;

      try {
        const response = await axios.get(`${BASE_URL}/api/addresses`, {
          headers: { Authorization: token },
        });
        setSavedAddresses(response.data);

        // Auto-select default address
        const defaultAddr = response.data.find((addr) => addr.isDefault);
        if (defaultAddr) {
          setSelectedAddress(defaultAddr);
          setFormData((prev) => ({
            ...prev,
            landmark: defaultAddr.landmark,
            address: defaultAddr.address || "",
            city: defaultAddr.city || "",
            state: defaultAddr.state || "",
            pincode: defaultAddr.pincode || "",
            coordinates: defaultAddr.coordinates && defaultAddr.coordinates.length === 2
              ? [defaultAddr.coordinates[1], defaultAddr.coordinates[0]]
              : [0, 0],
          }));
        }
      } catch (error) {
        console.error("Error fetching addresses:", error);
      }
    };

    fetchAddresses();
  }, [BASE_URL]);

  useEffect(() => {
    if (!selectedAddress) {
      detectLocation();
    }
  }, [selectedAddress]);

  useEffect(() => {
    detectLocation();
  }, []);

  return (
    <div className="new-services-page-service-page-container">
      <motion.div
        className="new-services-page-service-page-content"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="new-services-page-service-page-layout">
          <motion.div
            className="new-services-page-service-page-left"
            variants={itemVariants}
          >
            <motion.div
              className="new-services-page-service-page-header"
              variants={itemVariants}
            >
              <h1>
                What type of{" "}
                <span className="new-services-page-service-page-highlight">
                  service you
                </span>{" "}
                want?
              </h1>
              <p>pick the one that suits your needs</p>
            </motion.div>

            {formErrors.service && (
              <div className="new-services-page-service-page-error-message">
                {formErrors.service}
              </div>
            )}

            <div className="new-services-page-service-page-cards-container">
              <div className="new-services-page-service-page-cards-scroll">
                {serviceCards.map((service) => (
                  <motion.div
                    key={service.id}
                    className={`new-services-page-service-page-card-item ${selectedService === service.id ? "selected" : ""
                      }`}
                    onClick={() => setSelectedService(service.id)}
                    whileHover={{ y: -5 }}
                    whileTap={{ scale: 0.98 }}
                    variants={itemVariants}
                  >
                    <div className="new-services-page-service-page-card-icon">
                      {service.icon}
                    </div>
                    <div className="new-services-page-service-page-card-content">
                      <h3>{service.title}</h3>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div
              className="new-services-page-service-page-suggestions"
              variants={itemVariants}
            >
              <h2>
                Suggestions
                <span className="new-services-page-service-page-badge">
                  Popular
                </span>
              </h2>

              <div className="new-services-page-service-page-suggestion-cards">
                <motion.div
                  className="new-services-page-service-page-suggestion-card"
                  whileHover={{
                    y: -5,
                    transition: { type: "spring", stiffness: 300 },
                  }}
                  variants={itemVariants}
                >
                  <div className="new-services-page-service-page-card-accent"></div>
                  <div className="new-services-page-service-page-suggestion-card-content">
                    <h3>
                      Service
                      <span className="new-services-page-service-page-card-arrow">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M9 18l6-6-6-6"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </h3>
                    <p>milestono provide, please give your feedback</p>
                    <button className="new-services-page-service-page-details-btn">
                      Details
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5 12h14M12 5l7 7-7 7"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="new-services-page-service-page-right"
            variants={itemVariants}
          >
            <motion.div
              className="new-services-page-service-page-form-container"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <h2 className="new-services-page-service-page-form-title">
                Request Service
              </h2>

              <form onSubmit={handleSubmit}>
                <div className="new-services-page-service-page-form-fields">
                  <motion.div
                    className="new-services-page-service-page-form-group"
                    variants={itemVariants}
                  >
                    <label htmlFor="description">Problem Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Problem Name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={formErrors.name ? "error" : ""}
                    />
                    {formErrors.name && (
                      <div className="new-services-page-service-page-error-message">
                        {formErrors.name}
                      </div>
                    )}
                  </motion.div>

                  <motion.div
                    className="new-services-page-service-page-form-group"
                    variants={itemVariants}
                  >
                    <label htmlFor="description">Problem Description</label>
                    <input
                      type="text"
                      id="description"
                      name="description"
                      placeholder="Problem Description"
                      value={formData.description}
                      onChange={handleInputChange}
                      className={formErrors.description ? "error" : ""}
                    />
                    {formErrors.description && (
                      <div className="new-services-page-service-page-error-message">
                        {formErrors.description}
                      </div>
                    )}
                  </motion.div>

                  <motion.div
                    className="new-services-page-service-page-form-group"
                    variants={itemVariants}
                  >
                    <label htmlFor="landmark">Area Landmark</label>
                    <input
                      type="text"
                      id="landmark"
                      name="landmark"
                      placeholder="Enter Nearest landmark"
                      value={formData.landmark}
                      onChange={handleInputChange}
                      className={formErrors.landmark ? "error" : ""}
                    />
                    {formErrors.landmark && (
                      <div className="new-services-page-service-page-error-message">
                        {formErrors.landmark}
                      </div>
                    )}
                  </motion.div>

                  <motion.div
                    className="new-services-page-service-page-form-group"
                    variants={itemVariants}
                  >
                    <label htmlFor="category">Problem Category</label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className={formErrors.category ? "error" : ""}
                    >
                      <option value="" disabled hidden>Select a category</option>
                      <option value="Property Legal">Property Legal</option>
                      <option value="Plumbing">Plumbing</option>
                      <option value="Electrician">Electrician</option>
                      <option value="Construction">Construction</option>
                      <option value="Painting">Painting</option>
                      <option value="Cleaning">Cleaning</option>
                      <option value="Interior Designing">
                        Interior Designing
                      </option>
                      <option value="Pest Control">Pest Control</option>
                      <option value="Appliance Repair">Appliance Repair</option>
                      <option value="Carpentry">Carpentry</option>
                      <option value="Landscaping">Landscaping</option>
                      <option value="Courier">Courier</option>
                    </select>
                    {formErrors.category && (
                      <div className="new-services-page-service-page-error-message">
                        {formErrors.category}
                      </div>
                    )}
                  </motion.div>

                  <motion.div
                    className="new-services-page-service-page-form-group"
                    variants={itemVariants}
                  >
                    <label>Upload photo of your problem</label>
                    <div
                      className={`new-services-page-service-page-upload-area ${isDragging ? "dragging" : ""} ${fileName ? "has-file" : ""}`}
                      onClick={handleFileClick}
                      onDragOver={(e) => {
                        e.preventDefault();
                        setIsDragging(true);
                      }}
                      onDragLeave={() => setIsDragging(false)}
                      onDrop={handleFileDrop}
                    >
                      <input
                        ref={fileInputRef}
                        type="file"
                        name="image"
                        onChange={handleInputChange}
                        className="new-services-page-service-page-file-input"
                      />

                      {fileName ? (
                        <div className="new-services-page-service-page-file-selected">
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M20 6L9 17l-5-5"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <span>{fileName}</span>
                        </div>
                      ) : (
                        <>
                          <svg
                            width="32"
                            height="32"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="new-services-page-service-page-upload-icon"
                          >
                            <path
                              d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M17 8l-5-5-5 5"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M12 3v12"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <span className="new-services-page-service-page-upload-text">
                            + Add Photo of Problem
                          </span>
                          <p className="new-services-page-service-page-upload-hint">
                            Click or drag and drop photo here
                          </p>
                        </>
                      )}
                    </div>
                  </motion.div>

                  {/* Address Selection Section - Moved to bottom */}
                  <motion.div
                    className="new-services-page-service-page-form-group"
                    variants={itemVariants}
                  >
                    <label>Service Location</label>
                    {selectedAddress ? (
                      <div className="new-services-page-address-selected-card">
                        <div className="new-services-page-address-info">
                          <span className="new-services-page-address-label">
                            {selectedAddress.label === "Other"
                              ? selectedAddress.customLabel
                              : selectedAddress.label}
                          </span>
                          <p className="new-services-page-address-text">
                            {selectedAddress.landmark}
                          </p>
                          <p className="new-services-page-address-subtext">
                            {selectedAddress.city}, {selectedAddress.state}
                          </p>
                        </div>
                        <button
                          type="button"
                          className="new-services-page-change-address-btn"
                          onClick={() => setShowAddressModal(true)}
                        >
                          Change
                        </button>
                      </div>
                    ) : (
                      <div className="new-services-page-no-address">
                        <button
                          type="button"
                          className="new-services-page-select-address-btn"
                          onClick={() => setShowAddressModal(true)}
                        >
                          Select Service Location
                        </button>
                        <button
                          type="button"
                          className="new-services-page-use-current-btn"
                          onClick={handleUseCurrentLocation}
                        >
                          Use Current Location
                        </button>
                      </div>
                    )}
                  </motion.div>

                  <motion.button
                    type="submit"
                    className="new-services-page-service-page-submit-btn"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    variants={itemVariants}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <div className="service-form-spinner"></div>
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        Submit Request
                      </>)}
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Address Selection Modal */}
      {showAddressModal && (
        <div
          className="new-services-page-address-modal-overlay"
          onClick={() => setShowAddressModal(false)}
        >
          <div
            className="new-services-page-address-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="new-services-page-address-modal-header">
              <h3>Select Service Location</h3>
              <button onClick={() => setShowAddressModal(false)}>✕</button>
            </div>

            {!showAddAddressForm ? (
              <>
                <div className="new-services-page-address-list">
                  {savedAddresses.length > 0 ? (
                    savedAddresses.map((address) => (
                      <div
                        key={address._id}
                        className={`new-services-page-address-item ${selectedAddress?._id === address._id ? "selected" : ""
                          }`}
                      >
                        <div
                          className="new-services-page-address-content"
                          onClick={() => {
                            setSelectedAddress(address);
                            setFormData((prev) => ({
                              ...prev,
                              landmark: address.landmark,
                              address: address.address || "",
                              city: address.city || "",
                              state: address.state || "",
                              pincode: address.pincode || "",
                              coordinates: address.coordinates && address.coordinates.length === 2
                                ? [address.coordinates[1], address.coordinates[0]]
                                : [0, 0],
                            }));
                            setShowAddressModal(false);
                            toast.success("Address selected");
                          }}
                        >
                          <div className="new-services-page-address-label-badge">
                            {address.label === "Other"
                              ? address.customLabel
                              : address.label}
                            {address.isDefault && (
                              <span className="new-services-page-default-badge">
                                Default
                              </span>
                            )}
                          </div>
                          <p className="new-services-page-address-landmark">
                            {address.landmark}
                          </p>
                          <p className="new-services-page-address-details">
                            {address.city}, {address.state} - {address.pincode}
                          </p>
                        </div>
                        <button
                          className="new-services-page-delete-address-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteAddress(address._id);
                          }}
                          title="Delete address"
                        >
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                          >
                            <path
                              d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6h14zM10 11v6M14 11v6"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>
                      </div>
                    ))
                  ) : (
                    <p className="new-services-page-no-addresses">
                      No saved addresses found. Add your first address!
                    </p>
                  )}
                </div>

                <div className="new-services-page-address-modal-footer">
                  <button
                    type="button"
                    className="new-services-page-use-current-location-btn"
                    onClick={handleUseCurrentLocation}
                  >
                    Use Current Location
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="new-services-page-add-address-form">
                  <button
                    type="button"
                    className="new-services-page-back-btn"
                    onClick={() => {
                      setShowAddAddressForm(false);
                      setDetectedCoordinates(null);
                    }}
                  >
                    ← Back to Addresses
                  </button>

                  <div className="new-services-page-location-detected-banner">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
                        fill="currentColor"
                      />
                    </svg>
                    <span>Current location detected! Please fill in the address details.</span>
                  </div>

                  <div className="new-services-page-form-group">
                    <label>Address Label *</label>
                    <select
                      value={newAddress.label}
                      onChange={(e) =>
                        setNewAddress({ ...newAddress, label: e.target.value })
                      }
                    >
                      <option value="Home">Home</option>
                      <option value="Work">Work</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  {newAddress.label === "Other" && (
                    <div className="new-services-page-form-group">
                      <label>Custom Label *</label>
                      <input
                        type="text"
                        placeholder="e.g., Friend's House"
                        value={newAddress.customLabel}
                        onChange={(e) =>
                          setNewAddress({
                            ...newAddress,
                            customLabel: e.target.value,
                          })
                        }
                      />
                    </div>
                  )}

                  <div className="new-services-page-form-group">
                    <label>Landmark *</label>
                    <input
                      type="text"
                      placeholder="e.g., Near Central Park"
                      value={newAddress.landmark}
                      onChange={(e) =>
                        setNewAddress({ ...newAddress, landmark: e.target.value })
                      }
                    />
                  </div>

                  <div className="new-services-page-form-group">
                    <label>Complete Address</label>
                    <textarea
                      placeholder="House/Flat No., Street Name"
                      value={newAddress.address}
                      onChange={(e) =>
                        setNewAddress({ ...newAddress, address: e.target.value })
                      }
                      rows={2}
                    />
                  </div>

                  <div className="new-services-page-form-row">
                    <div className="new-services-page-form-group">
                      <label>City *</label>
                      <input
                        type="text"
                        placeholder="City"
                        value={newAddress.city}
                        onChange={(e) =>
                          setNewAddress({ ...newAddress, city: e.target.value })
                        }
                      />
                    </div>

                    <div className="new-services-page-form-group">
                      <label>State *</label>
                      <input
                        type="text"
                        placeholder="State"
                        value={newAddress.state}
                        onChange={(e) =>
                          setNewAddress({ ...newAddress, state: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="new-services-page-form-group">
                    <label>Pincode *</label>
                    <input
                      type="text"
                      placeholder="400001"
                      value={newAddress.pincode}
                      onChange={(e) =>
                        setNewAddress({ ...newAddress, pincode: e.target.value })
                      }
                      maxLength={6}
                    />
                  </div>

                  <div className="new-services-page-form-group">
                    <label className="new-services-page-checkbox-label">
                      <input
                        type="checkbox"
                        checked={newAddress.isDefault}
                        onChange={(e) =>
                          setNewAddress({
                            ...newAddress,
                            isDefault: e.target.checked,
                          })
                        }
                      />
                      Set as default address
                    </label>
                  </div>

                  <button
                    type="button"
                    className="new-services-page-save-address-btn"
                    onClick={handleAddAddress}
                  >
                    Save Address
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}



      {/* Save Location Confirmation Dialog */}
      {showSaveLocationDialog && (
        <div
          className="new-services-page-address-modal-overlay"
          onClick={() => {
            setShowSaveLocationDialog(false);
            setDetectedCoordinates(null);
          }}
        >
          <div
            className="new-services-page-address-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="new-services-page-address-modal-header">

              <h3 className="new-services-page-address-modal-title" style={{ display: "flex" }}>
                <button fdprocessedid="xarzcc">
                  <svg width="20" height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
                      fill="currentColor"
                    />
                  </svg></button> Location Detected!
              </h3>
            </div>

            <p className="new-services-page-no-addresses">
              Would you like to save this address for future use?
            </p>

            <div className="new-services-page-address-modal-actions" style={{ display: "flex", gap: "10px" }}>
              <button
                type="button"
                className="new-services-page-use-current-location-btn"
                onClick={handleSaveLocation}
              >
                Save & Use
              </button>

              <button
                type="button"
                className="new-services-page-use-current-location-btn"
                onClick={handleJustUseOnce}
              >
                Just Use Once
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServicesPage;
