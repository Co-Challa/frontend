import axiosInstance from './instance';

export async function fetchUserById() {
    const userId = localStorage.getItem('user_id');
    if (!userId) {
        throw new Error('user_id가 로컬스토리지에 없습니다.');
    }

    const { data } = await axiosInstance.get(`/user/${userId}`);
    return data;
}