import { useState } from 'react';
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
  } = post;

  const [publicState, setPublicState] = useState(is_public);
  const [likedState, setLikedState] = useState(liked);
  const [likeCount, setLikeCount] = useState(like_cnt);

  const formattedDate = new Date(created_at).toISOString().slice(0, 10);
  const heartImg = likedState ? likedHeartIcon : heartIcon;

  const handleToggle = () => {
    const next = !publicState;
    setPublicState(next);
    // TODO: PATCH /post/{postId} API 호출
  };

  const handleLike = () => {
    const next = !likedState;
    setLikedState(next);
    setLikeCount((prev) => prev + (next ? 1 : -1));
    // TODO: POST /post/{postId}/like API 호출
  };
  return (
    <div className="userpost_card">
      <div className="userpost_card_header">
        <span className="userpost_card_date">{formattedDate}</span>
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
      </div>
    </div>
  );
}
