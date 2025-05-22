import { useState } from "react";
import "./myPageHeader.css";
import editIcon from "../assets/icons/edit.png";
import logoutIcon from "../assets/icons/logout.png";
import UserInfoEditModal from "./UserInfoEditModal";

export default function MyPageHeader({ user, onUpdate }) {
  const [showModal, setShowModal] = useState(false);

  const avatarSrc = new URL(
    `../assets/images/profile/profile_${user.profile_img}.png`,
    import.meta.url
  ).href;

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <>
      <header className="mypage_header">
        <div className="mypage_header_left">
          <img className="mypage_avatar" src={avatarSrc} alt="프로필" />
          <div className="mypage_info">
            <div className="mypage_nickname">
              {user.nickname}
              <img
                className="mypage_edit_icon"
                src={editIcon}
                alt="수정"
                onClick={() => setShowModal(true)}
              />
            </div>
            <div className="mypage_user_id">ID: {user.user_id}</div>
          </div>
        </div>
        <button className="mypage_logout" type="button" onClick={handleLogout}>
          로그아웃 <img className="arrow" src={logoutIcon} alt="" />
        </button>
      </header>

      {showModal && (
        <UserInfoEditModal
          initialUser={user}
          onClose={() => setShowModal(false)}
          onSave={onUpdate}
        />
      )}
    </>
  );
}
