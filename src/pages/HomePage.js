import React from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import "../CSS/HomePage.css";
const HomePage = () => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className="home-page">
      <div className="flexContainer">
        <div className="titles">
          <span className="subTitle">物流の未来を運ぶ</span>
          <h1>
            <span className="titleBlue">Truck</span>Booking
          </h1>
        </div>
        <div className="auth-links">
          <button
            onClick={() => handleNavigate("/login")}
            className="auth-link"
          >
            ログイン
          </button>
          <button
            onClick={() => handleNavigate("/register")}
            className="auth-link"
          >
            新規登録
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
