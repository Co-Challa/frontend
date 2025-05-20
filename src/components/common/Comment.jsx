import "./comment.css";

export default function Comment({ comments }) {
  console.log(comments);

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
                  <button className="delete_comment_button" aria-label="Delete comment">
                    <img src="src\assets\icons\trash.png" alt="Delete" className="delete_icon" />
                  </button>
                </div>
                <p className="comment_content">{comment.content}</p>
                <span className="comment_date">{new Date(comment.createdAt).toLocaleString("ko-KR")}</span>
              </div>
            )
          })
        }
      </div>
    </>
  );
}