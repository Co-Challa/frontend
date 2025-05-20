import axiosInstance from './instance';

export async function fetchUserById() {
    const userId = localStorage.getItem('user_id');
    if (!userId) {
        throw new Error('user_id가 로컬스토리지에 없습니다.');
    }

    const { data } = await axiosInstance.get(`/user/${userId}`);
    return data;
}

export async function fetchUserPosts(offset, limit) {
    const userId = localStorage.getItem('user_id');
    if (!userId) {
        throw new Error('user_id가 로컬스토리지에 없습니다.');
    }

    const { data } = await axiosInstance.get(`/user/list/${userId}`, {
        params: { offset, limit },
    });
    return data;
}

export async function fetchUserLiked(offset, limit) {
    const userId = localStorage.getItem('user_id');
    if (!userId) {
        throw new Error('user_id가 로컬스토리지에 없습니다.');
    }

    const { data } = await axiosInstance.get(`/user/liked/${userId}`, {
        params: { offset, limit },
    });
    return data;
}

export async function fetchUserComments(offset, limit) {
    const userId = localStorage.getItem('user_id');
    if (!userId) {
        throw new Error('user_id가 로컬스토리지에 없습니다.');
    }

    const { data } = await axiosInstance.get(`/user/comment/${userId}`, {
        params: { offset, limit },
    });
    return data;
}

export async function updateUserInfo(updatedInfo) {
  const userId = localStorage.getItem("user_id");
  if (!userId) {
    throw new Error("user_id가 로컬스토리지에 없습니다.");
  }

  const { data } = await axiosInstance.post(`/user/update/${userId}`, updatedInfo, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return data;
}