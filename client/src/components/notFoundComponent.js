import { Link, useLocation } from "react-router-dom";

const NotFoundComponent = () => {
  const location = useLocation();

  return (
    <main className="not-found-page">
      <section className="not-found-panel">
        <div className="not-found-grid" />

        <div className="not-found-copy">
          <span className="not-found-label">URL NAVIGATION ERROR</span>

          <h1>
            페이지를
            <br />
            <span>찾을 수 없습니다.</span>
          </h1>

          <p className="not-found-description">
            입력하신 주소가 잘못되었거나, 페이지가 이동 또는 삭제되었을 수
            있어요. 홈으로 돌아가 다시 찾아보세요.
          </p>

          <div className="not-found-url-box">
            <div className="url-dots">
              <span />
              <span />
              <span />
            </div>

            <code>{location.pathname}</code>

            <span className="url-status">페이지를 찾을 수 없음</span>
          </div>

          <div className="not-found-actions">
            <Link to="/" className="not-found-primary-btn">
              홈으로 돌아가기
            </Link>
          </div>
        </div>

        <div className="not-found-visual" aria-hidden="true">
          <div className="route route-one" />
          <div className="route route-two" />

          <div className="route-point route-start">
            <span />
          </div>

          <div className="route-point route-end">?</div>

          <div className="not-found-number">
            <span>4</span>
            <span>0</span>
            <span>4</span>
          </div>

          <div className="visual-card">
            <span className="visual-card-label">ROUTE STATUS</span>
            <strong>NOT FOUND</strong>
            <small>요청하신 페이지가 존재하지 않아요.</small>
          </div>
        </div>
      </section>
    </main>
  );
};

export default NotFoundComponent;
