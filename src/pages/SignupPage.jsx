import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./SignupPage.css";

export default function SignupPage() {
  const navigate = useNavigate(); // 추가
  const [form, setForm] = useState({
    userId: "",
    password: "",
    confirmPassword: "",
    nickname: "",
    profileImg: 1,
    resTime: 21,
  });

  const [passwordMatchError, setPasswordMatchError] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      alert("이미 로그인 한 상태입니다.");
      navigate("/");
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });

    if(e.target.name === "confirmPassword"){
      setPasswordMatchError(e.target.value !== form.password);
    }
    if(e.target.name === "password"){
      setPasswordMatchError(e.target.value !== value);
    }
  };

  const handleProfileChange = (e) => {
    setForm({ ...form, profileImg: parseInt(e.target.value) });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/signup", form);
      alert("회원가입 성공");
      navigate("/login");
    } catch (err) {
      const msg = err.response?.data ?? "회원가입 실패";
      alert("에러: " + msg);
    }
  }

  return (
    <div className="signup-page">
      <div className="signup-container">
        <h2>회원가입</h2>
        <form className="signup-form" onSubmit={handleSubmit}>
          <label htmlFor="userId">아이디</label>
          <input name="userId" placeholder="아이디" onChange={handleChange} required />
          <label htmlFor="password">비밀번호</label>
          <input name="password" placeholder="비밀번호" type="password" onChange={handleChange} required />
          <label htmlFor="confirmPassword">비밀번호 확인</label>
          <input name="confirmPassword" placeholder="비밀번호 확인" type="password" onChange={handleChange} required />
          {passwordMatchError && (
            <span className="error-message">비밀번호가 일치하지 않습니다.</span>
          )}
          <label htmlFor="nickname">닉네임</label>
          <input name="nickname" placeholder="닉네임" onChange={handleChange} required />
          <div className="profile-selection">
            <p>프로필 이미지 선택</p>
            <div style={{ display: "flex", gap: "10px" }}>
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <label key={num}>
                  <input type="radio" name="profileImg" placeholder="프로필사진" value={num} checked={form.profileImg === num} onChange={handleProfileChange} />
                  <img src={`/src/assets/images/profile/profile_${num}.png`} alt={`프로필 ${num}번`} style={{ width: "50px", height: "50px", borderRadius: "50%" }} />
                </label>
              ))}
            </div>
          </div>
          <label htmlFor="resTime">요약 예약 시간</label>
          <input name="resTime" type="number" placeholder="요약 예약 시간" onChange={handleChange} min={1} max={24} required />
          <button type="submit">회원가입</button>
        </form>
        <div className="login-link">
              이미 계정이 있으신가요? <a href="/login">로그인</a>
        </div>
      </div>
    </div>
  );
}