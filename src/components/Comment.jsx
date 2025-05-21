import React, { useEffect, useCallback, useRef } from 'react';

import { checkOwner } from "/src/utils/checkUser.js";
import { fetchComments, deleteComment } from "/src/apis/postApi.js";

import useInfiniteList from '/src/hooks/userInfiniteList.js';
import "./comment.css";

export default function Comment({ postId, setCommentCount, commentRefreshTrigger }) {
  const isInit = useRef(true);

  const commentsFetcher = useCallback(async (offset, limit) => {
    return fetchComments(postId, offset, limit);
  }, []);

  const {
    items: comments,
    hasMore,
    loading,
    lastRef,
    resetList
  } = useInfiniteList(commentsFetcher, 10);

  useEffect(() => {
    // useInfiniteList 와의 중복 조회 방지
    if (isInit.current) {
      isInit.current  = false;
      return;
    }

    resetList();
  }, [commentRefreshTrigger])

  const handleDeleteComment = async (commentInfo) => {
    try {
      if (!commentInfo.commentId)  throw new Error("commentId is NULL");

      if (!checkOwner(commentInfo.userId)) {
        alert("삭제 권한이 없습니다.")
        return;
      }

      const commentCount = await deleteComment(commentInfo.commentId);

      if (setCommentCount) {
        setCommentCount(commentCount);
      }

      resetList();

    } catch (error) {
      console.error('Delete Comment Error : ', error); 

      alert('댓글 삭제에 실패했습니다. 다시 시도해주세요.');
    }
  }

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