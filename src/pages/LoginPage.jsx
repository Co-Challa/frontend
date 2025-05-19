import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

export default function LoginPage() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    userId: "",
    password: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      alert("이미 로그인 한 상태입니다.");
      navigate("/");
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/signin", form);
      const token = response.headers["authorization"]?.split(" ")[1];
      console.log(response)

      if (token) {
        localStorage.setItem("token", token);
        navigate("/");
      } else {
        alert("토큰이 없습니다.");
      }
    } catch (err) {
      const msg = err.response?.data ?? "로그인 실패";
      alert("에러: " + msg);
    }
  }
  return (
    <div className="login-page">
      <div className="login-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>로그인</h2>
          <label htmlFor="userId">아이디</label>
          <input name="userId" placeholder="아이디를 입력해주세요" value={form.userId} onChange={handleChange} required />
          <label htmlFor="password">비밀번호</label>
          <input name="password" type="password" placeholder="비밀번호를 입력해주세요" value={form.password} onChange={handleChange} required />
          <button type="submit">로그인</button>
          <div className="links">
            <span>계정이 없으신가요?</span>
            <a href="/signup">회원가입</a>
          </div>
        </form>
      </div>
      <div className="illustration">
        <img src="/src/assets/images/bg_chatbot.png" alt="일러스트" />
      </div>
    </div>

  );
}
