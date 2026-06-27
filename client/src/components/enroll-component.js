import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CourseService from "../services/course.service";

const EnrollCourseCard = ({ course, onEnroll, currentUser }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const isEnrolled = course.students?.some(
    (studentId) => studentId === currentUser.user._id,
  );

  const toggleCard = () => {
    setIsFlipped((previous) => !previous);
  };

  return (
    <div className={`course-scene ${isEnrolled ? "course-enrolled" : ""}`}>
      <div className={`course-card ${isFlipped ? "is-flipped" : ""}`}>
        {/* 正面 */}
        <div
          className="course-card-face course-card-front"
          onClick={toggleCard}
        >
          <p className="course-label">강의 요약</p>

          <h3>{course.title}</h3>

          <p className="course-instructor-badge">
            <span>강사</span>
            <strong>{course.instructor?.username ?? "未知"}</strong>
          </p>

          <p className="click-hint">강의를 클릭하여 상세 정보를 확인하세요.</p>
        </div>

        {/* 背面 */}
        <div className="course-card-face course-card-back" onClick={toggleCard}>
          <div className="course-back-header">
            <p className="course-label">강의 정보</p>

            {/* 防止點擊按鈕時，卡片一起翻回正面 */}
            <div
              className="course-actions"
              onClick={(e) => e.stopPropagation()}
            >
              {isEnrolled ? (
                <button
                  type="button"
                  className="enroll-course-btn enrolled-btn"
                  disabled
                >
                  ✓ 신청 완료
                </button>
              ) : (
                <button
                  type="button"
                  className="enroll-course-btn"
                  onClick={() => onEnroll(course)}
                >
                  수강 신청
                </button>
              )}
            </div>
          </div>

          <p className="course-description">{course.description}</p>

          <div className="course-bottom">
            <div className="course-info">
              <p>수강료：₩{course.price}</p>
              <p>현재 수강생 수：{course.students?.length ?? 0}명</p>
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

const EnrollComponent = ({ currentUser }) => {
  const navigate = useNavigate();

  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [message, setMessage] = useState("");

  const [allCourses, setAllCourses] = useState([]); //保存所有課程

  const [hasSearched, setHasSearched] = useState(false); //是否有按下搜尋鍵

  const handleTakeToLogin = () => {
    navigate("/login");
  };

  const handleChangeInput = (e) => {
    const value = e.target.value;

    setSearchInput(value);

    //搜尋欄完全清空時,恢復全部課程
    if (value.trim() === "") {
      setSearchResult(allCourses);
      setMessage("");
      setHasSearched(false);
    }
  };

  const handleSearch = async () => {
    const keyword = searchInput.trim();

    if (!keyword) {
      //setMessage("請先輸入想搜尋的課程名稱。");

      setSearchResult(allCourses);

      return;
    }

    try {
      setMessage("");

      const data = await CourseService.getCourseByName(keyword);

      setSearchResult(data.data);
      setHasSearched(true);

      if (data.data.length === 0) {
        setMessage("no-results");
      }
    } catch (error) {
      setMessage("搜尋課程失敗，請稍後再試。");
      setSearchResult(null);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleEnroll = async (course) => {
    try {
      await CourseService.enroll(course._id);

      window.alert(
        `「${course.title}」 강의 수강 신청이 완료되었습니다！\n내 강의 목록으로 이동합니다.`,
      );

      navigate("/course");
    } catch (error) {
      window.alert(
        error.response?.data || "課程註冊失敗，請確認是否已經註冊過此課程。",
      );
    }
  };

  useEffect(() => {
    const getAllCourses = async () => {
      try {
        const courses = await CourseService.getAllCourses();

        setSearchResult(courses.data);
        setAllCourses(courses.data);

        if (courses.data.length === 0) {
          setMessage("no-courses");
        }
      } catch (error) {
        setMessage("載入課程失敗，請稍後再試。");
        setSearchResult([]);
      }
    };

    getAllCourses();
  }, []);

  return (
    <div className="enroll-course-page">
      {!currentUser && (
        <div className="course-message-box">
          <p>您必須先登入才能夠開始註冊課程！</p>

          <button
            type="button"
            className="btn btn-primary btn-lg"
            onClick={handleTakeToLogin}
          >
            回到登入頁面
          </button>
        </div>
      )}

      {currentUser?.user.role === "instructor" && (
        <div className="course-message-box">
          <h1>只有學生才能夠註冊課程！</h1>
        </div>
      )}

      {currentUser?.user.role === "student" && (
        <>
          <h1 className="enroll-title">수강할 강의 찾기</h1>

          <div className="search input-group mb-3">
            <input
              type="text"
              className="form-control"
              value={searchInput}
              placeholder="강의명을 입력하세요"
              onChange={handleChangeInput}
              onKeyDown={handleKeyDown}
            />

            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSearch}
            >
              검색
            </button>
          </div>

          {message === "no-courses" && (
            <div className="empty-course-state">
              <div className="empty-course-icon">📚</div>

              <h2>현재 개설된 강의가 없어요.</h2>
              <p>
                새로운 강의가 등록되면
                <br />
                여기에서 확인할 수 있어요.
              </p>
            </div>
          )}

          {message === "no-results" && (
            <div className="empty-course-state">
              <div className="empty-course-icon">🔎</div>

              <h2>검색 결과가 없어요.</h2>
              <p>다른 검색어로 다시 찾아보세요.</p>
            </div>
          )}

          {searchResult && searchResult.length > 0 && (
            <div>
              {hasSearched && <p className="search-result-title">검색 결과</p>}

              <div className="course-list">
                {searchResult.map((course) => (
                  <EnrollCourseCard
                    key={course._id}
                    course={course}
                    onEnroll={handleEnroll}
                    currentUser={currentUser}
                  />
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default EnrollComponent;
