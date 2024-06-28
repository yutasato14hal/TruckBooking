import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import '../App.css';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('ログアウトエラー: ', error);
    }
  };

  return (
    <button onClick={handleLogout} className="logout-button">
      ログアウト
    </button>
  );
};

export default LogoutButton;
