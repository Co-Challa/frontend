import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import "./comment.css";

export default function Comment({ postId, onDeleteComment }) {
  const [comments, setComments] = useState([]);
  const [page, setPage] = useState(0);
  const [hasNext, setHasNext] = useState(true);
  const observerRef = useRef(null);

  const reqComments = async () => {
    if (!hasNext) return;

    if (!postId) {
      console.warn("postId is not provided to the Comment component.");
      return;
    }

    const res = await axios.get(`http://localhost:8080/comment/list`, {
      params: { postId, page : page, size: 10 },
    });

    const data = res.data;

    console.log(data);

    setComments(prev => [...prev, ...data.content]);
    setHasNext(!data.isLast);
    setPage(prev => prev + 1);
  };

  const reqDeleteComment = async (commentId) => {
    try {
      const res = await axios.delete(`http://localhost:8080/comment/${commentId}`);

      if (onDeleteComment) {
        onDeleteComment();
      }

      setComments(prev => prev.filter(comment => comment.commentId !== commentId));

    } catch (error) {
      console.log(error);
      alert('댓글 삭제에 실패했습니다. 다시 시도해주세요.');
    }
  }

  // 무한 스크롤 Intersection Observer 설정
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasNext) {
          reqComments();
        }
      },
      { threshold: 1 }
    );

    if (observerRef.current) observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [comments, hasNext]);

  const getLoggedInUserId = () => {
    return "test"; // for Testing

    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        return decodedToken.userId;
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
                  <img className="user_avatar" src="src\assets\images\profile\profile_1.png" alt="User Avatar" />
                  <span className="comment_author">{comment.nickname}</span>
                  {
                    checkOwner(comment.userId) ? (
                      <button className="delete_comment_button" aria-label="Delete comment"
                        onClick={() => reqDeleteComment(comment.commentId)}>
                        <img src="src\assets\icons\trash.png" alt="Delete" className="delete_icon" />
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