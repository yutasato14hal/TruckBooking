import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import "../App.css";
import "../CSS/AuthPages.css";

const RegisterPage = () => {
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [address, setAddress] = useState("");
  const [additionalAddress, setAdditionalAddress] = useState("");
  const [areas, setAreas] = useState([]);
  const [companyId, setCompanyId] = useState(""); // 追加

  const handleZipcodeChange = async (e) => {
    const { value } = e.target;
    setZipcode(value);
    if (value.length === 7) {
      const response = await fetch(
        `https://zipcloud.ibsnet.co.jp/api/search?zipcode=${value}`
      );
      const data = await response.json();
      if (data.results) {
        const address = data.results[0];
        const fullAddress = `${address.address1}${address.address2}${address.address3}`;
        setAreas([fullAddress]);
        setAddress(fullAddress);
      } else {
        setAreas([]);
        setAddress("");
        alert("有効な郵便番号を入力してください。");
      }
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const userDoc = {
        uid: user.uid,
        name,
        email,
        role,
      };

      if (role === "shipper") {
        userDoc.address = address;
        userDoc.zipcode = zipcode;
        userDoc.additionalAddress = additionalAddress;
      } else if (role === "company") {
        userDoc.companyName = companyName;
        userDoc.companyId = uuidv4(); // 企業IDを自動生成
      } else if (role === "driver") {
        userDoc.licenseNumber = licenseNumber;
        userDoc.companyId = companyId; // フォームから入力された企業IDを使用
      }

      await setDoc(doc(db, "users", user.uid), userDoc);

      alert("登録に成功しました");
    } catch (error) {
      console.error("登録エラー: ", error);
      alert("登録に失敗しました");
    }
  };

  return (
    <>
      <h1 className="title">
        <span className="titleBlueZone">Truck</span>Booking
      </h1>

      <form onSubmit={handleRegister} className="auth-form">
        <div className="formArea">
          <label>
            職種<span className="required">*</span>
          </label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="">種類を選択してください</option>
            <option value="shipper">荷主</option>
            <option value="company">企業</option>
            <option value="driver">ドライバー</option>
          </select>
        </div>
        <div className="formArea">
          <label>
            名前<span className="required">*</span>
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="名前"
            required
          />
        </div>
        <div className="formArea">
          <label>
            メールアドレス<span className="required">*</span>
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="メールアドレス"
            required
          />
        </div>
        <div className="formArea">
          <label>
            パスワード<span className="required">*</span>
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="パスワード"
            required
          />
        </div>
        {role === "company" && (
  <div className="formArea">
    <label>
      会社名<span className="required">*</span>
    </label>
    <input
      type="text"
      value={companyName}
      onChange={(e) => setCompanyName(e.target.value)}
      placeholder="会社名"
      required
    />
  </div>
)}
{role === "shipper" && (
  <>
    <div className="formArea">
      <label>
        郵便番号<span className="required">*</span>
      </label>
      <input
        type="text"
        value={zipcode}
        onChange={handleZipcodeChange}
        placeholder="郵便番号"
        required
      />
    </div>
    <div className="formArea">
      <label>
        住所1<span className="required">*</span>
      </label>
      <select
        name="address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        required
      >
        <option value="">住所1を選択してください</option>
        {areas.map((area, index) => (
          <option key={index} value={area}>
            {area}
          </option>
        ))}
      </select>
    </div>
    <div className="formArea">
      <label>
        住所2<span className="required">*</span>
      </label>
      <input
        type="text"
        value={additionalAddress}
        onChange={(e) => setAdditionalAddress(e.target.value)}
        placeholder="住所2"
        required
      />
    </div>
  </>
)}
{role === "driver" && (
  <>
    <div className="formArea">
      <label>
        免許証番号<span className="required">*</span>
      </label>
      <input
        type="text"
        value={licenseNumber}
        onChange={(e) => setLicenseNumber(e.target.value)}
        placeholder="免許証番号"
        required
      />
    </div>
    <div className="formArea">
      <label>
        企業ID<span className="required">*</span>
      </label>
      <input
        type="text"
        value={companyId}
        onChange={(e) => setCompanyId(e.target.value)}
        placeholder="企業ID"
        required
      />
    </div>
  </>
)}
        <button className="button signup" type="submit">登録</button>
      </form>
    </>
  );
};

export default RegisterPage;
