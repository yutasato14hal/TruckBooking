import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const HomePage = () => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className="home-page">
      <h1>ようこそ、トラック配車サービスへ</h1>
      <p>ログインまたは新規登録を選択してください：</p>
      <div className="auth-links">
        <button onClick={() => handleNavigate('/login')} className="auth-link">ログイン</button>
        <button onClick={() => handleNavigate('/register')} className="auth-link">新規登録</button>
      </div>
    </div>
  );
};

export default HomePage;
