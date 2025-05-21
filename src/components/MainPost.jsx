import React from "react";
import axios from "axios";
import { useState } from 'react';
import "./mainPage.css";
import { useNavigate } from "react-router-dom";
import likedHeart from "../assets/icons/likedheart.png";
import unlikedHeart from "../assets/icons/heart.png";
import comments_icon from "../assets/icons/message.png";
import axiosInstance from "../apis/instance";
import {togglePostLike} from "../apis/userApi.js";



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
    likes_count: initialLikesCount,
    liked, // ← 백엔드에서 넘겨줄 수 있음
    comments_count,
  } = post;

  const formattedDate = createdAt
    ? new Date(createdAt).toISOString().slice(0, 10)
    : "";

  const handleClick = () => {
    navigate(`/post/${postId}`);
  };

  const profileImages = import.meta.glob('../assets/images/profile/*.png', {
    eager: true,
    import: 'default'
  });

  const imgSrc = profileImages[`../assets/images/profile/profile_${profileImgCode}.png`];

  const [likesCount, setLikesCount] = useState(initialLikesCount);
  const [likedState, setLikedState] = useState(liked);
  console.log(likesCount);

  // ❤️ 좋아요 누르면 실행
   const handleLike = async () => {
      const next = !likedState;
      setLikedState(next);
      setLikesCount((prev) => prev + (next ? 1 : -1));
  
      try {
        await togglePostLike(postId, next);
      } catch (error) {
        console.error("좋아요 토글 실패:", error);
        setLikedState(!next);
        setLikesCount((prev) => prev - (next ? 1 : -1));
      }
    };

  return (
    <div
      className="summary_post"
      style={{ cursor: "pointer" }}>

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
      <div className="post_contnet" onClick={handleClick} >{content}</div>

      {/* 좋아요와 댓글 */}
      <div className="icon_group">
        <div
          className="like_button"
          onClick={handleLike}
          style={{
            backgroundImage: `url(${likedState ? likedHeart : unlikedHeart})`,
            width: "24px",
            height: "24px",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            cursor: "pointer",
            display: "inline-block"
          }}
        />
        <span>{likesCount}</span>

        <div style={{
          backgroundImage: `url(${comments_icon})`,
          width: "24px",
          height: "24px",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          cursor: "pointer",
          display: "inline-block"
        }} />
        <span>{comments_count}</span>
      </div>
    </div>


  );
}
