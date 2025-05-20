import { Link } from "react-router-dom";
import React, { useRef, useState, useEffect } from 'react';

import axios from 'axios';
import Comment from "../components/common/Comment";
import "./postPage.css";

export default function PostPage() {
  const inputCommentRef = useRef("");

  const [post, setPost] = useState(null);

  const [publicState, setPublicState] = useState(false);
  const [likeState, setLikeState] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);

  const reqGetPost = async (postId) => {
    try {
      const res = await axios.get(`http://localhost:8080/post/${postId}`);
      const data = res.data;

      console.log(data);

      setPost(data);

      setPublicState(data.isPublic);
      setLikeState(data.isLike);
      setLikeCount(data.likeCount);
      setCommentCount(data.commentCount);

    } catch (error) {
      console.log(error);
    }
  };

  const reqUpdatePublicState = async (toggle) => {
    try {
      const res = await axios.patch(`http://localhost:8080/post/${post.postId}`, {
        isPublic: toggle
      });
    } catch (error) {
      console.error("공개 상태 업데이트 실패:", error);
      setPublicState(!toggle);
    }
  };

  const reqUpdateLikeState = async (toggle) => {
    try {
      const res = await axios.post(`http://localhost:8080/like/${post.postId}`, {
        isLike: toggle
      });

      const data = res.data;

      setLikeCount(data);

    } catch (error) {
      console.error("좋아요 업데이트 실패:", error);
      setLikeState(!toggle);
    }
  }

  const reqCreateComment = (content) => { 
    try { 
      const res = axios.post(`http://localhost:8080/comment/${post.postId}`, {
        comment : content
      });

      // (임시) Comment.jsx 리로딩 (웹소켓을 통해 실시간 업데이트)
      // (임시) 웹소켓으로 실시간 동기화 or 페이지 재접속 or Comment 리로딩

      // 댓글 작성 성공 시 PostPage의 commentCount 증가
      setCommentCount(prevCount => prevCount + 1);

      // 입력 필드 초기화
      if (inputCommentRef.current) {
        inputCommentRef.current.value = '';
      }

    } catch (error) {
      console.log(error);      
    }
  }

  useEffect(() => {
    reqGetPost(1);
  }, []);

  const togglePublicState = () => {
    const toggle = !publicState;
    setPublicState(toggle);

    reqUpdatePublicState(toggle);
  };

  const toggleLikeState = () => {
    const toggle = !likeState;
    setLikeState(toggle);

    reqUpdateLikeState(toggle);
  }

  const createComment = (comment) => {
    if (!comment.trim()) {
      alert("댓글 내용을 입력해주세요.");
      return;
    }
    if (!post || !post.postId) {
      console.error("게시물 정보가 없거나 postId가 없습니다.");
      return;
    }

    reqCreateComment(comment);
  }

  const decreaseCommentCount = () => {
    // (임시) 웹소켓으로 실시간 동기화 or 페이지 재접속 or Comment 리로딩
    setCommentCount(prevCount => Math.max(0, prevCount - 1)); // 0 미만으로 내려가지 않도록
  };

  const checkLoggedIn = () => {
    const token = localStorage.getItem('authToken');

    if (!token) return false;

    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000); // 현재 시간을 초 단위로

      // 토큰의 만료 시간 확인
      if (decodedToken.exp && decodedToken.exp > currentTime) {
        return true;
      }
      // 토큰이 만료되었으면 삭제 
      else {
        clearAuthToken();
        return false;
      }
    } catch (error) {
      console.error('Decoding Error : ', error);
      clearAuthToken();
      return false;
    }
  };

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
    post == null ?
      null : (
        <>
          <div className="post_container">
            <div className="post_header">
              <h1 className="post_title">{post.title}</h1>
              <div className="profile_info_bar">
                <div className="profile_details">
                  <img className="profile_avatar" src="src\assets\images\profile\profile_1.png" alt="Profile Avatar" />
                  <span className="posted_by_text">Posted by <span className="author_name">{post.nickname}</span> · {new Date(post.createdAt).toLocaleString("ko-KR")}</span>
                </div>
                {
                  checkOwner(post.userId) ? (
                    <div className="actions_right">
                      <Link to="/chat">
                        <img className="notification_icon" src="src\assets\icons\message-circle.png" alt="Notifications" />
                      </Link>
                      <label className="toggle_switch">
                        <input type="checkbox" checked={publicState} onChange={togglePublicState} />
                        <span className="slider round"></span>
                      </label>
                    </div>
                  ) : null
                }
              </div>
            </div>

            <div className="post_section">
              {post.content}
            </div>

            <div className="post_actions_summary">
              <div className="action_item" onClick={checkLoggedIn() ? toggleLikeState : null}>
                {
                  likeState ?
                    (<img src="src\assets\icons\full_heart.png" alt="Likes" className="action_icon" />)
                    : (<img src="src\assets\icons\empty_heart.png" alt="Likes" className="action_icon" />)
                }
                <span className="action_count">{likeCount}</span>
              </div>
              <div className="action_item">
                <img src="src/assets/icons/message-circle.png" alt="Comments" className="action_icon" />
                <span className="action_count">{commentCount}</span>
              </div>
            </div>

            <h3 className="comments_heading">{commentCount}개의 댓글</h3>

            <div className="comment_input_section">
              <textarea className="comment_textarea" placeholder="댓글을 작성하세요..." ref={inputCommentRef} />
              <button className="submit_comment_button" onClick={() => createComment(inputCommentRef.current.value)}>댓글 작성</button>
            </div>
          </div>

          <Comment 
            postId={post.postId} 
            onDeleteComment={decreaseCommentCount} 
          />
        </>
      )
  );
}
