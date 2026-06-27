import React, { useState, useEffect } from "react";
import AuthService from "../services/auth.service";
import { useNavigate } from "react-router-dom"; //重新導向功能

const RegisterComponent = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const [message, setMessage] = useState("");
  const [field, setField] = useState("");

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleRole = (e) => {
    setRole(e.target.value);
  };

  //這裡也可以用async function來寫~
  const handleRegister = (e) => {
    e.preventDefault();

    AuthService.register(username, email, password, role)
      .then(() => {
        window.alert("註冊成功!您現在將被導向到登入頁面");

        navigate("/login");
      })
      //會出現錯誤是在server端的auth.js可能有問題
      .catch((e) => {
        //axios的官方文件有寫(e.response.data)
        setMessage(e.response.data.message);
        setField(e.response.data.field);
      });
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
    <main className="register-page">
      <div className="register-form">
        <h1 className="form-title">회원가입</h1>
        <p className="form-subtitle">
          간단한 정보를 입력하고 학습을 시작해 보세요.
        </p>

        <form onSubmit={handleRegister}>
          <div>
            <label htmlFor="username">이름:</label>
            <input
              onChange={handleUsername}
              type="text"
              className="form-control"
              name="username"
              placeholder="이름을 입력해 주세요"
            />
          </div>
          {message && field === "username" && (
            <div className="alert alert-danger mt-3">{message}</div>
          )}
          <br />

          <div className="form-group">
            <label htmlFor="email">이메일：</label>
            <input
              onChange={handleEmail}
              type="text"
              className="form-control"
              name="email"
              placeholder="사용할 이메일 주소를 입력해 주세요"
            />
          </div>
          {message && field === "email" && (
            <div className="alert alert-danger mt-3">{message}</div>
          )}
          <br />

          <div className="form-group">
            <label htmlFor="password">비밀번호：</label>
            <input
              type="password"
              className="form-control"
              name="password"
              placeholder="영문과 숫자를 포함해 6자 이상 입력해 주세요
"
              onChange={handlePassword}
            />
          </div>
          {message && field === "password" && (
            <div className="alert alert-danger mt-3">{message}</div>
          )}
          <br />
          <div className="form-group">
            <label htmlFor="role">계정 유형：</label>

            <select
              id="role"
              className="form-control"
              name="role"
              onChange={handleRole}
              defaultValue=""
            >
              <option value="" disabled>
                계정 유형을 선택해 주세요
              </option>
              <option value="student">수강생</option>
              <option value="instructor">강사</option>
            </select>
          </div>
          {message && field === "role" && (
            <div className="alert alert-danger mt-3">{message}</div>
          )}
          <br />
          <button className="btn btn-primary w-100" type="submit">
            회원 가입
          </button>
        </form>
      </div>
    </main>
  );
};

export default RegisterComponent;
