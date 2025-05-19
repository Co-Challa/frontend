import React, { useState } from 'react';
import useUserInfo from '../hooks/useUserInfo';
import MyPageHeader from '../components/MypageHeader';
import MyPageNav from '../components/MyPageNav';

export default function MyPage() {
  const { user, loading, error } = useUserInfo();
  const [activeTab, setActiveTab] = useState('내 게시글');
  const tabs = ['내 게시글', '관심 게시글', '내 댓글'];

  if (loading) return <div>로딩 중...</div>;
  if (error)   return <div>오류 발생</div>;

  return (
    <div className="mypage">
      <MyPageHeader user={user} />

      <MyPageNav
        tabs={tabs}
        activeTab={activeTab}
        onChange={setActiveTab}
      />

      <section>
        {activeTab === '내 게시글' && <div>내 게시글 리스트</div>}
        {activeTab === '관심 게시글' && <div>관심 게시글 리스트</div>}
        {activeTab === '내 댓글' && <div>내 댓글 리스트</div>}
      </section>
    </div>
  );
}
