import axios from "axios";
import { useState } from "react";

export default function SignupPage() {
    const [form, setForm] = useState({
      userId: "",
      password: "",
      nickname: "",
      profileImg: 1,
      resTime: 21,
    });

    const handleChange = (e) => {
      setForm({...form, [e.target.name]: e.target.value});
    };

    const handleProfileChange = (e) => {
      setForm({...form, profileImg: parseInt(e.target.value)});
    }

    const handleSubmit = async (e) => {
      e.preventDefault();
      try{
        await axios.post("http://localhost:8080/signup", form);
        alert("회원가입 성공");
      } catch (err) {
        const msg = err.response?.data ?? "회원가입 실패";
        alert("에러: " + msg);
      }
    }
  
  return (<>
    <form onSubmit={handleSubmit}>
      <h2>회원가입</h2>
      <input name="userId" placeholder="유저아이디" onChange={handleChange} required />
      <input name="password" placeholder="비밀번호" onChange={handleChange} required />
      <input name="nickname" placeholder="닉네임" onChange={handleChange} required />
      <div>
        <p>프로필 이미지 선택</p>
        <div style={{display: "flex", gap: "10px"}}>
          {[1,2,3,4,5,6].map((num) => (
            <label key={num}>
              <input type="radio" name="profileImg" placeholder="프로필사진" value={num} checked={form.profileImg === num} onChange={handleProfileChange}/>
              <img src={`/images/profile${num}.png`} alt={`프로필 ${num}번`} style={{width:"50px", height: "50px", borderRadius: "50%"}}/>
            </label>
          ))}
        </div>
      </div>
      <input name="resTime" type="number" placeholder="요약예약시간" onChange={handleChange} min={1} max={24} required />
      <button type="submit">회원가입</button>
    </form>
  </>);
}
