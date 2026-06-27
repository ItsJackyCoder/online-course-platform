import React from "react";
import { Link } from "react-router-dom";
import AuthService from "../services/auth.service";

const NavComponent = ({ currentUser, setCurrentUser }) => {
  const handleLogout = () => {
    AuthService.logout(); //清空local storage

    window.alert("로그아웃되었습니다. 홈으로 이동합니다.");

    //讓App.js裡面的"currentUser" state變成是null
    setCurrentUser(null);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <div className="container-fluid">
        {/* 當螢幕小於某個程度就出現漢堡選單 */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav w-100">
            <li className="nav-item">
              <Link className="nav-link active" to="/">
                홈
              </Link>
            </li>

            {!currentUser && (
              <li className="nav-item">
                <Link className="nav-link" to="/register">
                  회원가입
                </Link>
              </li>
            )}

            {!currentUser && (
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  로그인
                </Link>
              </li>
            )}

            {currentUser && (
              <li className="nav-item">
                <Link className="nav-link" to="/profile">
                  마이페이지
                </Link>
              </li>
            )}

            {currentUser && (
              <li className="nav-item">
                <Link className="nav-link" to="/course">
                  강의 목록
                </Link>
              </li>
            )}

            {currentUser && currentUser.user.role === "instructor" && (
              <li className="nav-item">
                <Link className="nav-link" to="/postCourse">
                  강의 등록
                </Link>
              </li>
            )}

            {currentUser && currentUser.user.role === "student" && (
              <li className="nav-item">
                <Link className="nav-link" to="/enroll">
                  수강 신청
                </Link>
              </li>
            )}

            {currentUser && (
              <>
                <li className="nav-item ms-auto d-flex align-items-center">
                  <span className="nav-link disabled">
                    {currentUser.user.username} 안녕하세요!
                  </span>
                </li>

                <li className="nav-item">
                  <Link onClick={handleLogout} className="nav-link" to="/">
                    로그아웃
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavComponent;
