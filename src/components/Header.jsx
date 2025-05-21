import React, { useState, useEffect } from 'react'; // Import useState and useEffect
import { jwtDecode } from 'jwt-decode';
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import "./header.css";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate(); 

  const clearAuthToken = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/login');
  };

  const checkLoggedIn = () => {
    const token = localStorage.getItem('token');

    if (token === null) {
      setIsLoggedIn(false);
      return false;
    }

    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000);

      // Check token expiration
      if (decodedToken.exp && decodedToken.exp > currentTime) {
        setIsLoggedIn(true);
        return true;
      } else {
        console.log('Token expired. Logging out.');
        clearAuthToken();
        return false;
      }
    } catch (error) {
      console.error('Decoding Error : ', error);
      clearAuthToken();
      return false;
    }
  };

  useEffect(() => {
    checkLoggedIn();
  }, []);

  return (
    <>
      <header className="header_wrapper">
        <div className="header_frame" />
        <div className="header_frame_shadow" />
        <div className="header_content_frame">
          <Link to="/">
            <div className="cochalla_frame">
              <img className="cochalla_logo" src="/src/assets/logo/logo.png" alt="Cochalla Logo" />
              <span className="cochalla_text">Cochalla</span>
            </div>
          </Link>

          <div className="feature_frame">
            <Link to="/chat">
              <div className="question_box">
                <span className="question_text">질문하기</span>
                <img className="question_icon" src="/src/assets/icons/stars.png" alt="Stars Icon" />
              </div>
            </Link>
            {isLoggedIn ? (
              <>
                <Link to="/mypage">
                  <div>
                    <img className="user_img" src="/src/assets/images/profile/profile_1.png" alt="User Profile" />
                  </div>
                </Link>
              </>
            ) : (
              <Link to="/login">
                <div>
                  <span className="login">로그인</span>
                </div>
              </Link>
            )}
          </div>
        </div>
      </header>
    </>
  );
}