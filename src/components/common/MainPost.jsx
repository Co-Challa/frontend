import React from "react";
// "1일전"처럼 보여주는 도구 
import { formatDistanceToNow } from "date-fns";
//한국어 날짜 표기
import ko from "date-fns/locale/ko";
import { ThumbsUp, MessageSquare } from "lucide-react";

export default function MainPost({ post }) {

    const { profileImg, nickname, created_At, content, likes_count,  comments_count} = post;
    const summary = content.split("\n").slice(0, 5).join("\n");

    return (
    <div className="border rounded-2xl p-4 shadow-sm hover:shadow-md transition">
      {/* 프로필 */}
      <div className="flex items-center space-x-4 mb-2">
        <img
          src={profileImg}
          alt="사용자 이미지"
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <div className="font-semibold">{Nickname}</div>
          <div className="text-sm text-gray-500">
            {formatDistanceToNow(new Date(created_At), {
              addSuffix: true,
              locale: ko,
            })}
          </div>
        </div>
      </div>

      {/* 게시글 요약 */}
      <pre className="whitespace-pre-wrap text-sm text-gray-800 mb-2">{content}</pre>

      {/* 좋아요와 댓글 */}
      <div className="flex space-x-4 text-sm text-gray-600 mt-2">
        <div className="flex items-center space-x-1">
          <ThumbsUp size={16} />
          <span>{likes_count}</span>
        </div>
        <div className="flex items-center space-x-1">
          <MessageSquare size={16} />
          <span>{comments_count}</span>
        </div>
      </div>
    </div>
  );
}
