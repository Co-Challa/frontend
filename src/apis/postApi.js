import axiosInstance from "./instance";

export async function fetchPost(postId, userId) {
    const res = await axiosInstance.get(`http://localhost:8080/post/${postId}`,
        {
            params: { userId: userId }
        }
    );

    return res.data;
}

export async function updatePublicState(postId, isPublic) {
    const res = await axiosInstance.patch(`http://localhost:8080/post/${postId}`,
        {
            isPublic: isPublic
        }
    );
}

export async function updateLikeState(postId, isLike) {
    const res = await axiosInstance.post(`http://localhost:8080/like/${postId}`,
        {
            isLike: isLike
        }
    );

    return res.data;
}

export async function fetchComments(postId, offset, limit) {
    const res = await axiosInstance.get(`http://localhost:8080/comment/list`, {
        params: { postId, offset, limit },
    });

    return res.data;
};

export async function createComment(postId, content) {

    const res = await axiosInstance.post(`http://localhost:8080/comment/${postId}`,
        {
            comment: content
        }
    );

    return res.data;
}

export async function deleteComment(commentId) {

    const res = await axiosInstance.delete(`http://localhost:8080/comment/${commentId}`);

    return res.data;
}