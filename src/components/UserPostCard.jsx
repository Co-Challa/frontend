import { useState } from "react";
import { useLocation } from "react-router-dom";
import "./UserPostCard.css";
import heartIcon from "../assets/icons/heart.png";
import likedHeartIcon from "../assets/icons/likedheart.png";
import messageIcon from "../assets/icons/message.png";

export default function UserPostCard({ post }) {
  const {
    post_id,
    title,
    content,
    created_at,
    comment_cnt,
    like_cnt,
    is_public,
    liked,
    author_name,
    author_profile_img,
  } = post;

  const location = useLocation();
  const pathname = location.pathname;

  const isMyPage = pathname === "/mypage";
  const showAuthor = !isMyPage || !!author_name;
  const canToggle = isMyPage && !author_name;

  const [publicState, setPublicState] = useState(is_public);
  const [likedState, setLikedState] = useState(showAuthor ? true : liked);
  const [likeCount, setLikeCount] = useState(like_cnt);

  const formattedDate = new Date(created_at).toISOString().slice(0, 10);
  const heartImg = likedState ? likedHeartIcon : heartIcon;
  const avatarSrc = new URL(
    `../assets/images/profile/profile_${author_profile_img}.png`,
    import.meta.url
  ).href;

  const handleToggle = () => {
    const next = !publicState;
    setPublicState(next);
    //api 연결
  };

  const handleLike = () => {
    const next = !likedState;
    setLikedState(next);
    setLikeCount((prev) => prev + (next ? 1 : -1));
    //api 연결
  };

  return (
    <div className="userpost_card">
      <div className="userpost_card_header">
        {showAuthor ? (
          <span className="userpost_card_date with_profile">
            <img
              src={avatarSrc}
              alt="profile"
              className="profile_img"
            />
            <span>Posted by <span className="post_nickname">{author_name}</span> · {formattedDate}</span>
          </span>
        ) : (
          <span className="userpost_card_date">{formattedDate}</span>
        )}
        <h3 className="userpost_card_title">{title}</h3>
      </div>
      <p className="userpost_card_content">{content}</p>
      <div className="userpost_card_footer">
        <div className="userpost_card_stats">
          <span
            className="icon_text"
            onClick={handleLike}
            style={{ cursor: "pointer" }}
          >
            <img src={heartImg} alt="heart" className="icon" />
            {likeCount.toLocaleString()}
          </span>
          <span className="icon_text">
            <img src={messageIcon} alt="comment" className="icon" />
            {comment_cnt}
          </span>
        </div>
        {canToggle && (
          <div className="userpost_card_toggle">
            <label className="switch">
              <input
                type="checkbox"
                checked={publicState}
                onChange={handleToggle}
              />
              <span className="slider round"></span>
            </label>
          </div>
        )}
      </div>
    </div>
  );
}
