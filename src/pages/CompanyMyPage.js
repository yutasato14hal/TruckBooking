import React, { useEffect, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import LogoutButton from "../components/LogoutButton";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { auth, db } from "../firebase";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  PointElement,
} from "chart.js";
import { Chart } from "react-chartjs-2";
import MyPageiCon from "../images/MyPageIconWhite.png";

import "../CSS/Company.css";
import "../CSS/Header.css";
ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

// 円パラメータ
const indexMain_Data = {
  backgroundColor: ["rgb(76, 112, 255)", "rgb(240, 240, 240)"],
  borderColor: ["rgb(76, 112, 255)", "rgb(230, 230, 230)"],
  borderWidth: 1,
  borderRadius: 100,
  spacing: -2,
};

const Main_Data1 = {
  data: [95, 5],
  ...indexMain_Data,
};
const Main_Data2 = {
  data: [80, 20],
  ...indexMain_Data,
};
const Main_Data3 = {
  data: [20, 80],
  ...indexMain_Data,
};
const Main_Data4 = {
  data: [40, 60],
  ...indexMain_Data,
};
const Main_Data5 = {
  data: [40, 60],
  ...indexMain_Data,
};
const Main_Data6 = {
  data: [40, 60],
  ...indexMain_Data,
};

const parameter_data1 = {
  datasets: [
    {
      ...Main_Data1,
    },
  ],
};
const parameter_data2 = {
  datasets: [
    {
      ...Main_Data2,
    },
  ],
};
const parameter_data3 = {
  datasets: [
    {
      ...Main_Data3,
    },
  ],
};
const parameter_data4 = {
  datasets: [
    {
      ...Main_Data4,
    },
  ],
};
const parameter_data5 = {
  datasets: [
    {
      ...Main_Data5,
    },
  ],
};
const parameter_data6 = {
  datasets: [
    {
      ...Main_Data6,
    },
  ],
};
const parameter_options = {
  cutout: "90%",
  circumference: 270,
  rotation: 225,
};

// 棒 & 線グラフ
const graph_data = {
  labels: [
    "1月",
    "2月",
    "3月",
    "4月",
    "5月",
    "6月",
    "7月",
    "8月",
    "9月",
    "10月",
    "11月",
    "12月",
  ],
  datasets: [
    {
      type: "line",
      label: "配達数",
      data: [4, 9, 28, 25, 33, 45, 49, 82, 65, 72, 85, 82],
      borderColor: "rgb(75, 192, 192)",
      borderWidth: 2,
      fill: false,
    },
    {
      type: "bar",
      label: "売上",
      data: [5, 12, 30, 25, 30, 47, 50, 70, 61, 75, 82, 73],
      backgroundColor: "rgba(75, 192, 192, 0.2)",
      borderColor: "rgb(75, 192, 192)",
      borderWidth: 1,
    },
  ],
};

const graph_options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
    },
  },
};

// 性別グラフ
const gender_data = {
  labels: ["Woman", "Man"],
  datasets: [
    {
      label: "# of Votes",
      data: [11, 19],
      backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
      borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
      borderWidth: 1,
      borderRadius: 0, // ボーダーの角を丸くする
      spacing: -2, // セグメント間のスペース
    },
  ],
};

const gender_options = {
  cutout: "60%", // ドーナツの中央の穴のサイズ
  circumference: 360, // 円の周囲長の角度
  rotation: 225, // 円の回転角度
  plugins: {
    legend: {
      display: true,
      position: "right", // レジェンドを右に表示
    },
  },
};

function CompanyMyPage() {
  const [userData, setUserData] = useState({});
  const [drivers, setDrivers] = useState([]);

  // 企業情報
  useEffect(() => {
    const fetchCompanyData = async () => {
      const authUser = auth.currentUser;
      if (authUser) {
        const docRef = doc(db, "users", authUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        }
      }
    };

    fetchCompanyData();
  }, []);

  // ドライバーリスト
  useEffect(() => {
    if (userData.companyId) {
      const fetchDrivers = async () => {
        const driversRef = collection(db, "users");
        const q = query(
          driversRef,
          where("companyId", "==", userData.companyId),
          where("role", "==", "driver")
        );
        const querySnapshot = await getDocs(q);
        const driversList = querySnapshot.docs.map((doc) => doc.data());
        setDrivers(driversList);
      };

      fetchDrivers();
    }
  }, [userData.companyId]);

  return (
    <>
      <header className="header">
        <h1>
          <span className="titleBlue">Truck</span>Booking
        </h1>
        <div className="dropdown">
          <input type="checkbox" id="dropdown-toggle" />
          <label htmlFor="dropdown-toggle" className="dropdown-button">
            <img
              src={MyPageiCon}
              alt="Dropdown Icon"
              className="dropdown-icon"
            />
            <p>{userData.companyName}</p>
            <span className="arrow"></span>
          </label>

          <div className="dropdown-content">
            <div>
              <h1>企業マイページ</h1>
              <p>
                <strong>名前:</strong> {userData.name}
              </p>
              <p>
                <strong>会社名:</strong> {userData.companyName}
              </p>
              <p>
                <strong>企業ID:</strong> {userData.companyId}
              </p>{" "}
              {/* 企業IDを表示 */}
              <p>
                <strong>メールアドレス:</strong> {userData.email}
              </p>
            </div>
            <LogoutButton />
          </div>
        </div>
      </header>
      <div className="App">
        <Tabs>
          <TabList>
            <Tab>ダッシュボード</Tab>
            <Tab>登録ドライバー一覧</Tab>
            <Tab>配送依頼</Tab>
          </TabList>

          <TabPanel className="react-tabs__tab-panel--0">
            <div className="parameter">
              <div className="chart-container">
                <Doughnut data={parameter_data1} options={parameter_options} />
                <div className="chart-overlay">
                  <div className="chart-center-text">
                    <h2>95%</h2>
                    <p>ドライバー稼働率</p>
                  </div>
                </div>
              </div>
              <div className="chart-container">
                <Doughnut data={parameter_data2} options={parameter_options} />
                <div className="chart-overlay">
                  <div className="chart-center-text">
                    <h2>80%</h2>
                    <p>ドライバーの残業率</p>
                  </div>
                </div>
              </div>
              <div className="chart-container">
                <Doughnut data={parameter_data3} options={parameter_options} />
                <div className="chart-overlay">
                  <div className="chart-center-text">
                    <h2>20%</h2>
                    <p>待機ドライバー割合</p>
                  </div>
                </div>
              </div>
              <div className="chart-container">
                <Doughnut data={parameter_data4} options={parameter_options} />
                <div className="chart-overlay">
                  <div className="chart-center-text">
                    <h2>40%</h2>
                    <p>既定残業時間超過割合</p>
                  </div>
                </div>
              </div>
              <div className="chart-container">
                <Doughnut data={parameter_data5} options={parameter_options} />
                <div className="chart-overlay">
                  <div className="chart-center-text">
                    <h2>20%</h2>
                    <p>事故・違反発生率</p>
                  </div>
                </div>
              </div>
              <div className="chart-container">
                <Doughnut data={parameter_data6} options={parameter_options} />
                <div className="chart-overlay">
                  <div className="chart-center-text">
                    <h2>15%</h2>
                    <p>遅延率</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="graph_gender_area">
              <div className="graph-container">
                <Chart type="bar" data={graph_data} options={graph_options} />
              </div>
              <div className="doughnutContainer">
                <Doughnut data={gender_data} options={gender_options} />
              </div>
            </div>
          </TabPanel>
          <TabPanel className="react-tabs__tab-panel">
            <h2>登録ドライバー一覧</h2>
            {drivers.length > 0 ? (
              <ul>
                {drivers.map((driver, index) => (
                  <li key={index}>
                    <p>
                      <strong>名前:</strong> {driver.name}
                    </p>
                    <p>
                      <strong>メールアドレス:</strong> {driver.email}
                    </p>
                    <p>
                      <strong>免許証番号:</strong> {driver.licenseNumber}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>登録されたドライバーがいません。</p>
            )}
          </TabPanel>
          <TabPanel className="react-tabs__tab-panel">
            <h1>依頼済リスト</h1>
          </TabPanel>
        </Tabs>
      </div>
    </>
  );
}

export default CompanyMyPage;
