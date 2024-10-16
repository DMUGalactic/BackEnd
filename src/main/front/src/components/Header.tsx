import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Link 컴포넌트 impor
import "../css/Header.css"; // CSS 파일 경로

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 50) {
      // 스크롤 위치가 50px 이상일 때
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={isScrolled ? "header scrolled" : "header"}>
      <nav>
        {/* 로고를 Link로 감싸서 클릭하면 홈으로 이동 */}
        <Link to="/" className="logo">
          pangaeaOdyssey
        </Link>
        <ul className="nav-links">
          <li>
            <a href="/company">기업정보</a>
          </li>
          <li>
            <a href="/info">게임정보</a>
          </li>
          <li>
            <a href="#services">커뮤니티</a>
          </li>
          <li>
            <Link to="/download">다운로드</Link>{" "}
            {/* Link를 사용하여 페이지 이동 */}
          </li>
          <li>
            <a href="/login">로그인</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
