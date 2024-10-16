import React from "react";
import "./css/Download.css";

const Download: React.FC = () => {
  return (
    <div>
      <div className="Guide">
        <h1>다운로드 / 설치</h1>
        <p>pangaeaodyssey 전용 다운로드/설치 안내입니다.</p>
      </div>
      <div className="download-button-container">
        <a href="#download" className="download-button"></a>
      </div>
      <table className="chart">
        <thead>
          <tr>
            <th>항목</th>
            <th>최소사양</th>
            <th>권장사양</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>운영체제</td>
            <td>Windows 7/8/9/10/11 - 64-Bit</td>
            <td>Windows 7/8/9/10/11 - 64-Bit</td>
          </tr>
          <tr>
            <td>CPU</td>
            <td>Intel Core 2 Duo OR AMD Athlon 64 X2</td>
            <td>Intel Core i3 OR AMD Ryzen 3 이상</td>
          </tr>
          <tr>
            <td>메모리</td>
            <td>2G</td>
            <td>4G 이상</td>
          </tr>
          <tr>
            <td>하드디스크 여유공간</td>
            <td>5MB</td>
            <td>1G 이상</td>
          </tr>
          <tr>
            <td>그래픽카드</td>
            <td>NVIDIA GeForce 8600 OR ATI Radeon HD 2600</td>
            <td>NVIDIA GeForce GTX 460 OR ATI Radeon HD 6850 이상</td>
          </tr>
          <tr>
            <td>GPU Memory</td>
            <td>256MB</td>
            <td>512MB 이상</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Download;
