export default function ChatErrorBanner({ errorMessage }) {
  if (errorMessage === null || errorMessage === undefined) return null;
  return (
    <>
      {errorMessage && (
        <div style={{ color: "red", marginBottom: "10px" }}>{errorMessage}</div>
      )}
    </>
  );
}
