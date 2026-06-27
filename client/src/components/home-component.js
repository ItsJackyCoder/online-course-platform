import React from "react";

const HomeComponent = () => {
  return (
    <main>
      <div className="container py-4">
        {/* 上方導覽列 */}
        <section className="hero-section mb-4">
          {/* 導覽列的說明部分 */}
          <div className="hero-content">
            <span className="hero-badge">온라인 강의 플랫폼</span>

            <h1>배움을 나누고, 새로운 지식을 탐색하세요</h1>

            <p className="hero-description">
              강사는 이곳에서 강의를 개설하고 관리할 수 있으며, 학습자는 관심
              있는 강의를 찾아 자신의 일정에 맞춰 수강할 수 있습니다.
            </p>

            <div className="hero-features">
              <div className="hero-feature">
                <div className="feature-icon">🎓</div>
                <div>
                  <h3>다양한 강의 콘텐츠</h3>
                  <p>
                    다양한 주제의 강의를 둘러보고 나에게 맞는 학습 내용을
                    찾아보세요.
                  </p>
                </div>
              </div>

              <div className="hero-feature">
                <div className="feature-icon">👥</div>
                <div>
                  <h3>강사의 지식 공유</h3>
                  <p>
                    강의를 통해 지식과 경험을 나누고, 학습자의 성장을 함께
                    지원하세요.
                  </p>
                </div>
              </div>

              <div className="hero-feature">
                <div className="feature-icon">📈</div>
                <div>
                  <h3>유연한 학습 일정</h3>
                  <p>내 일정에 맞춰 원하는 시간에 자유롭게 학습하세요.</p>
                </div>
              </div>
            </div>
          </div>

          {/* 導覽列的圖片部分 */}
          <div className="hero-visual">
            <div className="hero-circle"></div>

            <div className="laptop">
              <div className="laptop-screen">
                <div className="screen-sidebar"></div>

                <div className="screen-content">
                  <div className="screen-card screen-main-card">🎓</div>
                  <div className="screen-card"></div>
                  <div className="screen-card"></div>
                  <div className="screen-card"></div>
                </div>
              </div>

              <div className="laptop-keyboard"></div>
            </div>

            <div className="book book-one"></div>
            <div className="book book-two"></div>
          </div>
        </section>

        <section className="role-section">
          <div className="role-card student-card">
            <span className="role-label">Student</span>
            <h2>학습자</h2>
            <p>관심 있는 강의를 둘러보고, 내 일정에 맞춰 꾸준히 학습하세요.</p>

            <div className="role-info">
              <span>📚</span>
              <p>다양한 강의와 학습 자료를 찾아보세요</p>
            </div>
          </div>

          <div className="role-card teacher-card">
            <span className="role-label">Instructor</span>
            <h2>강사</h2>
            <p>
              나만의 온라인 강의를 개설하고 관리하며, 학습자와 전문 지식을
              공유하세요.
            </p>

            <div className="role-info">
              <span>✏️</span>
              <p>첫 번째 강의를 개설해 보세요</p>
            </div>
          </div>
        </section>

        <footer className="pt-3 mt-4 text-muted border-top text-end">
          © 2026 Jacky Fang
        </footer>
      </div>
    </main>
  );
};

export default HomeComponent;
