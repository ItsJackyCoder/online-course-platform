import { useState } from "react";
import CourseService from "../services/course.service";

const ProfileComponent = ({ currentUser }) => {
  //因為已經把currentUser state lift到App.js了,所以這裡的useEffect()就不需要了!!!
  //只要profile-component.js被render時,就執行第一個參數的callback function
  // useEffect(() => {
  //   setCurrentUser(AuthService.getCurrentUser());
  // }, []);
  const [courseData, setCourseData] = useState(null);

  currentUser.user.role === "student"
    ? CourseService.getEnrolledCourses(currentUser.user._id) //role是學生
        .then((data) => {
          setCourseData(data.data);
        })
        .catch((e) => {
          console.log(e);
        })
    : CourseService.get(currentUser.user._id) //role是講師
        .then((data) => {
          setCourseData(data.data);
        })
        .catch((e) => {
          console.log(e);
        });

  return (
    <div>
      {currentUser && (
        <div className="profile-page">
          <div className="profile-scene">
            <div className="profile-card">
              {/* 正面:基本資料 */}
              <div className="profile-card-face profile-card-front">
                <h2>내 프로필</h2>

                <table className="table">
                  <tbody>
                    <tr>
                      <td>
                        <strong>사용자 이름</strong>
                      </td>
                      <td>{currentUser.user.username}</td>
                    </tr>

                    <tr>
                      <td>
                        <strong>이메일</strong>
                      </td>
                      <td>{currentUser.user.email}</td>
                    </tr>

                    <tr>
                      <td>
                        <strong>계정 유형</strong>
                      </td>
                      <td>{currentUser.user.role}</td>
                    </tr>
                  </tbody>
                </table>

                <p className="profile-hint">
                  카드에 마우스를 올리면 계정 상세 정보를 확인할 수 있습니다.
                </p>
              </div>

              {/* 背面:詳細資料 */}
              <div className="profile-card-face profile-card-back">
                <span className="profile-badge">ACCOUNT DETAIL</span>

                <h2>{currentUser.user.username}</h2>

                <div className="profile-id-box">
                  <p>사용자 ID</p>
                  <strong>{currentUser.user._id}</strong>
                </div>

                <p className="profile-role">
                  {currentUser.user.role === "student"
                    ? `수강 신청한 강의 수 ：${courseData?.length ?? 0}`
                    : `개설한 강의 수：${courseData?.length ?? 0}`}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileComponent;
