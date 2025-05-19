import "./postPage.css";

export default function PostPage() {
  return (
    <>
      <div className="post_container">
        <div className="post_header">
          <h1 className="post_title">제목</h1>
          <div class="profile_info_bar">
            <div class="profile_details">
                <img class="profile_avatar" src="src\assets\images\profile\profile_1.png" alt="Profile Avatar" />
                <span class="posted_by_text">Posted by <span class="author_name">홍길동</span> · 2024-05-24</span>
            </div>
            <div class="actions_right">
                <img class="notification_icon" src="src\assets\icons\message-circle.png" alt="Notifications" />
                <label class="toggle_switch">
                  <input type="checkbox" />
                  <span class="slider round"></span>
                </label>
            </div>
        </div>
        </div>

        <div className="post_section">
          <p className="section_paragraph">
            내용 1
          </p>
          <div className="code_block">
            코드 1
          </div>
        </div>

        <div className="post_section">
          <p className="section_paragraph">
            내용 2
          </p>
          <ul>
            <li>리스트 1</li>
            <li>리스트 2</li>
            <li>리스트 3</li>
          </ul>
        </div>

        <div className="post_section">
          <h2 className="section_heading">강조</h2>
          <div className="code_block">
            코드2
          </div>
          <p className="section_paragraph">
            내용 3
          </p>
        </div>

        <div className="tip_section">
          <p className="tip_title">
            <span className="tip_label">Tip: </span>팁 제목
          </p>
          <p className="tip_content">
            팁 내용
          </p>
          <div className="code_block">
            코드 3
          </div>
        </div>

        <div class="post_actions_summary">
          <label class="action_item">
            <input type="checkbox" />
            <img src="src\assets\icons\empty_heart.png" alt="Likes" class="action_icon" />
            <span class="action_count">3,120</span>
          </label>
          <label class="action_item">
            <input type="checkbox" />
              <img src="src/assets/icons/message-circle.png" alt="Comments" class="action_icon" />
              <span class="action_count">58</span>
          </label>
        </div>

        <h3 class="comments_heading">4개의 댓글</h3>

        <div class="comment_input_section">
            <textarea class="comment_textarea" placeholder="댓글을 작성하세요..."></textarea>
            <button class="submit_comment_button">댓글 작성</button>
        </div>
      </div>
    </>
  );
}
