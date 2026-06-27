import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import { Link } from "react-router-dom";

const LoginComponent = ({ currentUser, setCurrentUser }) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [field, setField] = useState("");

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      let response = await AuthService.login(email, password);

      localStorage.setItem("user", JSON.stringify(response.data));

      window.alert("로그인에 성공했습니다. 잠시 후 마이페이지로 이동합니다.");

      setCurrentUser(AuthService.getCurrentUser());

      navigate("/profile");
    } catch (e) {
      setMessage(e.response.data.message);
      setField(e.response.data.field);
    }
  };

  useEffect(() => {
    //要是沒錯誤訊息直接就跳過此useEffect
    if (!message) return;

    const timer = setTimeout(() => {
      setMessage("");
    }, 1500);

    return () => clearTimeout(timer); //清空計時器
  }, [message]);

  return (
    <main className="login-page">
      <form className="login-form" onSubmit={handleLogin}>
        <h1 className="form-title">환영합니다</h1>
        <p className="form-subtitle">로그인 정보를 입력해 주세요.</p>

        {message && field === "notFoundUser" && (
          <div className="alert alert-danger mt-3">{message}</div>
        )}

        <div>
          <div className="form-group">
            <label htmlFor="email">이메일：</label>
            <input
              onChange={handleEmail}
              type="text"
              className="form-control"
              name="email"
              id="email"
            />
          </div>
          {message && field === "email" && (
            <div className="alert alert-danger mt-3">{message}</div>
          )}
          <br />

          <div className="form-group">
            <label htmlFor="password">비밀번호：</label>
            <input
              onChange={handlePassword}
              type="password"
              className="form-control"
              name="password"
              id="password"
            />
          </div>
          {message && ["password", "wrongPwd"].includes(field) && (
            <div className="alert alert-danger mt-3">{message}</div>
          )}
          <br />

          <div className="form-group">
            <button className="btn btn-primary w-100" type="submit">
              로그인
            </button>

            <p className="text-center mt-3 mb-0">
              아직 계정이 없으신가요？
              <Link to="/register" className="text-decoration-none">
                회원가입
              </Link>
            </p>
          </div>
        </div>
      </form>
    </main>
  );
};

export default LoginComponent;
