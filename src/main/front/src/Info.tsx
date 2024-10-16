import React, { useState } from "react";
import "./css/Info.css";
import crossMonk from "./images/crossMonk.png";
import sickleDoctor from "./images/sickleDoctor.png";
import wizard from "./images/wizard.png";
import firearrow from "./images/firearrow.png";
import fireball from "./images/fireball.png";
import waterguntlet from "./images/waterguntlet.png";
import waterarrow from "./images/waterarrow.png";
import waterax from "./images/waterax.png";
import woodarrow from "./images/woodarrow.png";
import woodax from "./images/woodax.png";
import woodshild from "./images/woodshild.png";

const data = [
  {
    text: "수도승<br> STR : 50<br>INT : 50<br>DEX : 50<br>LUK : 50",
    image: crossMonk,
  },
  {
    text: "의사<br> STR : 25<br>INT : 40<br>DEX : 30<br>LUK : 90",
    image: sickleDoctor,
  },
  {
    text: "마법사<br>STR : 10<br>INT : 90<br>DEX : 20<br>LUK : 50",
    image: wizard,
  },
  {
    text: "나무 방패<br> 데미지 : 1 <br> 가격 : 0 <br> 속성 : 1",
    image: woodshild,
  },
  {
    text: "나무 도끼<br> 데미지 : 5 <br> 가격 : 300 <br> 속성 : 1",
    image: woodax,
  },
  {
    text: "목재 홯<br> 데미지 : 3 <br> 가격 : 300 <br> 속성 : 1",
    image: woodarrow,
  },
  {
    text: "물 활<br> 데미지 : 7 <br> 가격 : 700 <br> 속성 : 1",
    image: waterarrow,
  },
  {
    text: "물 도끼<br> 데미지 : 15 <br> 가격 : 700 <br> 속성 : 1",
    image: waterax,
  },
  {
    text: "물의 장막<br> 데미지 : 10 <br> 가격 : 1000 <br> 속성 : 1",
    image: waterguntlet,
  },
  {
    text: "화염구<br> 데미지 : 10 <br> 가격 : 1200 <br> 속성 : 1",
    image: fireball,
  },
  {
    text: "불 활<br> 데미지 : 5 <br> 가격 : 1000 <br> 속성 : 1",
    image: firearrow,
  },
];

const Info: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<number | null>(null);

  const handleClick = (index: number) => {
    setSelectedItem(index);
  };

  const handleClose = () => {
    setSelectedItem(null);
  };

  return (
    <div>
      <div className="InfoGuide">
        <h1>pangaeaodyssey 게임 정보</h1>
        <p>pangaeaodyssey의 다양한 게임 정보를 만나보세요.</p>
      </div>

      <div className="rectangles-container">
        {data.map((item, index) => (
          <div
            key={index}
            className="rectangle"
            onClick={() => handleClick(index)}
          >
            <div className="image-background">
              <img
                src={item.image}
                alt={`정보 ${index + 1}`}
                className="rectangle-image"
              />
            </div>
            <div
              className="text-background"
              dangerouslySetInnerHTML={{ __html: item.text }}
            />
          </div>
        ))}
      </div>

      {selectedItem !== null && (
        <div className="modal" onClick={handleClose}>
          <div className="modal-content">
            <div className="modal-image-background">
              <img
                src={data[selectedItem].image}
                alt={`상세 정보 ${selectedItem + 1}`}
                className="modal-image"
              />
            </div>
            <div className="modal-text-background">
              <div
                dangerouslySetInnerHTML={{ __html: data[selectedItem].text }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Info;
