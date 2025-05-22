import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  const location = useLocation();

  if (!token) {
    const from = encodeURIComponent(location.pathname);
    return <Navigate to={`/login?from=${from}`} replace />;
  }
  return children;
}