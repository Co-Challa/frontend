import React, { useCallback } from 'react';

import { checkOwner } from "/src/utils/checkUser.js";
import { fetchComments, deleteComment } from "/src/apis/postApi.js";

import useInfiniteList from '/src/hooks/userInfiniteList.js';
import "./comment.css";

export default function Comment({ postId, onDeleteComment }) {

  const handleDeleteComment = (commentInfo) => {
    try {
      if (!commentInfo.commentId)  throw new Error("commentId is NULL");

      if (!checkOwner(commentInfo.userId)) {
        alert("삭제 권한이 없습니다.")
        return;
      }

      deleteComment(commentInfo.commentId);

      if (onDeleteComment) {
        onDeleteComment();
      }

      setComments(prev => prev.filter(comment => comment.commentId !== commentInfo.commentId));
    } catch (error) {
      console.error('Delete Comment Error : ', error); 
    }
  }

  const commentsFetcher = useCallback(async (offset, limit) => {
    return fetchComments(postId, offset, limit);
  }, [postId]);

  const {
    items: comments,
    hasMore,
    loading,
    lastRef
  } = useInfiniteList(commentsFetcher, 10);

  return (
    <>
      <div className="comment_list">
        {
          comments.map((comment, index) => {
            const isLastComment = comments.length === index + 1; // for useInfiniteList
            return (
              <div className="comment_item" 
                key={index}
                ref={isLastComment ? lastRef : null} // for useInfiniteList
              >
                <div className="comment_meta">
                  <img className="user_avatar" src={`/src/assets/images/profile/profile_${comment.profileImg}.png`} alt="User Avatar" />
                  <span className="comment_author">{comment.nickname}</span>
                  {
                    checkOwner(comment.userId) ? (
                      <button className="delete_comment_button" aria-label="Delete comment"
                        onClick={() => handleDeleteComment(comment)}>
                        <img src="/src/assets/icons/trash.png" alt="Delete" className="delete_icon" />
                      </button>
                    ) : null
                  }
                </div>
                <p className="comment_content">{comment.content}</p>
                <span className="comment_date">{new Date(comment.createdAt).toLocaleString("ko-KR")}</span>
              </div>
            )
          })
        }
        {loading && <p>댓글 로딩 중...</p>}
      </div>
    </>
  );
}