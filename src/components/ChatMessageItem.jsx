import ReactMarkdown from "react-markdown";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { github } from "react-syntax-highlighter/dist/esm/styles/hljs";
import js from "react-syntax-highlighter/dist/esm/languages/hljs/javascript";

SyntaxHighlighter.registerLanguage("javascript", js);

export default function ChatMessageItem({ role, content, timestamp }) {
  // const data =
  //   "JPA (Java Persistence API)는 자바 플랫폼에서 관계형 데이터베이스의 데이터를 관리하고 접근하는 방법을 정의한 API입니다. JPA를 사용하면 개발자는 데이터베이스 테이블을 직접 다루는 SQL을 작성하지 않고, 객체 지향적인 방식으로 데이터베이스를 다룰 수 있습니다. 이는 객체와 데이터베이스 테이블 간의 매핑을 자동화하여, 개발의 복잡성을 줄이고 생산성을 높일 수 있게 도와줍니다.\n\n## 예제 코드\n```java\n@Entity\npublic class User {\n    @Id\n    private Long id;\n    private String name;\n    private String email;\n}\n```\n위 예제에서 `@Entity`는 클래스가 데이터베이스의 엔티티임을 나타내고, `@Id`는 해당 필드가 데이터베이스의 기본 키(primary key) 역할을 한다는 것을 지정합니다.";

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
          backgroundColor: role === "user" ? "#efefef" : "",
          padding: "10px 15px",
          borderRadius: "10px",
          margin: "20px",
          wordBreak: "break-word",
          lineHeight: "1.6",
        }}
      >
        <ReactMarkdown
          components={{
            h1: (props) => (
              <h1
                style={{ fontSize: "1.5rem", fontWeight: "bold" }}
                {...props}
              />
            ),
            h2: (props) => (
              <h2
                style={{
                  fontSize: "1.25rem",
                  fontWeight: "bold",
                  marginTop: "1rem",
                }}
                {...props}
              />
            ),
            code({ inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");
              const codeString = String(children).replace(/\n$/, "");

              if (!inline && match) {
                return (
                  <div
                    style={{
                      position: "relative",
                      borderRadius: "6px",
                      overflow: "hidden",
                      border: "1px solid #e0e0e0",
                      margin: "12px 0",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        backgroundColor: "#f5f5f5",
                        padding: "4px 8px",
                        fontSize: "0.75rem",
                        color: "#555",
                        borderBottom: "1px solid #e0e0e0",
                      }}
                    >
                      <span>{match[1]}</span>
                      <button
                        onClick={() =>
                          navigator.clipboard.writeText(codeString)
                        }
                        style={{
                          fontSize: "0.75rem",
                          padding: "2px 6px",
                          cursor: "pointer",
                          background: "none",
                          border: "none",
                          borderRadius: "4px",
                        }}
                      >
                        복사
                      </button>
                    </div>
                    <SyntaxHighlighter
                      language={match[1]}
                      style={github}
                      PreTag="div"
                      customStyle={{
                        margin: 0,
                        borderRadius: 0,
                        backgroundColor: "#fff",
                      }}
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
                    backgroundColor: "#red",
                    padding: "6px 8px",
                    borderRadius: "4px",
                    display: "inline-block",
                    // lineHeight: "1.6", // improves vertical spacing
                    margin: "2px 0", // adds some vertical margin
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
