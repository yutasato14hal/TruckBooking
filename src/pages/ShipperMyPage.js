import React, { useEffect, useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import LogoutButton from '../components/LogoutButton';
import { doc, getDoc, collection, addDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import '../App.css';

function ShipperMyPage() {

  // 荷主情報
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const fetchShipperData = async () => {
      const authUser = auth.currentUser;
      if (authUser) {
        const docRef = doc(db, 'users', authUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        }
      }
    };

    fetchShipperData();
  }, []);

  // 荷物依頼
  const [largeItems, setLargeItems] = useState(0);
  const [mediumItems, setMediumItems] = useState(0);
  const [smallItems, setSmallItems] = useState(0);
  const [zipcode, setZipcode] = useState('');
  const [address, setAddress] = useState('');
  const [additionalAddress, setAdditionalAddress] = useState('');
  const [areas, setAreas] = useState([]);

  const handleZipcodeChange = async (e) => {
    const { value } = e.target;
    setZipcode(value);
    if (value.length === 7) {
      const response = await fetch(`https://zipcloud.ibsnet.co.jp/api/search?zipcode=${value}`);
      const data = await response.json();
      if (data.results) {
        const address = data.results[0];
        const fullAddress = `${address.address1}${address.address2}${address.address3}`;
        setAreas([fullAddress]);
        setAddress(fullAddress);
      } else {
        setAreas([]);
        setAddress('');
        alert('有効な郵便番号を入力してください。');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'requests'), {
        largeItems,
        mediumItems,
        smallItems,
        address: `${address} ${additionalAddress}`,
        shipperId: auth.currentUser.uid, // 荷主のIDを追加
        shipperAddress: `${userData.address} ${userData.additionalAddress}`, // 荷主の住所を追加
        status: 'pending',
      });
      alert('依頼が登録されました');
    } catch (error) {
      console.error('依頼登録エラー: ', error);
      alert('依頼の登録に失敗しました');
    }
  };

  return (
    <>
    <header className='header'>
      <h1 className='service-title'>Truck Booking</h1>
      <LogoutButton />
    </header>
    <div className="App">
      <Tabs>
        <TabList>
          <Tab>ダッシュボード</Tab>
          <Tab>荷物の依頼</Tab>
          <Tab></Tab>
        </TabList>

        <TabPanel>
          <h1>荷主マイページ</h1>
          <p><strong>会社名:</strong> {userData.name}</p>
          <p><strong>メールアドレス:</strong> {userData.email}</p>
          <p><strong>住所:</strong> {userData.address}{userData.additionalAddress}</p>
        </TabPanel>
        <TabPanel>
          <form onSubmit={handleSubmit} className="auth-form">
            <h1>依頼登録</h1>
            <label>大荷物の個数</label>
            <input
              type="number"
              value={largeItems}
              onChange={(e) => setLargeItems(e.target.value)}
              min="0"
            />
            <label>中荷物の個数</label>
            <input
              type="number"
              value={mediumItems}
              onChange={(e) => setMediumItems(e.target.value)}
              min="0"
            />
            <label>小荷物の個数</label>
            <input
              type="number"
              value={smallItems}
              onChange={(e) => setSmallItems(e.target.value)}
              min="0"
            />
            <label>郵便番号</label>
            <input
              type="text"
              value={zipcode}
              onChange={handleZipcodeChange}
              placeholder="郵便番号"
              required
            />
            <label>住所1</label>
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
            <label>住所2</label>
            <input
              type="text"
              value={additionalAddress}
              onChange={(e) => setAdditionalAddress(e.target.value)}
              placeholder="住所2"
              required
            />
            <button type="submit">登録</button>
          </form>
        </TabPanel>
        <TabPanel>
          <p>Coming Soon...</p>
        </TabPanel>
      </Tabs>
    </div>
    </>
  );
}

export default ShipperMyPage;
