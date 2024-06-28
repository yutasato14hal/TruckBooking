import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import '../App.css';

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
    <form onSubmit={handleLogin} className="auth-form">
      <h1>ログイン</h1>
      <select value={role} onChange={(e) => setRole(e.target.value)} required>
        <option value="">ログイン種類を選択してください</option>
        <option value="shipper">荷主</option>
        <option value="company">企業</option>
        <option value="driver">ドライバー</option>
      </select>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="メールアドレス"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="パスワード"
        required
      />
      <button type="submit">ログイン</button>
      <button onClick={() => navigate('/register')} className="auth-link">新規登録</button>
    </form>
  );
};

export default LoginPage;
