import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const isLogin = localStorage.getItem("token");
  if (!isLogin) return <Navigate to="/login" />;
  return children;
}

export default ProtectedRoute;