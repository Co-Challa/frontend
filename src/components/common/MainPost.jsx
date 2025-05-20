import React from "react";
// "1일전"처럼 보여주는 도구 
import { formatDistanceToNow } from "date-fns";
//한국어 날짜 표기
import ko from "date-fns/locale/ko";

export default function MainPost({ post }) {
     if (!post) return <div>게시글 정보 없음</div>;

    const { profileImg, nickname, title, created_At, content, likes_count,  comments_count} = post;
    const summary = content.split("\n").slice(0, 5).join("\n");

    return (
    <div className="summary_post">
        <div className="post_title">{title}</div>
      {/* 프로필 */}
      <div className="flex items-center space-x-4 mb-2">
        <img
          src={profileImg}
          alt="사용자 이미지"
          className="user_image"
        />
        <div>
          <div className="user_nickname">post by{nickname}</div>
          <div className="created_At">
            {formatDistanceToNow(new Date(created_At), {
              addSuffix: true,
              locale: ko,
            })}
          </div>
        </div>
      </div>

      {/* 게시글 요약 */}
      <pre className="post_summary">{summary}</pre>

      {/* 좋아요와 댓글 */}
      <div className="likes_comments">
        <div className="likes">
            <img src="../assets/icons/heart.png" alt="하트아이콘" />
          <span>{likes_count}</span>
        </div>
        <div className="comments">
          <span>{comments_count}</span>
        </div>
      </div>
    </div>
  );
}
