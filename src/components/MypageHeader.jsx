import './MyPageHeader.css';

export default function MyPageHeader({ user }) {
  const avatarSrc = new URL(
    `../assets/images/profile/profile_${user.profile_img}.png`,
    import.meta.url
  ).href;
  const editIcon = new URL('../assets/icons/edit.png', import.meta.url).href;
  const logoutIcon = new URL('../assets/icons/logout.png', import.meta.url).href;

  return (
    <header className="mypage_header">
      <div className="mypage_header_left">
        <img className="mypage_avatar" src={avatarSrc} alt="프로필" />
        <div className="mypage_info">
          <div className="mypage_nickname">
            {user.nickname}
            <img className="mypage_edit_icon" src={editIcon} alt="수정" />
          </div>
          <div className="mypage_user_id">ID: {user.user_id}</div>
        </div>
      </div>
      <button className="mypage_logout">
        로그아웃 <img className="arrow" src={logoutIcon} alt="" />
      </button>
    </header>
  );
}