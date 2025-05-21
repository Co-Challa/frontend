import { useState } from "react";

export default function ChatInput({ onSubmit, disabled }) {
  const [text, setText] = useState("");
  const maxLength = 500;

  const handleChange = (e) => {
    const input = e.target.value;
    if (input.length <= maxLength) {
      setText(input);
    }
  };

  const handleSubmit = () => {
    const trimmedText = text.trim();
    if (trimmedText.length === 0) {
      alert("내용을 입력해주세요.");
      return;
    }
    if (trimmedText.length > maxLength) {
      alert("최대 500자까지 입력할 수 있습니다.");
      return;
    }
    onSubmit(trimmedText);
    setText("");
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <textarea
        disabled={disabled}
        value={text}
        onChange={handleChange}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
          }
        }}
        placeholder="질문을 입력하세요"
        rows={4}
        cols={50}
      />
      <div>
        {text.length} / {maxLength}자
      </div>
      {!disabled && (
        <button type="submit" disabled={disabled}>
          질문하기
        </button>
      )}
    </form>
  );
}
