import axiosInstance from './instance';

export async function fetchUserById() {
    const token = localStorage.getItem('accessToken');
    if (!token) {
        throw new Error('토큰이 로컬스토리지에 없습니다.');
    }

    const { data } = await axiosInstance.get("/user/me", {
        headers: { Authorization: `Bearer ${token}` }
    });
    return data;
}

export async function fetchUserPosts(offset, limit) {
    const token = localStorage.getItem('accessToken');
    if (!token) {
        throw new Error('accessToken이 없습니다.');
    }
    const { data } = await axiosInstance.get('/user/posts', {
        headers: { Authorization: `Bearer ${token}` },
        params: { offset, limit }
    });
    return data;
}

export async function fetchUserLiked(offset, limit) {
    const token = localStorage.getItem('accessToken');
    if (!token) {
        throw new Error('accessToken이 없습니다.');
    }
    const { data } = await axiosInstance.get('/user/liked', {
        headers: { Authorization: `Bearer ${token}` },
        params: { offset, limit }
    });
    return data;
}

export async function fetchUserComments(offset, limit) {
    const token = localStorage.getItem('accessToken');
    if (!token) {
        throw new Error('accessToken이 없습니다.');
    }
    const { data } = await axiosInstance.get('/user/comments', {
        headers: { Authorization: `Bearer ${token}` },
        params: { offset, limit }
    });
    return data;
}

export async function updateUserInfo(updatedInfo) {
    const token = localStorage.getItem('accessToken');
    if (!token) {
        throw new Error('accessToken이 없습니다.');
    }
    await axiosInstance.post('/user/update', updatedInfo, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });
}

export async function updatePostVisibility(postId, isPublic) {
    const token = localStorage.getItem('accessToken');
    if (!token) {
        throw new Error('accessToken이 없습니다.');
    }

    const rawValue = isPublic ? 1 : 0;

    await axiosInstance.patch(`/post/${postId}`, rawValue, {
        headers: {
            Authorization: `Bearer ${token}`
        },
    });
}

export async function togglePostLike(postId, liked) {
    const token = localStorage.getItem('accessToken');
    if (!token) {
        throw new Error('accessToken이 없습니다.');
    }

    const value = liked ? 1 : 0;

    await axiosInstance.post(`/like/${postId}`, value, {
        headers: {
            Authorization: `Bearer ${token}`
        },
    });
}

export async function deleteComment(commentId) {
    const token = localStorage.getItem('accessToken');
    if (!token) {
        throw new Error('accessToken이 없습니다.');
    }

    await axiosInstance.delete(`/comment/${commentId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}