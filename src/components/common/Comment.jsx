import React, { useState, useEffect, useRef } from 'react';
import { jwtDecode } from 'jwt-decode';

import axiosInstance from '../../apis/instance.js';
import "./comment.css";

export default function Comment({ postId, onDeleteComment }) {
  const [comments, setComments] = useState([]);
  const [page, setPage] = useState(0);
  const [hasNext, setHasNext] = useState(true);
  const observerRef = useRef(null);

  const reqGetComments = async () => {
    try {
      if (!hasNext) return;

      if (!postId) {
        console.warn("postId is not provided to the Comment component.");
        return;
      }

      const res = await axiosInstance.get(`http://localhost:8080/comment/list`, {
        params: { postId, page: page, size: 10 },
      });

      const data = res.data;

      console.log(data);

      setComments(prev => [...prev, ...data.content]);
      setHasNext(!data.isLast);
      setPage(prev => prev + 1);
    } catch (error) {
      console.log(error);      
    }
  };

  const reqDeleteComment = async (commentId) => {
    try {
      const token = localStorage.getItem('token');

      if (!token) throw new Exception();

      const res = await axiosInstance.delete(`http://localhost:8080/comment/${commentId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

    } catch (error) {
      console.log(error);
      alert('댓글 삭제에 실패했습니다. 다시 시도해주세요.');
    }
  }

  const deleteComment = (commentInfo) => {
    if (!checkOwner(commentInfo.userId)) {
      alert("삭제할 권한이 없습니다.")
      return;
    }

    reqDeleteComment(commentInfo.commentId);

    if (onDeleteComment) {
      onDeleteComment();
    }

    setComments(prev => prev.filter(comment => comment.commentId !== commentInfo.commentId));
  }

  // 무한 스크롤 Intersection Observer 설정
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasNext) {
          reqGetComments();
        }
      },
      { threshold: 1 }
    );

    if (observerRef.current) observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [comments, hasNext]);

  const getLoggedInUserId = () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        return decodedToken.sub;
      } catch (error) {
        console.error('Decoding Error : ', error);
        return null;
      }
    }
  };

  const checkOwner = (authorId) => {
    const loggedInUserId = getLoggedInUserId();
    return loggedInUserId && loggedInUserId === authorId;
  };

  return (
    <>
      <div className="comment_list">
        {
          comments.map((comment, index) => {
            return (
              <div className="comment_item" key={index}>
                <div className="comment_meta">
                  <img className="user_avatar" src={`/src/assets/images/profile/profile_${comment.profileImg}.png`} alt="User Avatar" />
                  <span className="comment_author">{comment.nickname}</span>
                  {
                    checkOwner(comment.userId) ? (
                      <button className="delete_comment_button" aria-label="Delete comment"
                        onClick={() => deleteComment(comment)}>
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
        {hasNext && (
          <div ref={observerRef} style={{ height: '10px', background: 'transparent' }}></div>
        )}
      </div>
    </>
  );
}