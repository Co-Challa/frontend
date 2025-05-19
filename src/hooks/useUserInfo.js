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

    useEffect(() => {
        if (user === null) {
            setLoading(true);
            fetchUserById()
                .then((u) => {
                    setUser(u);
                    if (u.nickname != null) localStorage.setItem('nickname', u.nickname);
                    if (u.profile_img != null) localStorage.setItem('profile_img', String(u.profile_img));
                    if (u.res_time != null) localStorage.setItem('res_time', String(u.res_time));
                })
                .catch((err) => {
                    console.error('유저 정보 페칭 실패', err);
                    setError(err);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, []);

    return { user, loading, error };
}