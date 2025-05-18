import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    userId: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value});
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const response = await axios.post("http://localhost:8080/signin", form);
      const token = response.headers["authorization"]?.split(" ")[1];
      console.log(response)

      if (token) {
        localStorage.setItem("token", token);
        alert("로그인 성공!");
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
    <form onSubmit={handleSubmit}>
      <h2>로그인</h2>
      <input name="userId" placeholder="유저아이디" value={form.userId} onChange={handleChange} required/>
      <input name="password" type="password" placeholder="비밀번호" value={form.password} onChange={handleChange} required/>
      <button type="submit">로그인</button>
    </form>
  );
}
