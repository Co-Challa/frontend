import axiosInstance from "./instance";

export async function fetchPost(postId, userId) {
    try {
        const res = await axiosInstance.get(`http://localhost:8080/post/${postId}`, 
            {
                params : {userId : userId}
            }
        );
        
        return res.data;

    } catch (error) {
        console.log(error);
    }
}

export async function updatePublicState(postId, isPublic) {
    try {
        if (!postId)  throw new Error("postId is NULL");

        const token = localStorage.getItem('token');

        if (!token) throw new Error("Token이 존재하지 않습니다.");

        const res = await axiosInstance.patch(`http://localhost:8080/post/${postId}`,
            {
                isPublic: isPublic
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

    } catch (error) {
        console.error("공개 상태 업데이트 실패:", error);
        alert('공개 상태 업데이트에 실패했습니다.');
    }
}

export async function updateLikeState(postId, isLike) {
    try {
        if (!postId)  throw new Error("postId is NULL");

        const token = localStorage.getItem('token');

        if (!token) throw new Error("Token이 존재하지 않습니다.");

        const res = await axiosInstance.post(`http://localhost:8080/like/${postId}`,
            {
                isLike: isLike
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        return res.data;

    } catch (error) {
        console.error("좋아요 업데이트 실패:", error);
        alert('좋아요 업데이트에 실패했습니다. 다시 시도해주세요.');
    }
}

export async function createComment(postId, content) {
    try {
        const token = localStorage.getItem('token');

        if (!token) throw new Error("Token이 존재하지 않습니다.");

        await axiosInstance.post(`http://localhost:8080/comment/${postId}`,
            {
                comment: content
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

    } catch (error) {
        console.error("댓글 작성 실패:", error);
        alert('댓글 작성에 실패했습니다. 다시 시도해주세요.');
    }
}

export async function fetchComments(postId, offset, limit) {
    try {
        const res = await axiosInstance.get(`http://localhost:8080/comment/list`, {
            params: { postId, offset, limit },
        });

        return res.data;

    } catch (error) {
        console.log(error);
    }
};

export async function deleteComment(commentId) {
    try {
        const token = localStorage.getItem('token');

        if (!token) throw new Error("Token이 존재하지 않습니다.");

        const res = await axiosInstance.delete(`http://localhost:8080/comment/${commentId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

    } catch (error) {
        console.log(error);
        alert('댓글 삭제에 실패했습니다. 다시 시도해주세요.');
    }
}