import axiosInstance from "./instance";

export async function fetchPost(postId, userId) {
    const res = await axiosInstance.get(`/post/${postId}`,
        {
            params: { userId: userId }
        }
    );

    return res.data;
}

export async function updatePublicState(postId, isPublic) {
    const res = await axiosInstance.patch(`/post/${postId}`,
        {
            isPublic: isPublic
        }
    );
    
}

export async function updateLikeState(postId, isLike) {
    const res = await axiosInstance.post(`/like/${postId}`,
        {
            isLike: isLike
        }
    );

    return res.data;
}

export async function fetchComments(postId, offset, limit) {
    const res = await axiosInstance.get(`/comment/list`, {
        params: { postId, offset, limit },
    });

    return res.data;
};

export async function createComment(postId, content) {

    const res = await axiosInstance.post(`/comment/${postId}`,
        {
            comment: content
        }
    );

    return res.data;
}

export async function deleteComment(commentId) {

    const res = await axiosInstance.delete(`/comment/${commentId}`);

    return res.data;
}