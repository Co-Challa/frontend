import { Link } from "react-router-dom";
import "./header.css";

export default function Header() {
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
            <Link to="/login">
              <div>
                <span className="login">로그인</span>
              </div>
            </Link>
            <Link to="/mypage">
              <div>
                <img className="user_img" src="src\assets\images\profile\profile_1.png" />
              </div>
            </Link>
          </div>
        </div>

      </header>
    </>
  );
}
