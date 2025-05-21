import { Link, useParams, useNavigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';
import { useRef, useState, useEffect, } from 'react';

import axiosInstance from '../apis/instance.js';
import Comment from "../components/common/Comment";
import "./postPage.css";

export default function PostPage() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const inputCommentRef = useRef("");

  const [post, setPost] = useState(null);

  const [publicState, setPublicState] = useState(false);
  const [likeState, setLikeState] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);

  const clearAuthToken = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };


  const reqGetPost = async () => {
    try {
      const res = await axiosInstance.get(`http://localhost:8080/post/${postId}`);
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
      const token = localStorage.getItem('token');

      if (!token) throw new Exception();

      await axiosInstance.patch(`http://localhost:8080/post/${postId}`, 
        {
         isPublic: toggle
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
    } catch (error) {
      console.error("공개 상태 업데이트 실패:", error);
      setPublicState(!toggle);
      alert('공개 상태 업데이트에 실패했습니다.');
    }
  };

  const reqUpdateLikeState = async (toggle) => {
    try {
      const token = localStorage.getItem('token');

      if (!token) throw new Exception();

      const res = await axiosInstance.post(`http://localhost:8080/like/${postId}`, 
        {
          isLike: toggle
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = res.data;

      setLikeCount(data);
    } catch (error) {
      console.error("좋아요 업데이트 실패:", error);
      setLikeState(!toggle);
      alert('좋아요 업데이트에 실패했습니다. 다시 시도해주세요.');
    }
  }

  const reqCreateComment = async (content) => { 
    try {
      const token = localStorage.getItem('token');

      if (!token) throw new Exception();

      await axiosInstance.post(`http://localhost:8080/comment/${postId}`,
        {
          comment: content
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setCommentCount(prevCount => prevCount + 1);
      if (inputCommentRef.current) {
        inputCommentRef.current.value = '';
      }
    } catch (error) {
      console.error("댓글 작성 실패:", error);
      alert('댓글 작성에 실패했습니다. 다시 시도해주세요.');
    }
  }

  useEffect(() => {
    if (postId) {
      reqGetPost();
    }
  }, [postId]); 

  const togglePublicState = () => {
    if (!checkOwner(post?.userId)) { 
        alert("게시물 소유자만 공개 상태를 변경할 수 있습니다.");
        return;
    }

    const toggle = !publicState;
    setPublicState(toggle); 
    reqUpdatePublicState(toggle);
  };

  const toggleLikeState = () => {
    if (!checkLoggedIn()) {
      if (confirm("로그인하시겠습니까?")) 
        navigate('/login');
        return; 
    }

    const toggle = !likeState;
    setLikeState(toggle); 
    reqUpdateLikeState(toggle);
  }

  const createCommentHandler = () => {
    if (!checkLoggedIn()) {
      if (confirm("로그인하시겠습니까?"))
        navigate('/login');
      return;
    }

    const commentContent = inputCommentRef.current.value;
    if (!commentContent.trim()) {
      alert("댓글 내용을 입력해주세요.");
      return;
    }

    if (!post || !post.postId) {
      console.error("게시물 정보가 없거나 postId가 없습니다.");
      return;
    }

    reqCreateComment(commentContent);
  }

  const decreaseCommentCount = () => {
    setCommentCount(prevCount => Math.max(0, prevCount - 1));
  };

  const checkLoggedIn = () => {
    const token = localStorage.getItem('token'); 

    if (!token) return false;

    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000);

      if (decodedToken.exp && decodedToken.exp > currentTime) {
        return true;
      } else {
        console.log('Token expired. Logging out.');
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
    return null;
  };

  const checkOwner = (authorId) => {
    const loggedInUserId = getLoggedInUserId();
    return loggedInUserId && loggedInUserId === authorId;
  };

  return (
    post === null ?
      <div className="loading_state">게시물을 불러오는 중입니다...</div> : ( 
        <>
          <div className="post_container">
            <div className="post_header">
              <h1 className="post_title">{post.title}</h1>
              <div className="profile_info_bar">
                <div className="profile_details">
                  <img className="profile_avatar" src={`/src/assets/images/profile/profile_${post.profileImg}.png`} alt="Profile Avatar" />
                  <span className="posted_by_text">Posted by <span className="author_name">{post.nickname}</span> · {new Date(post.createdAt).toLocaleString("ko-KR")}</span>
                </div>
                {
                  checkOwner(post.userId) ? (
                    <div className="actions_right">
                      <Link to="/chat">
                        <img className="notification_icon" src="/src/assets/icons/message-circle.png" alt="Notifications" />
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
              <div className="action_item" onClick={toggleLikeState}>
                {
                  likeState ?
                    (<img src="/src/assets/icons/full_heart.png" alt="Likes" className="action_icon" />) // Use imported image
                    : (<img src="/src/assets/icons/empty_heart.png" alt="Likes" className="action_icon" />) // Use imported image
                }
                <span className="action_count">{likeCount}</span>
              </div>
              <div className="action_item">
                <img src="/src/assets/icons/message-circle.png" alt="Comments" className="action_icon" />
                <span className="action_count">{commentCount}</span>
              </div>
            </div>

            <h3 className="comments_heading">{commentCount}개의 댓글</h3>

            <div className="comment_input_section">
              <textarea className="comment_textarea" placeholder="댓글을 작성하세요..." ref={inputCommentRef} />
              <button className="submit_comment_button" onClick={createCommentHandler}>댓글 작성</button>
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