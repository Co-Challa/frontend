import "./comment.css";

export default function Comment() {
  return (
    <>
      <div class="comment_list">
        <div class="comment_item">
          <div class="comment_meta">
            {/* Added user_avatar here */}
            <img class="user_avatar" src="src\assets\images\profile\profile_1.png" alt="User Avatar" />
            <span class="comment_author">저속이</span>
            <button class="delete_comment_button" aria-label="Delete comment">
              <img src="path/to/trash_icon.png" alt="Delete" class="delete_icon" />
            </button>
          </div>
          <p class="comment_content">이 설명 정말 고마워요! 예전에 이 문제를 겪었는데 어떤 방식이 가장 좋은지 확신이 없었거든요. 이번 설명이 정말 도움이 됐어요</p>
          <span class="comment_date">2025-03-28 01:28</span>
        </div>

        <div class="comment_item">
          <div class="comment_meta">
            {/* Added user_avatar here */}
            <img class="user_avatar" src="src\assets\images\profile\profile_1.png" alt="User Avatar" />
            <span class="comment_author">나는 단무지</span>
            {/* No delete button for this example if it's not the user's comment */}
          </div>
          <p class="comment_content">너무 좋은 글입니다.</p>
          <span class="comment_date">2025-03-28 01:28</span>
        </div>

      </div>
    </>
  );
}