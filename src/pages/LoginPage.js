import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import '../App.css';
import '../CSS/AuthPages.css';
import HomePage from './HomePage';
import { LineElement } from 'chart.js';


const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Fetch user role from Firestore
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        if (userData.role === role) {
          navigate(`/${role}`);
        } else {
          alert('選択されたロールが一致しません');
        }
      } else {
        alert('ユーザー情報が見つかりません');
      }
    } catch (error) {
      console.error('ログインエラー: ', error);
      alert('ログインに失敗しました');
    }
  };


  return (
    <>
    <h1 className="title"><span className="titleBlueZone">Truck</span>Booking</h1>
    <form onSubmit={handleLogin} className="auth-form">
      <div className="formArea">
        <label>職種<span className="required">*</span></label>
        <select value={role} onChange={(e) => setRole(e.target.value)} required>
          <option value="">職種を選択してください。</option>
          <option value="shipper">荷主</option>
          <option value="company">企業</option>
          <option value="driver">ドライバー</option>
        </select>
      </div>
      <div className="formArea">
        <label>メールアドレス<span className="required">*</span></label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="メールアドレス"
          required
        />
      </div>
      <div className="formArea">
        <label>パスワード<span className="required">*</span></label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="パスワード"
          required
        />
      </div>
      <div className="buttonArea">
      <button type="submit" className="button login">ログイン</button>
      <button onClick={() => navigate('/register')} className="auth-link signup button ">新規登録</button></div>
    </form>
    </>
  );
};

export default LoginPage;
