import React, { useEffect, useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import LogoutButton from '../components/LogoutButton';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import { auth, db } from '../firebase';
import '../App.css';
import './test.css';

function CompanyMyPage() {
  const [userData, setUserData] = useState({});
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchCompanyData = async () => {
      const authUser = auth.currentUser;
      if (authUser) {
        const docRef = doc(db, 'users', authUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        }
      }
    };

    fetchCompanyData();
  }, []);

  // 配送依頼リスト
  useEffect(() => {
    const fetchRequests = async () => {
      const querySnapshot = await getDocs(collection(db, 'requests'));
      const requestsList = await Promise.all(
        querySnapshot.docs.map(async (docSnapshot) => {
          const requestData = docSnapshot.data();
          if (requestData.shipperId) {
            const shipperRef = doc(db, 'users', requestData.shipperId);
            const shipperSnap = await getDoc(shipperRef);
            if (shipperSnap.exists()) {
              return {
                ...requestData,
                shipperAddress: shipperSnap.data().address,
              };
            }
          }
          return requestData;
        })
      );
      setRequests(requestsList);
    };

    fetchRequests();
  }, []);

  const handleDispatch = async (request) => {
    // トラックを配車するロジックをここに追加します。
    alert('トラックが配車されました');
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
            <Tab>配送依頼</Tab>
          </TabList>

          <TabPanel>
            <div className="user-page">
              <h1>ドライバーマイページ</h1>
              <p><strong>名前:</strong> {userData.name}</p>
              <p><strong>メールアドレス:</strong> {userData.email}</p>
            </div>
          </TabPanel>
          <TabPanel>
            <h1>依頼リスト</h1>
            {requests.length > 0 ? (
              <ul>
                {requests.map((request, index) => (
                  <li key={index}>
                    <p><strong>大荷物:</strong> {request.largeItems}</p>
                    <p><strong>中荷物:</strong> {request.mediumItems}</p>
                    <p><strong>小荷物:</strong> {request.smallItems}</p>
                    <p><strong>配送先住所:</strong> {request.address}</p>
                    <p><strong>集荷先住所:</strong> {request.shipperAddress || 'N/A'}</p> {/* 集荷先住所を表示 */}
                    <button onClick={() => handleDispatch(request)}>トラックを配車する</button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>依頼がありません。</p>
            )}
          </TabPanel>
        </Tabs>
      </div>
    </>
  );
}

export default CompanyMyPage;
