import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CourseService from "../services/course.service";

const EditCourseComponent = ({ currentUser }) => {
  const { _id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: 0,
  });

  const [message, setMessage] = useState("");

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

  const editCourse = () => {
    CourseService.editCourse(_id, formData)
      .then(() => {
        window.alert("課程已更改成功!");

        navigate("/course");
      })
      .catch((error) => {
        setMessage(error.response.data);
      });
  };

  useEffect(() => {
    const getCourse = async () => {
      try {
        const foundCourse = await CourseService.getCourseById(_id);

        setFormData({
          title: foundCourse.data.title,
          description: foundCourse.data.description,
          price: foundCourse.data.price,
        });
      } catch (error) {
        setMessage(error.response?.data || "取得課程資料失敗");
      }
    };

    getCourse();
  }, [_id]);

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
            editCourse();
          }}
        >
          <h2 className="form-title">編輯課程</h2>
          <p className="form-subtitle">您可以在此修改課程標題、內容與價格。</p>

          <div className="form-group">
            <label htmlFor="exampleforTitle">課程標題：</label>
            <input
              name="title"
              type="text"
              className="form-control"
              id="exampleforTitle"
              value={formData.title}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="exampleforContent">內容：</label>
            <textarea
              className="form-control"
              id="exampleforContent"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="exampleforPrice">價格：</label>
            <input
              name="price"
              type="number"
              className="form-control"
              id="exampleforPrice"
              value={formData.price}
              onChange={handleChange}
            />
          </div>

          <button className="btn btn-primary w-100" type="submit">
            編輯課程
          </button>

          {message && (
            <div className="alert alert-warning mt-3" role="alert">
              {message}
            </div>
          )}
        </form>
      )}
    </div>
  );
};

export default EditCourseComponent;
