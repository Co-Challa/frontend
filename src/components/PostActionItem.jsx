import { updateLikeState } from "/src/apis/postApi";
import { getLoggedInUserId } from "/src/utils/checkUser.js";
import { useNavigate } from "react-router-dom"; 

import "./postActionItem.css";

export default function PostActionItem({
    post,
    likeState,
    setLikeState,
    likeCount,
    setLikeCount,
    commentCount
}) {
    const navigate = useNavigate();

    const handleToggleLike = async () => {
        try {
            if (!post || !post.postId) throw new Error("postId is NULL");

            if (getLoggedInUserId() == null) {
                if (confirm("로그인하시겠습니까?"))
                    navigate('/login');
                return;
            }

            const changedLikeValue = !likeState;
            const newLikeCount = await updateLikeState(post.postId, changedLikeValue);

            setLikeState(changedLikeValue);
            setLikeCount(newLikeCount);

        } catch (error) {
            console.error("좋아요 업데이트 실패:", error);
            alert('좋아요 업데이트에 실패했습니다. 다시 시도해주세요.');
        }
    }    

    return (
        <>
            <div className="post_actions_summary">
                <div className="action_item" onClick={handleToggleLike}>
                    {
                        likeState ?
                            (<img src="/src/assets/icons/full_heart.png" alt="Likes" className="action_icon" />)
                            : (<img src="/src/assets/icons/empty_heart.png" alt="Likes" className="action_icon" />)
                    }
                    <span className="action_count">{likeCount}</span>
                </div>
                <div className="action_item">
                    <img src="/src/assets/icons/message-circle.png" alt="Comments" className="action_icon" />
                    <span className="action_count">{commentCount}</span>
                </div>
            </div>
        </>
    );
}