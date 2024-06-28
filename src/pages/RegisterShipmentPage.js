import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import '../App.css';

const RegisterShipmentPage = () => {
  const [shipment, setShipment] = useState({
    largeItems: 0,
    mediumItems: 0,
    smallItems: 0,
    zipcode: '',
    address1: '',
    address2: ''
  });

  const [areas, setAreas] = useState([]);

  const fetchAreas = async (zipcode) => {
    try {
      const response = await fetch(`https://zipcloud.ibsnet.co.jp/api/search?zipcode=${zipcode}`);
      const data = await response.json();
      if (data.results) {
        const address = data.results[0];
        const fullAddress = `${address.address1}${address.address2}${address.address3}`;
        setAreas([fullAddress]);
        setShipment((prev) => ({ ...prev, address1: fullAddress }));
      } else {
        setAreas([]);
        setShipment((prev) => ({ ...prev, address1: '' }));
        alert('有効な郵便番号を入力してください。');
      }
    } catch (error) {
      console.error('住所データ取得エラー: ', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShipment((prev) => ({ ...prev, [name]: value }));
  };

  const handleZipcodeChange = (e) => {
    const { value } = e.target;
    setShipment((prev) => ({ ...prev, zipcode: value }));
    if (value.length === 7) {
      fetchAreas(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'shipments'), shipment);
      alert('Shipment registered successfully!');
    } catch (error) {
      console.error('登録エラー: ', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h1>Shipment Registration</h1>
      <label>Large Items</label>
      <input
        type="number"
        name="largeItems"
        value={shipment.largeItems}
        onChange={handleChange}
        min="0"
      />
      <label>Medium Items</label>
      <input
        type="number"
        name="mediumItems"
        value={shipment.mediumItems}
        onChange={handleChange}
        min="0"
      />
      <label>Small Items</label>
      <input
        type="number"
        name="smallItems"
        value={shipment.smallItems}
        onChange={handleChange}
        min="0"
      />
      <label>Zipcode</label>
      <input
        type="text"
        name="zipcode"
        value={shipment.zipcode}
        onChange={handleZipcodeChange}
        required
      />
      <label>Address 1</label>
      <select
        name="address1"
        value={shipment.address1}
        onChange={handleChange}
        required
      >
        <option value="">Select Address</option>
        {areas.map((area, index) => (
          <option key={index} value={area}>
            {area}
          </option>
        ))}
      </select>
      <label>Address 2</label>
      <input
        type="text"
        name="address2"
        value={shipment.address2}
        onChange={handleChange}
        required
      />
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterShipmentPage;
