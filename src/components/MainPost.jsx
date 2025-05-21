import React from "react";

import "./mainPage.css";
import { useNavigate } from "react-router-dom";


export default function MainPost({ post }) {
  const navigate = useNavigate();
  const {
    title,
    content,
    userId,
    nickname,
    profile_img_code: profileImgCode,
    created_at: createdAt,
    post_id: postId,
    likesCount,
    commentsCount,
  } = post;

  const formattedDate = createdAt
    ? new Date(createdAt).toISOString().slice(0, 10)
    : "";

  const handleClick = () => {
    navigate(`/post/${postId}`);
  };
  console.log(post);

  const profileImages = import.meta.glob('../assets/images/profile/*.png', {
    eager: true,
    import: 'default'
  });

  const imgSrc = profileImages[`../assets/images/profile/profile_${profileImgCode}.png`];




  return (
    <div
      className="summary_post"
      onClick={handleClick}
      style={{ cursor: "pointer" }}
    >

      {/* 프로필 */}
      <div className="profile">
        <img
          src={imgSrc} alt="프로필 이미지"
          className="user_image" />
        <div className="nickname_time">
          <div className="user_nickname">
            <span className="prefix">post by </span>
            <span className="nickname">{nickname}</span>
            <span className="dot">·</span>
            <span className="created_At">
              {formattedDate}
            </span>
          </div>
        </div>
      </div>

      <div className="post_title">{title}</div>

      {/* 게시글 요약 */}
      <div className="post_contnet">{content}</div>

      {/* 좋아요와 댓글 */}



      {/* 댓글 아이콘 */}
      <div className="icon_group">
        <div className="comments_icon"></div>
        <span>{commentsCount}</span>
      </div>
    </div>


  );
}
