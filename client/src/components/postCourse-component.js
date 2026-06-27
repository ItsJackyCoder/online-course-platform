import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CourseService from "../services/course.service";

const PostCourseComponent = ({ currentUser }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: 0,
  });

  const [message, setMessage] = useState("");
  const [field, setField] = useState("");

  const handleTakeToLogin = () => {
    navigate("/login");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const postCourse = () => {
    CourseService.post(formData.title, formData.description, formData.price)
      .then(() => {
        window.alert(`「${formData.title}」강의가 성공적으로 개설되었습니다!`);

        navigate("/course");
      })
      .catch((error) => {
        const status = error.response?.status;

        if (status === 409) {
          setMessage(`「${formData.title}」已存在，請勿重複建立。`);
          setField("");

          return;
        }

        if (!error.response) {
          setMessage("無法連線到伺服器，請確認後端是否已啟動。");
        } else {
          setMessage(error.response.data.message);
          setField(error.response.data.field);
        }
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
    <div className="post-course-page">
      {!currentUser && (
        <div>
          <p>在發布新課程之前，您必須先登錄。</p>
          <button
            className="btn btn-primary btn-lg"
            onClick={handleTakeToLogin}
          >
            帶我進入登錄頁面。
          </button>
        </div>
      )}

      {currentUser && currentUser.user.role === "instructor" && (
        <form
          className="post-course-form"
          onSubmit={(e) => {
            e.preventDefault();
            postCourse();
          }}
        >
          <h2 className="form-title">새 강의 개설</h2>
          <p className="form-subtitle">
            강의 정보를 입력하여 새로운 강의를 개설하세요.
          </p>

          <div className="form-group">
            <label htmlFor="exampleforTitle">강의명：</label>
            <input
              name="title"
              type="text"
              className="form-control"
              id="exampleforTitle"
              value={formData.title}
              placeholder="예: 자바스크립트 웹 개발 입문 (최대 10자)"
              onChange={handleChange}
            />
          </div>

          {message && field === "title" && (
            <div className="alert alert-danger mt-3">{message}</div>
          )}

          {message && field === "" && (
            <div className="alert alert-danger mt-3">{message}</div>
          )}

          <div className="form-group">
            <label htmlFor="exampleforContent">강의 소개：</label>
            <textarea
              className="form-control"
              id="exampleforContent"
              name="description"
              value={formData.description}
              placeholder="강의 내용, 수강 대상 및 학습 내용을 간단히 소개해 주세요. (20~250자)"
              onChange={handleChange}
            />
          </div>

          {message && field === "description" && (
            <div className="alert alert-danger mt-3">{message}</div>
          )}

          <div className="form-group">
            <label htmlFor="exampleforPrice"> 수강료 ：</label>
            <input
              name="price"
              type="number"
              className="form-control"
              id="exampleforPrice"
              value={formData.price}
              onChange={handleChange}
            />
          </div>

          {message && field === "price" && (
            <div className="alert alert-danger mt-3">{message}</div>
          )}

          <button className="btn btn-primary w-100" type="submit">
            강의 개설하기
          </button>
        </form>
      )}
    </div>
  );
};

export default PostCourseComponent;
