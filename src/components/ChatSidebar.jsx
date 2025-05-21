import { useNavigate } from "react-router-dom";

export default function ChatSidebar({
  list,
  selectedChatId,
  onSelect,
  currentLatestChatId,
}) {
  const navigate = useNavigate();

  if (!list) return null;
  if (list.length === 0) return <div>채팅이 없습니다</div>;

  const handleSelect = (chatId) => {
    onSelect(chatId);
    chatId === currentLatestChatId
      ? navigate("/chat")
      : navigate(`/chat?chatId=${chatId}`);
  };

  return (
    <ul>
      {list.map((chat) => (
        <li
          key={chat.chatId}
          onClick={() => handleSelect(chat.chatId)}
          style={{
            background: chat.chatId === selectedChatId ? "red" : "gray",
          }}
        >
          {chat.summaryTitle || "제목 없음"}
        </li>
      ))}
    </ul>
  );
}
