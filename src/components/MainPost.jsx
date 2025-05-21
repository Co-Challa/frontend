import React from "react";
import axios from "axios";
import { useState } from 'react';
import "./mainPage.css";
import { useNavigate } from "react-router-dom";
import likedHeart from "../assets/icons/likedheart.png";
import unlikedHeart from "../assets/icons/heart.png";
import axiosInstance from "../apis/instance";
import {updatePublicState} from "../apis"



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
    likesCount: initialLikesCount,
    liked: initialLiked = false, // ← 백엔드에서 넘겨줄 수 있음
    commentsCount,
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
  const [liked, setLiked] = useState(initialLiked);

  // ❤️ 좋아요 누르면 실행
  const handleLikeClick = async (e) => {
    e.stopPropagation(); // 게시글 상세 페이지로 이동 막기
    const nextLiked = !liked;

    updatePublicState
  };



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
      <div className="icon_group">
        <div
          className="like_button"
          onClick={handleLikeClick}
          style={{
            backgroundImage: `url(${liked ? likedHeart : unlikedHeart})`,
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

        <div className="comments_icon" />
        <span>{commentsCount}</span>
      </div>
    </div>


  );
}
