import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CourseService from "../services/course.service";
import { Link } from "react-router-dom";

const CourseCard = ({ course, canManage, onEdit, onDelete }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const toggleCard = () => {
    setIsFlipped((previous) => !previous);
  };

  return (
    <div className="course-scene">
      <div className={`course-card ${isFlipped ? "is-flipped" : ""}`}>
        {/* 正面 */}
        <div
          className="course-card-face course-card-front"
          onClick={toggleCard}
        >
          <p className="course-label">강의 요약</p>

          <h3>{course.title}</h3>

          <p className="course-instructor-badge">
            <span>강사:</span>
            <strong>{course.instructor?.username ?? "未知"}</strong>
          </p>

          <p className="click-hint">강의를 클릭하여 상세 정보를 확인하세요.</p>
        </div>

        {/* 背面 */}
        <div className="course-card-face course-card-back" onClick={toggleCard}>
          <div className="course-back-header">
            <p className="course-label">강의 정보</p>

            <div
              className="course-actions"
              onClick={(e) => e.stopPropagation()}
            >
              {canManage && (
                <>
                  <button
                    type="button"
                    className="edit-course-btn"
                    onClick={() => onEdit(course)}
                  >
                    수정
                  </button>

                  <button
                    type="button"
                    className="delete-course-btn"
                    onClick={() => onDelete(course)}
                  >
                    삭제
                  </button>
                </>
              )}

              {!canManage && (
                <button
                  type="button"
                  className="delete-course-btn"
                  onClick={() => onDelete(course)}
                >
                  신청 취소
                </button>
              )}
            </div>
          </div>

          <p className="course-description">{course.description}</p>

          <div className="course-bottom">
            <div className="course-info">
              <p>수강료：₩{course.price}</p>
              <p>현재 수강 신청 인원：{course.students?.length ?? 0}명</p>
            </div>

            <p className="click-hint">
              카드를 클릭하면 강의 요약으로 돌아갑니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const CourseComponent = ({ currentUser }) => {
  const navigate = useNavigate();
  const [courseData, setCourseData] = useState(null);

  const handleTakeToLogin = () => {
    navigate("/login");
  };

  const handleEditCourse = async (course) => {
    navigate(`/course/${course._id}/edit`);
  };

  const handleDeleteCourse = async (course) => {
    const confirmed = window.confirm(
      `「${course.title}」강의 수강 신청을 취소하시겠습니까？\n취소 후에는 더 이상 강의 내용을 확인할 수 없습니다.`,
    );

    if (!confirmed) return;

    try {
      await CourseService.delete(course._id);

      setCourseData((previousCourses) =>
        previousCourses.filter((item) => item._id !== course._id),
      );
    } catch (error) {
      window.alert("刪除課程失敗，請稍後再試。");
    }
  };

  useEffect(() => {
    const _id = currentUser?.user?._id;
    const role = currentUser?.user?.role;

    if (!_id || !role) return;

    if (role === "instructor") {
      CourseService.get(_id)
        .then((data) => {
          setCourseData(data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (role === "student") {
      CourseService.getEnrolledCourses(_id)
        .then((data) => {
          setCourseData(data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [currentUser?.user?._id, currentUser?.user?.role]);

  return (
    <div className="course-page">
      {!currentUser && (
        <div>
          <p>您必須先登入才能看到課程！</p>

          <button
            className="btn btn-primary btn-lg"
            onClick={handleTakeToLogin}
          >
            回到登入頁面
          </button>
        </div>
      )}

      {currentUser?.user.role === "instructor" && (
        <>
          <h1>내 강의</h1>
          <p className="title-description">
            현재 수강 신청한 강의와 상세 정보를 확인하세요.
          </p>
        </>
      )}

      {currentUser?.user.role === "student" && (
        <>
          <h1>수강 관리</h1>
          <p className="title-description">
            수강 신청한 강의를 확인하고 관리하세요.
          </p>
        </>
      )}

      {courseData?.length === 0 && (
        <div className="empty-course-state">
          <div className="empty-course-icon">📚</div>

          {currentUser.user.role === "student" ? (
            <>
              <h2>현재 수강 중인 강의가 없어요.</h2>
              <p>
                관심 있는 강의를 찾아보고
                <br />
                새로운 학습을 시작해 보세요.
              </p>

              <Link to="/enroll" className="empty-course-link">
                강의 둘러보기
              </Link>
            </>
          ) : (
            <>
              <h2>아직 개설한 강의가 없어요.</h2>
              <p>
                첫 강의를 개설하고
                <br />
                학습자들과 지식을 나눠 보세요.
              </p>

              <Link to="/postCourse" className="empty-course-link">
                강의 개설하기
              </Link>
            </>
          )}
        </div>
      )}

      {currentUser && courseData?.length > 0 && (
        <div className="course-list">
          {courseData.map((course) => {
            return (
              <CourseCard
                key={course._id}
                course={course}
                canManage={currentUser.user.role === "instructor"}
                onEdit={handleEditCourse}
                onDelete={handleDeleteCourse}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CourseComponent;
