import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomeComponent from "./components/home-component";
import RegisterComponent from "./components/register-component";
import LoginComponent from "./components/login-component";
import ProfileComponent from "./components/profile-component";
import CourseComponent from "./components/course-component";
import PostCourseComponent from "./components/postCourse-component";
import EnrollComponent from "./components/enroll-component";
import EditCourseComponent from "./components/editCourse-component";
import NotFoundComponent from "./components/notFoundComponent";

import { useState } from "react";
import AuthService from "./services/auth.service";

import "./styles/styles.css";

function App() {
  //因為其他的頁面也需要這個state,所以把它lifting到這裡
  let [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());

  return (
    <BrowserRouter>
      <main className="app-content">
        <Routes>
          <Route
            path="/"
            element={
              <Layout
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            }
          >
            <Route index element={<HomeComponent />} />
            <Route path="/register" element={<RegisterComponent />} />
            <Route
              path="/login"
              element={
                <LoginComponent
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                />
              }
            />

            <Route
              path="/profile"
              element={
                <ProfileComponent
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                />
              }
            />

            <Route
              path="/course"
              element={
                <CourseComponent
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                />
              }
            />

            <Route
              path="/postCourse"
              element={
                <PostCourseComponent
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                />
              }
            />

            <Route
              path="/enroll"
              element={
                <EnrollComponent
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                />
              }
            />

            <Route
              path="/course/:_id/edit"
              element={
                <EditCourseComponent
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                />
              }
            />
          </Route>

          {/* 其他網址都找不到時才顯示 */}
          <Route path="*" element={<NotFoundComponent />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
