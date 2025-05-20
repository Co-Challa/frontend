import React, { useEffect, useState } from "react";
import axios from "axios";
import "./homePage.css";
import MainPost from "../components/MainPost";

export default function HomePage() {
  const[posts,setPosts] = useState([]);
  //posts : 현재 화면에 보여줄 게시글 목록을 담는 변수 
  // setPosts : 값을 바꿀 때 쓰는 함수
  //useState([]) : 초기값을 빈 배열로 설정했다는 뜻

  useEffect(() => {
  const fetchPosts = async () => {
    try {const res = await axios.get("http://localhost:8080/post/list");
    setPosts(res.data);
    } catch (error) {
      console.error("게시글 불러오기 실패",error)
    }
  };

  fetchPosts();
}, []);

  return (
    <div className="new_posts">
      {posts.map((post) => (
        <MainPost key={post.id} post={post} />
      ))}
    </div>
  );
}
