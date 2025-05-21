import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ChatSidebar from "../components/ChatSidebar";
import ChatWindow from "../components/ChatWindow";
import axiosInstance from "../apis/instance";

export default function ChatPage() {
  const [chatHistoryList, setChatHistoryList] = useState(null);
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [latestChatId, setLatestChatId] = useState(null);
  const [searchParams] = useSearchParams();
  const paramChatId = searchParams.get("chatId");

  // 채팅 목록 불러오기
  useEffect(() => {
    const fetchChatList = async () => {
      try {
        const res = await axiosInstance.get("/chat/list");
        // console.log("채팅 목록:", res.data);
        setChatHistoryList(res.data);
        if (res.data.length > 0) {
          setLatestChatId(res.data[0].chatId); // 첫 번째 채팅을 최신 채팅으로 간주
        }
      } catch (error) {
        console.error("채팅 목록 불러오기 실패", error);
      }
    };

    fetchChatList();
  }, []);

  const chatIdToFetch = paramChatId || selectedChatId || latestChatId;

  return (
    <main>
      <nav aria-label="지난 기록">
        <ChatSidebar
          list={chatHistoryList}
          selectedChatId={selectedChatId}
          onSelect={setSelectedChatId}
          currentLatestChatId={latestChatId}
        />
      </nav>
      <section>
        <ChatWindow chatId={chatIdToFetch} />
      </section>
    </main>
  );
}
