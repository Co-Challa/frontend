import React from "react";
// "1일전"처럼 보여주는 도구 
import { formatDistanceToNow } from "date-fns";
//한국어 날짜 표기
import ko from "date-fns/locale/ko";

export default function MainPost({ post }) {
  if (!post) return <div>게시글 정보 없음</div>;

  const { userImage, nickname, title, createdAt, content, likesCount, commentsCount } = post;
  const summary = content.split("\n").slice(0, 5).join("\n");

  return (
    <div className="summary_post">
      {/* 프로필 */}
      <div className="profile">
        <img src={userImage} alt="사용자 이미지" className="user_image" />
        <div className="nickname_time">
          <div className="user_nickname">
            <span className="prefix">post by </span>
            <span className="nickname">{nickname}</span>
          </div>
          <div className="created_At">
            {formatDistanceToNow(new Date(createdAt), {
              addSuffix: true,
              locale: ko,
            })}
          </div>
        </div>
      </div>

      <div className="post_title">{title}</div>

      {/* 게시글 요약 */}
      <div className="post_summary">{summary}</div>

      {/* 좋아요와 댓글 */}
      <div className="count_icon">
        <div className="icon_group">
          <div className="likes"></div>
          <span>{likesCount}</span>
        </div>
        <div className="icon_group">
          <div className="comments"></div>
          <span>{commentsCount}</span>
        </div>
      </div>

    </div>
  );
}
