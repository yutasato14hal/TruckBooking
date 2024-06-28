// DoughnutChart.js
import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const gender_data = {
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
      borderRadius: 0, // ボーダーの角を丸くする
      spacing: -2, // セグメント間のスペース
    },
  ],
};

const gender_options = {
  cutout: '80%', // ドーナツの中央の穴のサイズ
  circumference: 360, // 円の周囲長の角度
  rotation: 225, // 円の回転角度
  plugins: {
    legend: {
      display: true,
      position: 'right', // レジェンドを右に表示
    },
  },
};

function DoughnutChart() {
  return (
    <div className="doughnutContainer">
      <Doughnut data={gender_data} options={gender_options} />
    </div>
  );
}

export default DoughnutChart;
