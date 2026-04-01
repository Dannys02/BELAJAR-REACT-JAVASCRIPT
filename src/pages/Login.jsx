import { useNavigate, Navigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();
    
    const isLogin = localStorage.getItem("token");
    if (isLogin) return <Navigate to="/dashboard" />;

    const handleLogin = () => {
        localStorage.setItem("token", "abcd1");
        navigate("/dashboard");
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>Login</h1>
            <button onClick={handleLogin}>Login</button>
        </div>
    );
}

export default Login;
