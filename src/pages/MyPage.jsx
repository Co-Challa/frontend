import React, { useState } from 'react';
import './Mypage.css'
import useUserInfo from '../hooks/useUserInfo';
import MyPageHeader from '../components/MypageHeader';
import MyPageNav from '../components/MyPageNav';

import { fetchUserPosts } from '../apis/userApi';
import useInfiniteList from '../hooks/useInfiniteList';
import UserPostCard from '../components/UserPostCard';

export default function MyPage() {
  const { user, loading, error } = useUserInfo();
  const [activeTab, setActiveTab] = useState('내 게시글');
  const tabs = ['내 게시글', '관심 게시글', '내 댓글'];

  const {
    items: posts,
    hasMore: postsHasMore,
    loading: postsLoading,
    lastRef: postsLastRef
  } = useInfiniteList(fetchUserPosts, 10);

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
        {activeTab === '내 게시글' && (
          <div className="userpost_list">
            {posts.map((post, i) =>
              i === posts.length - 1 ? (
                <div key={post.post_id} ref={postsLastRef}>
                  <UserPostCard post={post} />
                </div>
              ) : (
                <UserPostCard key={post.post_id} post={post} />
              )
            )}
            {postsLoading && <div className="loading">로딩 중...</div>}
            {!postsHasMore && <div className="end">모든 게시물을 불러왔습니다</div>}
          </div>
        )}

        {activeTab === '관심 게시글' && <div>관심 게시글 리스트</div>}
        {activeTab === '내 댓글' && <div>내 댓글 리스트</div>}
      </section>
    </div>
  );
}
