import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/Login.css";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("admin@admin.com");
  const [password, setPassword] = useState<string>("admin");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch("http://192.168.183.45:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // 쿠키 등 인증 정보 포함
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json(); // 에러 메시지를 구체적으로 받음
        throw new Error(errorData.message || `Error: ${response.status}`);
      }

      const data = await response.json();
      console.log("로그인 성공:", data);
      navigate("/videobackground"); // 로그인 성공 후 대시보드로 이동
    } catch (error) {
      console.error("로그인 실패:", error);
      setError("로그인 실패.\n이메일 또는 비밀번호를 확인하세요.");
    }
  };

  return (
    <div className="login-container">
      <h2>로그인</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
      >
        <div>
          <label htmlFor="email">이메일:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">비밀번호:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && (
          <p className="error-message">
            로그인 실패.
            <br />
            이메일 또는 비밀번호를 확인하세요.
          </p>
        )}{" "}
        {/* 에러 메시지 */}
        <button type="submit">로그인</button>
      </form>
    </div>
  );
};

export default Login;
