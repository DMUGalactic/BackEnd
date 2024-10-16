import React from "react";
import "../css/videoBackground.css"; // CSS 파일 경로
import backgroundVideo from "../videos/pangaeaodyssey.mp4"; // 동영상 경로

const VideoBackground: React.FC = () => {
  return (
    <div className="video-background">
      <video autoPlay loop muted className="background-video">
        <source src={backgroundVideo} type="video/mp4" />
      </video>
      <div className="content">
        <h1>Welcom to the pangaeaodyssey.</h1>
        <p>This is our Game.</p>
      </div>
    </div>
  );
};

export default VideoBackground;
