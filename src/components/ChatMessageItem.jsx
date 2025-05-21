import ReactMarkdown from "react-markdown";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { github } from "react-syntax-highlighter/dist/esm/styles/hljs";
import js from "react-syntax-highlighter/dist/esm/languages/hljs/javascript";

SyntaxHighlighter.registerLanguage("javascript", js);

export default function ChatMessageItem({ role, content, timestamp }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: role === "user" ? "flex-end" : "flex-start",
        margin: "8px 0",
      }}
    >
      <div
        style={{
          backgroundColor: role === "user" ? "#DCF8C6" : "",
          padding: "10px 15px",
          borderRadius: "10px",
          margin: "20px",
          wordBreak: "break-word",
        }}
      >
        <ReactMarkdown
          components={{
            code({ inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");
              const codeString = String(children).replace(/\n$/, "");

              if (!inline && match) {
                return (
                  <div style={{ position: "relative" }}>
                    <button
                      onClick={() => navigator.clipboard.writeText(codeString)}
                      style={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        fontSize: "0.75rem",
                        padding: "2px 6px",
                        cursor: "pointer",
                        backgroundColor: "#ccc",
                        border: "none",
                        borderRadius: "4px",
                        zIndex: 1,
                      }}
                    >
                      Copy
                    </button>
                    <SyntaxHighlighter
                      language={match[1]}
                      style={github}
                      PreTag="div"
                      customStyle={{ paddingTop: "2.5rem" }}
                      {...props}
                    >
                      {codeString}
                    </SyntaxHighlighter>
                  </div>
                );
              }

              return (
                <code
                  style={{
                    backgroundColor: "#eee",
                    padding: "2px 4px",
                    borderRadius: "4px",
                  }}
                  {...props}
                >
                  {children}
                </code>
              );
            },
          }}
        >
          {content}
        </ReactMarkdown>

        <div style={{ fontSize: "0.75rem", color: "#888", marginTop: "4px" }}>
          {new Date(timestamp).toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
}
