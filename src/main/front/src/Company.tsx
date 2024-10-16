import React from "react";
import "./css/Company.css";
import profileImage1 from "./images/Sloth.png";
import profileImage2 from "./images/sealion.png";
import profileImage3 from "./images/dog.png";
import profileImage4 from "./images/rabbit.png";
import profileImage5 from "./images/Chicken.png";
import profileImage6 from "./images/wolf.png";
import profileImage7 from "./images/racoon.png";

// 기존 개발자 데이터
const developers = [
  {
    name: "배진호",
    image: profileImage1,
    description:
      "보스화면: 강력한 몬스터인 보스를 처치하면 스테이지 클리어<br/> 게임 진행 화면: 몬스터를 처치하고 획득한 골드로 무기를 구매하여 성장한다 <br/>  Behavior Tree를 이용한 AI로 보스를 구현 <br/> 체력바 및 애니메이션을 추가하여 시각적으로 보스의 상태를 표현하였다.",
  },
  {
    name: "유지현",
    image: profileImage2,
    description:
      "무기 : 다양한 종류의 무기를 장착하여 데미지를 강화 <br/> Unity의 Collision, Trigger를 통해 무기의 데미지와 효과를 구현 <br/> Pool Manager를 통한 효율적인 리소스 관리",
  },
  {
    name: "서승현",
    image: profileImage7,
    description:
      "몬스터: 랜덤 위치에 자동 생성되며 능력이 부여되고, 플레이어를 자동 타겟으로 설정한 후 공격 및 달리기 모션을 반복합니다. <br/> Bullet 태그와 충돌 시 타격 모션을 취한 후 다시 달리며, 넉백과 깜빡임 효과, 죽는 모션이 포함됩니다. <br/> 체력이 다하면 비활성화되고, 스테이지 및 시간에 따라 몬스터가 다르게 생성됩니다.",
  },
  {
    name: "송기현",
    image: profileImage4,
    description:
      "Tile Reposition (무한맵) - 플레이어가 원하는 방향으로 이동시, 그 방향으로 맵의 타일을 움직이고 화면 밖으로 나간 타일은 반대쪽으로 <br/> 재배치하여 무한맵 기능을 구현하였다. <br/> 보스 - 플레이어를 추격하여 원거리 및 근거리 공격이 가능하게 구현한 후, 체력바 및 애니메이션을 추가하여 시각적으로 보스의 상태를 표현하였다.",
  },
  {
    name: "이호승",
    image: profileImage5,
    description:
      "인벤토리 화면: 게임 플레이어 전 플레이어가 캐릭터의 기본 정보들과 장착 해제 가능한 장비들을 확인 가능하다. <br/> 인벤토리: 드래그 앤 드롭 시스템을 활용해 장비를 장착 및 해제 하고 캐릭터의 스텟UI에 실시간으로 반영된다.",
  },
  {
    name: "김성수",
    image: profileImage6,
    description:
      "변화하는 맵: 특정 시간마다 맵의 랜덤한 위치에 플레이어에게 미션을 부여하는 기믹을 생성하여 매판 새로운 경험을 부여한다.",
  },
];

// 웹 개발자 데이터
const webDevelopers = [
  {
    name: "강태현",
    image: profileImage3,
    description:
      "React와 TypeScript를 사용하여 웹 에플리케이션을 구축했으며, React의 컴포넌트 구조를 활용하여 페이지별로 독립적인 기능을 구현하였고 <br/> 사용자 경험을 고려한 반응형 디자인과 인터랙션이 포함되어 있습니다.",
  },
  {
    name: "서승현",
    image: profileImage7,
    description: "백엔드 개발자",
  },
];

const Company: React.FC = () => {
  return (
    <div>
      <div className="CompanyGuide">
        <h1>pangaeaodyssey 개발진 정보 및 맡은 일</h1>
      </div>

      <table className="DevChart developer-chart">
        <thead>
          <tr>
            <th>게임 개발진</th>
          </tr>
        </thead>
        <tbody>
          {developers.map((dev, index) => (
            <tr key={index}>
              <td>
                <div className="profile-container">
                  <div className="profile-image-name">
                    <img
                      src={dev.image}
                      alt={dev.name}
                      className="profile-image"
                    />
                    <h3>{dev.name}</h3>
                  </div>
                  <div className="profile-info">
                    <p dangerouslySetInnerHTML={{ __html: dev.description }} />
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Webdevelopers */}
      <table className="DevChart webdeveloper-chart">
        <thead>
          <tr>
            <th>웹 개발진</th>
          </tr>
        </thead>
        <tbody>
          {webDevelopers.map((dev, index) => (
            <tr key={index}>
              <td>
                <div className="profile-container">
                  <div className="profile-image-name">
                    <img
                      src={dev.image}
                      alt={dev.name}
                      className="profile-image"
                    />
                    <h3>{dev.name}</h3>
                  </div>
                  <div className="profile-info">
                    <p dangerouslySetInnerHTML={{ __html: dev.description }} />
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Company;
