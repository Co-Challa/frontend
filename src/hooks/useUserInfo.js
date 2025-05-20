import { useState, useEffect } from 'react';
import { fetchUserById } from '../apis/userApi';

export default function useUserInfo() {
    const [user, setUser] = useState(() => {
        const nickname = localStorage.getItem('nickname');
        const profileImg = localStorage.getItem('profile_img');
        const resTime = localStorage.getItem('res_time');
        const userId = localStorage.getItem('user_id');
        if (nickname && profileImg && resTime && userId) {
            return {
                user_id: userId,
                nickname,
                profile_img: Number(profileImg),
                res_time: Number(resTime),
            };
        }
        return null;
    });

    const [loading, setLoading] = useState(user === null);
    const [error, setError] = useState(null);

    const refetch = async () => {
        setLoading(true);
        try {
            const u = await fetchUserById();
            setUser(u);
        } catch (err) {
            console.error('유저 정보 페칭 실패', err);
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user === null) {
            setLoading(true);
            fetchUserById()
                .then((u) => {
                    setUser(u);
                })
                .catch((err) => {
                    console.error('유저 정보 페칭 실패', err);
                    setError(err);
                })
                .finally(() => {
                    setLoading(false);
                });
        }

        if (user === null) {
            refetch();
        }
    }, []);

    return { user, loading, error, refetch };
}