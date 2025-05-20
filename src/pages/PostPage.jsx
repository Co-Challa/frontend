import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';

import axios from 'axios';
import Comment from "../components/common/Comment";
import "./postPage.css";

export default function PostPage() {
  const [postInfo, setPostInfo] = useState(null);

  useEffect(() => {
    const req = async (postId) => {
      try {
        const res = await axios.get(`http://localhost:8080/post/1`);
        const data = res.data;

        setPostInfo(data);

      } catch (error) {
        console.log(error);
      }
    };

    // API 요청
    req();
  }, []);

  return (
    postInfo == null ?
      (<h1 className="post_container"> Loading... </h1>)
      : (
        <>
          <div className="post_container">
            <div className="post_header">
              <h1 className="post_title">{postInfo.post.title}</h1>
              <div className="profile_info_bar">
                <div className="profile_details">
                  <img className="profile_avatar" src="src\assets\images\profile\profile_1.png" alt="Profile Avatar" />
                  <span className="posted_by_text">Posted by <span className="author_name">{postInfo.post.nickname}</span> · {new Date(postInfo.post.createdAt).toLocaleString("ko-KR")}</span>
                </div>
                <div className="actions_right"> {/* 작성자이면, 보이기 */}
                  <Link to="/chat">
                    <img className="notification_icon" src="src\assets\icons\message-circle.png" alt="Notifications" />
                  </Link>
                  <label className="toggle_switch">
                    <input type="checkbox" />
                    <span className="slider round"></span>
                  </label>
                </div>
              </div>
            </div>

            <div className="post_section">
              {postInfo.post.content}
            </div>

            <div className="post_actions_summary">
              <label className="action_item">
                <input type="checkbox" />
                <img src="src\assets\icons\empty_heart.png" alt="Likes" className="action_icon" />
                <img src="src\assets\icons\full_heart.png" alt="Likes" className="action_icon" />
                <span className="action_count">{postInfo.post.totalLikeCnt}</span>
              </label>
              <label className="action_item">
                <input type="checkbox" />
                <img src="src/assets/icons/message-circle.png" alt="Comments" className="action_icon" />
                <span className="action_count">{postInfo.post.totalCommentCnt}</span>
              </label>
            </div>

            <h3 className="comments_heading">{postInfo.post.totalCommentCnt}개의 댓글</h3>

            <div className="comment_input_section">
              <textarea className="comment_textarea" placeholder="댓글을 작성하세요..."></textarea>
              <button className="submit_comment_button">댓글 작성</button>
            </div>
          </div><Comment comments={postInfo.comments} />
        </>
      )
  );
}
