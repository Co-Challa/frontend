import { Link } from "react-router-dom";
import "./header.css";

export default function Header() {

  const checkLoggedIn = () => { 
    const token = localStorage.getItem('authToken');

    if (!token) return false;

    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000); // 현재 시간을 초 단위로

      // 토큰의 만료 시간 확인
      if (decodedToken.exp && decodedToken.exp > currentTime) {
        return true;
      }
      // 토큰이 만료되었으면 삭제 
      else {
        clearAuthToken();
        return false;
      }
    } catch (error) {
      console.error('Decoding Error : ', error);
      clearAuthToken();
      return false;
    }
  };

  return (
    <>
      <header className="header_wrapper">
        <div className="header_frame" />

        <div className="header_frame_shadow" />

        <div className="header_content_frame">
          <Link to="/">
            <div className="cochalla_frame">
              <img className="cochalla_logo" src="src\assets\logo\logo.png" />
              <span className="cochalla_text">Cochalla</span>
            </div>
          </Link>

          <div className="feature_frame">
            <Link to="/chat">
              <div className="question_box">
                <span className="question_text">질문하기</span>
                <img className="question_icon" src="src\assets\icons\stars.png" />
              </div>
            </Link>
            {
              checkLoggedIn() ? (
                <Link to="/mypage">
                  <div>
                    <img className="user_img" src="src\assets\images\profile\profile_1.png" />
                  </div>
                </Link>
              ) : (
                <Link to="/login">
                  <div>
                    <span className="login">로그인</span>
                  </div>
                </Link>
              )
            }
          </div>
        </div>

      </header>
    </>
  );
}
