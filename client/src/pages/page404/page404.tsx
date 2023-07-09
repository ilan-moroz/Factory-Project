import React from "react";
import "./page404.css";
import { useNavigate } from "react-router-dom";

function Page404(): JSX.Element {
  const navigate = useNavigate();

  const goToHomePage = () => {
    navigate("/home");
  };

  return (
    <div className="wrap">
      <video
        className="video"
        poster="https://knife.media/wp-content/themes/knife/assets/images/poster-error.jpg"
        autoPlay
        preload="true"
        loop
        muted
      >
        <source
          src="https://knife.media/wp-content/themes/knife/assets/video/video-error.mp4"
          type="video/mp4"
        />
      </video>

      <div className="message">
        <br />
        <br />
        <br />
        <h1 className="header">This page doesn't exist</h1>
        <p className="text2">
          Please go back to the{" "}
          <span
            className="text"
            onClick={goToHomePage}
            style={{ cursor: "pointer", color: "blue" }}
          >
            main page.
          </span>
          <br />
        </p>
      </div>
    </div>
  );
}

export default Page404;
