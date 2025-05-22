import axiosInstance from './instance';

function ensureAuth() {
  const token = localStorage.getItem('token');
  if (!token) {
    window.location.href = '/login';
    return null;
  }
  return token;
}

export async function fetchUserById() {
  const token = ensureAuth();
  if (!token) return;
  const { data } = await axiosInstance.get('/user/me', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
}

export async function fetchUserPosts(offset, limit) {
  const token = ensureAuth();
  if (!token) return;
  const { data } = await axiosInstance.get('/user/posts', {
    headers: { Authorization: `Bearer ${token}` },
    params: { offset, limit },
  });
  return data;
}

export async function fetchUserLiked(offset, limit) {
  const token = ensureAuth();
  if (!token) return;
  const { data } = await axiosInstance.get('/user/liked', {
    headers: { Authorization: `Bearer ${token}` },
    params: { offset, limit },
  });
  return data;
}

export async function fetchUserComments(offset, limit) {
  const token = ensureAuth();
  if (!token) return;
  const { data } = await axiosInstance.get('/user/comments', {
    headers: { Authorization: `Bearer ${token}` },
    params: { offset, limit },
  });
  return data;
}

export async function updateUserInfo(updatedInfo) {
  const token = ensureAuth();
  if (!token) return;
  await axiosInstance.post('/user/update', updatedInfo, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
}

export async function updatePostVisibility(postId, isPublic) {
  const token = ensureAuth();
  if (!token) return;
  await axiosInstance.patch(
    `/post/${postId}`,
    { isPublic },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
  );
}

export async function togglePostLike(postId, liked) {
  const token = ensureAuth();
  if (!token) return;
  await axiosInstance.post(
    `/like/${postId}`,
    { isLike: liked },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
  );
}

export async function deleteComment(commentId) {
  const token = ensureAuth();
  if (!token) return;
  await axiosInstance.delete(`/comment/${commentId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}