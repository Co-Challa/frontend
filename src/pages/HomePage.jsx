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
    try {
      const res = await axios.get("http://localhost:8080/post/list");
      setPosts(res.data);
    } catch (error) {
      console.error("API 실패, 더미 데이터 사용");
      setPosts([
        {
          id: 1,
          userImage: "/profile1.png",
          nickname: "백업유저",
          createdAt: "2025-05-20T12:00:00Z",
          title:"제목제목입니다.",
          content: "따스한 봄날, 햇살은 나뭇잎 사이로 스며들어 땅 위에 부드러운 그바람을 타고 들려오는 새들의 지저귐은 이 풍경의 배경음처럼 완벽하게 어우러진다. 강가에는 잔잔한 물결이 햇빛을 받아 반짝이고, 그 물소리에 귀를 기울이면 하루의 번잡함이 씻겨 내려가는 듯한 기분이 든다. 근처 나무 아래 앉아 책을 펼치면, 활자 너머로 자연의 풍경이 스며들어 마치 책 속 이야기가 현실이 된 듯한 착각에 빠지기도 한다. 아이들은 잔디밭에서 웃으며 뛰어놀고, 반려견과 산책을 나온 사람림자를 드리운다. 잔잔한 바람이 불어오면 초록빛 풀잎이 서로 몸을 부딪치며 바스락거린다. 그 소리는 마치 자연의 속삭임 같고, 도심의 소음을 잊게 해주는 고요한 위로처럼 다가온다. 한적한 산책로를 걷다 보면 이름 모를 들꽃들이 수줍은 얼굴을 내밀고, 그 곁에는 나비가 살며시 내려앉는다. 코끝을 간지럽히는 풀냄새와 흙냄새는 마음을 맑게 해주고, 따뜻한 햇볕 아래 반쯤 감긴 눈은 잠시 현실에서 멀어진다. ",
          likescount: 3,
          commentscount: 6,
        },
        {
          id: 2,
          userImage: "/profile2.png",
          nickname: "user2",
          createdAt: "2025-05-20T12:00:00Z",
          title:"이것도 제목이다",
          content: "따스한 봄날, 햇살은 나뭇잎 사이로 스며들어 땅 위에 부드러운 그바람을 타고 들려오는 새들의 지저귐은 이 풍경의 배경음처럼 완벽하게 어우러진다. 강가에는 잔잔한 물결이 햇빛을 받아 반짝이고, 그 물소리에 귀를 기울이면 하루의 번잡함이 씻겨 내려가는 듯한 기분이 든다. 근처 나무 아래 앉아 책을 펼치면, 활자 너머로 자연의 풍경이 스며들어 마치 책 속 이야기가 현실이 된 듯한 착각에 빠지기도 한다. 아이들은 잔디밭에서 웃으며 뛰어놀고, 반려견과 산책을 나온 사람림자를 드리운다. 잔잔한 바람이 불어오면 초록빛 풀잎이 서로 몸을 부딪치며 바스락거린다. 그 소리는 마치 자연의 속삭임 같고, 도심의 소음을 잊게 해주는 고요한 위로처럼 다가온다. 한적한 산책로를 걷다 보면 이름 모를 들꽃들이 수줍은 얼굴을 내밀고, 그 곁에는 나비가 살며시 내려앉는다. 코끝을 간지럽히는 풀냄새와 흙냄새는 마음을 맑게 해주고, 따뜻한 햇볕 아래 반쯤 감긴 눈은 잠시 현실에서 멀어진다. ",
          likescount: 3,
          commentscount: 6,
        },
      ]);
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
