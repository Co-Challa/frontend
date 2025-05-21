import React from "react";

import "./mainPage.css";
import { useNavigate } from "react-router-dom";
import profile1 from "../assets/images/profile/profile_1.png";
import profile2 from "../assets/images/profile/profile_2.png";
import profile3 from "../assets/images/profile/profile_3.png";
import profile4 from "../assets/images/profile/profile_4.png";
import profile5 from "../assets/images/profile/profile_5.png";
import profile6 from "../assets/images/profile/profile_6.png";

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

  const profileMap = {
    1: profile1,
    2: profile2,
    3: profile3,
    4: profile4,
    5: profile5,
    6: profile6
  };

  const imgSrc = profileMap[profileImgCode];

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
      <div className="interaction_bar">
        {/*좋아요 버튼 */}
        <div className="icon_group">
          {/* <div className={`like_button ${liked ? "liked" : "unliked"}`}></div> */}
          <span>{likesCount}</span>
        </div>

        {/* 댓글 아이콘 */}
        <div className="icon_group">
          <div className="comments_icon"></div>
          <span>{commentsCount}</span>
        </div>
      </div>


    </div>
  );
}
