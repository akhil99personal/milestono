import React from "react";
import ProfileModal from "./ProfileModal";
import axios from "axios";

export default function ProfilePage() {
    const BASE_URL = process.env.REACT_APP_BASE_URL;

    const [userData, setUserData] = React.useState(false);

    React.useEffect(() => {
        const token = localStorage.getItem("auth");
        if (token !== null) {
            setUserData(true);
        }
    }, []);

    return (
        <div className="profile-page">
            {userData ? <ProfileModal onClose={true} /> :
                <>
                    <div className="profile-model-overlay">
                        <div className="profile-model-modal">
                            <div className="profile-modal-header">
                                <h2>Login is required to view your profile</h2>
                            </div>
                            <button
                                onClick={() => window.location.href = "/login"}
                                className="profile-modal-delete-account"
                            >
                                Login Now
                            </button>
                        </div>
                    </div>
                </>
            }

        </div>
    );
}