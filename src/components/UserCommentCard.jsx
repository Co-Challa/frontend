import "./UserCommentCard.css";
import trashIcon from "../assets/icons/trash.png";

export default function UserCommentCard({ comment }) {
  const {
    post_id,
    nickname,
    post_title,
    comment_id,
    comment: content,
    created_at,
  } = comment;

  const formattedDate = new Date(created_at).toISOString().slice(0, 10);

  return (
    <div className="usercomment_card">
      <div className="usercomment_content">{content}</div>
      <span className="usercomment_date">{formattedDate}</span>
      <div className="usercomment_info">
        Posted by <span className="post_nickname">{nickname}</span> •{" "}
        <span>{post_title}</span>
      </div>
      <button className="usercomment_delete">
        <img src={trashIcon} alt="삭제" />
      </button>
    </div>
  );
}
