import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./userCommentCard.css";
import trashIcon from "../assets/icons/trash.png";
import { deleteComment } from "../apis/userApi";

export default function UserCommentCard({ comment, onDelete }) {
  const navigate = useNavigate();
  const {
    comment_id,
    post_id,
    post_author_nickname,
    post_title,
    comment: content,
    created_at,
  } = comment;

  const [showModal, setShowModal] = useState(false);
  const formattedDate = created_at
    ? new Date(created_at).toISOString().slice(0, 10)
    : "";

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    setShowModal(true);
  };

  const confirmDelete = async (e) => {
    e.stopPropagation();
    try {
      await deleteComment(comment_id);
      onDelete?.(comment_id);
      setShowModal(false);
    } catch (error) {
      console.error("댓글 삭제 실패:", error);
      alert("댓글 삭제에 실패했습니다.");
    }
  };

  const cancelDelete = (e) => {
    e.stopPropagation();
    setShowModal(false);
  };

  const handleCardClick = () => {
    navigate(`/post/${post_id}`);
  };

  return (
    <>
      <div className="usercomment_card" onClick={handleCardClick}>
        <div className="usercomment_content">{content}</div>
        <span className="usercomment_date">{formattedDate}</span>
        <div className="usercomment_info">
          Posted by <span className="post_nickname">{post_author_nickname}</span> • {post_title}
        </div>
        <button
          className="usercomment_delete"
          onClick={handleDeleteClick}
          type="button"
        >
          <img src={trashIcon} alt="삭제" />
        </button>
      </div>

      {showModal && (
        <div className="modal_overlay" onClick={cancelDelete}>
          <div className="modal_box" onClick={(e) => e.stopPropagation()}>
            <p>정말 삭제하시겠습니까?</p>
            <div className="modal_buttons">
              <button className="btn_cancel" onClick={cancelDelete}>
                취소
              </button>
              <button className="btn_confirm" onClick={confirmDelete}>
                확인
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
