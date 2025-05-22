import axiosInstance from './instance';

export async function fetchUserById() {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('토큰이 로컬스토리지에 없습니다.');
    }

    const { data } = await axiosInstance.get("/user/me", {
    });
    return data;
}

export async function fetchUserPosts(offset, limit) {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('accessToken이 없습니다.');
    }
    const { data } = await axiosInstance.get('/user/posts', {
        params: { offset, limit }
    });

    return data;
}

export async function fetchUserLiked(offset, limit) {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('accessToken이 없습니다.');
    }
    const { data } = await axiosInstance.get('/user/liked', {
        params: { offset, limit }
    });
    return data;
}

export async function fetchUserComments(offset, limit) {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('accessToken이 없습니다.');
    }
    const { data } = await axiosInstance.get('/user/comments', {
        params: { offset, limit }
    });
    return data;
}

export async function updateUserInfo(updatedInfo) {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('accessToken이 없습니다.');
    }
    await axiosInstance.post('/user/update', updatedInfo);
}

export async function updatePostVisibility(postId, isPublic) {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('accessToken이 없습니다.');
    }

    await axiosInstance.patch(`/post/${postId}`,
        {
            isPublic: isPublic
        }
    );
}

export async function togglePostLike(postId, liked) {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('accessToken이 없습니다.');
    }

    await axiosInstance.post(`/like/${postId}`,
        {
            isLike: liked
        }
    );
}

export async function deleteComment(commentId) {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('accessToken이 없습니다.');
    }

    await axiosInstance.delete(`/comment/${commentId}`);
}