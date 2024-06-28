import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const UnauthorizedPage = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/');
  };

  return (
    <div className="auth-form">
      <h1>Unauthorized</h1>
      <p>You do not have access to this page.</p>
      <button onClick={handleGoBack}>Go Back</button>
    </div>
  );
};

export default UnauthorizedPage;
