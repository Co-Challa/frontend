export default function ChatLoading() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        padding: "2rem",
        color: "#666",
        fontFamily: "sans-serif",
      }}
    >
      <div
        className="spinner"
        style={{
          width: "40px",
          height: "40px",
          border: "4px solid #ccc",
          borderTop: "4px solid #333",
          borderRadius: "50%",
          animation: "spin 1s linear infinite",
          marginBottom: "1rem",
        }}
      ></div>
      <p>답변을 불러오고 있어요... 잠시만 기다려주세요.</p>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
