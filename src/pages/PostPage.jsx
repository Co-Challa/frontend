import { Link, useParams, useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from 'react';

import { checkOwner, getLoggedInUserId } from "/src/utils/checkUser.js";
import { fetchPost, updatePublicState, updateLikeState, createComment } from "/src/apis/postApi";

import Comment from "/src/components/Comment";
import "./postPage.css";

export default function PostPage() {
  const { postId } = useParams();

  const navigate = useNavigate();
  const inputCommentRef = useRef("");  
  const [commentRefreshTrigger, setCommentRefreshTrigger] = useState(0);

  const [post, setPost] = useState(null);
  const [publicState, setPublicState] = useState(false);
  const [likeState, setLikeState] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);

  useEffect(() => {
    const initPost = async () => {
      try {
        if (postId != null) {
          const userId = getLoggedInUserId();
          
          const data = await fetchPost(postId, userId);

          console.log(data);
          
          setPost(data);
          setPublicState(data.isPublic);
          setLikeState(data.isLike);
          setLikeCount(data.likeCount);
          setCommentCount(data.commentCount);
        }
      } catch (error) {
        console.log(error);
      }
    }

    initPost();

  }, [postId]);

  const handleTogglePublic = () => {
    try {
      if (!postId)  throw new Error("postId is NULL");

      if (!checkOwner(post?.userId)) {
        alert("게시물 소유자만 공개 상태를 변경할 수 있습니다.");
        return;
      }

      const changedPublicValue = !publicState;

      updatePublicState(postId, changedPublicValue);

      setPublicState(changedPublicValue);

    } catch (error) {
      console.error("공개 상태 업데이트 실패:", error);

      alert('공개 상태 업데이트에 실패했습니다.');
    }
  };

  const handleToggleLike = async () => {
    try {
      if (!postId)  throw new Error("postId is NULL");

      if (getLoggedInUserId() == null) {
        if (confirm("로그인하시겠습니까?"))
          navigate('/login');
        return;
      }

      const changedLikeValue = !likeState;

      const likeCnt = await updateLikeState(postId, changedLikeValue);

      console.log("likeCnt : ", likeCnt);
      

      setLikeState(changedLikeValue);

      setLikeCount(likeCnt);
    } catch (error) {
      console.error("좋아요 업데이트 실패:", error);

      alert('좋아요 업데이트에 실패했습니다. 다시 시도해주세요.');
    }
  }

  const handleCreateComment = async () => {
    try {
      if (getLoggedInUserId() == null) {
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

      const commentCount = await createComment(postId, commentContent);

      setCommentRefreshTrigger(prev => prev + 1);

      setCommentCount(commentCount);

      if (inputCommentRef.current) {
        inputCommentRef.current.value = '';
      }
    } catch (error) {
      console.error("댓글 작성 실패:", error);
      alert('댓글 작성에 실패했습니다. 다시 시도해주세요.');
    }
  }

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
                        <input type="checkbox" checked={publicState} onChange={handleTogglePublic} />
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
              <div className="action_item" onClick={handleToggleLike}>
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
              <button className="submit_comment_button" onClick={handleCreateComment}>댓글 작성</button>
            </div>
          </div>

          <Comment
            postId={postId}
            setCommentCount={setCommentCount}
            commentRefreshTrigger={commentRefreshTrigger}
          />
        </>
      )
  );
}