import { useState } from "react";
import "./userCommentCard.css";
import trashIcon from "../assets/icons/trash.png";

export default function UserCommentCard({ comment, onDelete }) {
  const {
    comment_id,
    post_author_nickname,
    post_title,
    comment: content,
    created_at,
  } = comment;
  
  const [showModal, setShowModal] = useState(false);
  const formattedDate = new Date(created_at).toISOString().slice(0, 10);

  const handleDeleteClick = () => {
    setShowModal(true);
  };

  const confirmDelete = () => {
    onDelete?.(comment_id);
    setShowModal(false);
  };

  const cancelDelete = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className="usercomment_card">
        <div className="usercomment_content">{content}</div>
        <span className="usercomment_date">{formattedDate}</span>
        <div className="usercomment_info">
          Posted by <span className="post_nickname">{post_author_nickname}</span> •{" "}
          <span>{post_title}</span>
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
        <div className="modal_overlay">
          <div className="modal_box">
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