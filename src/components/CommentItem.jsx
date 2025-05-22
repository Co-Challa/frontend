
import { checkOwner } from "/src/utils/checkUser.js";
import { deleteComment } from "/src/apis/postApi.js";

import "./commentItem.css";

export default function CommentItem({ ref, comment, setCommentCount, reset }) {

  const handleDeleteComment = async () => {
    try {
      if (!comment.commentId) throw new Error("commentId is NULL");

      if (!checkOwner(comment.userId)) {
        alert("삭제 권한이 없습니다.")
        return;
      }

      const commentCount = await deleteComment(comment.commentId);

      if (setCommentCount) {
        setCommentCount(commentCount);
      }

      if (reset) {
        reset();
      }

    } catch (error) {
      console.error('Delete Comment Error : ', error);

      alert('댓글 삭제에 실패했습니다. 다시 시도해주세요.');
    }
  }

  return (
    <>
      <div className="comment_item" ref={ref}>
        <div className="comment_meta">
          <img className="user_avatar" src={`/src/assets/images/profile/profile_${comment.profileImg}.png`} alt="User Avatar" />
          <span className="comment_author">{comment.nickname}</span>
          {
            checkOwner(comment.userId) ? (
              <button className="delete_comment_button" aria-label="Delete comment"
                onClick={handleDeleteComment}>
                <img src="/src/assets/icons/trash.png" alt="Delete" className="delete_icon" />
              </button>
            ) : null
          }
        </div>
        <p className="comment_content">{comment.content}</p>
        <span className="comment_date">{new Date(comment.createdAt).toLocaleString("ko-KR")}</span>
      </div>
    </>
  );
}