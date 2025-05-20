import React, { useEffect, useState } from "react";
import axios from "axios";
import MainPost from "../components/common/MainPost";

export default function HomePage() {

  const[posts,setPosts] = useState([]);

  useEffect(() => {
  const fetchPosts = async () => {
    try {const res = await axios.get("http://localhost:8080/api/posts");
    setPosts(res.data);
    } catch (error) {
      console.error("게시글 불러오기 실패",error)
    }
  };

  fetchPosts();
}, []);

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-xl font-bold">📌 최신 게시글</h2>
      {posts.map((post) => (
        <MainPost key={post.id} post={post} />
      ))}
    </div>
  );
}
