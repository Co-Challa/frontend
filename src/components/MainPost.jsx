import React from "react";
// "1일전"처럼 보여주는 도구 
import { format } from "date-fns";
//한국어 날짜 표기
import ko from "date-fns/locale/ko";
import { useNavigate } from "react-router-dom";

export default function MainPost({ post }) {
  const navigate = useNavigate();
  const {
    nickname,
    title,
    createdAt,
    content,
    likesCount,
    commentsCount,
    id // 이게 있어야 `/post/${id}`로 이동 가능!
  } = post;

  const handleClick = () => {
    navigate(`/post/${post.id}`);
  };

  const getProfileImage = (code) => {
    try {
      return new URL(`../assets/images/profile/profile_${code}.png`, import.meta.url).href;
    } catch {
      return new URL(`../assets/images/profile/default.png`, import.meta.url).href;
    }
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
          src={getProfileImage(user.profileImgCode)} // ✅ DB에서 받은 숫자 기반
          alt="프로필 이미지"
          className="user_image"
        />        <div className="nickname_time">
          <div className="user_nickname">
            <span className="prefix">post by </span>
            <span className="nickname">{nickname}</span>
            <span className="dot">·</span>
            <span className="created_At">
              {format(new Date(createdAt), "yyyy-MM-dd")}
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
        <div className="icon_group" onClick={toggleLike}>
          <div className={`like_button ${liked ? "liked" : "unliked"}`}></div>
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
