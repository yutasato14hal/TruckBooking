import React from 'react';
import './App-test.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import Reactchart from './ReactChart';

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, Title, Tooltip, Legend, PointElement } from 'chart.js';
import { Chart } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const graph_data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      type: 'line',
      label: 'Line Dataset',
      data: [65, 59, 80, 81, 56, 55, 40],
      borderColor: 'rgb(75, 192, 192)',
      borderWidth: 2,
      fill: false,
    },
    {
      type: 'bar',
      label: 'Bar Dataset',
      data: [8, 48, 40, 19, 86, 27, 90],
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgb(75, 192, 192)',
      borderWidth: 1,
    },
  ],
};

const graph_options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Mixed Chart Example',
    },
  },
};


function App() {
  return (
    <>
      <header className='header'>
        <h1 className='service-title'>Truck Booking</h1>
      </header>
      <div className="App">
        <Tabs>
          <TabList>
            <Tab>Tab1</Tab>
            <Tab>Tab2</Tab>
            <Tab>Tab3</Tab>
          </TabList>

          <TabPanel>
          <Chart type='bar' data={graph_data} options={graph_options} />;
          </TabPanel>
          <TabPanel>
            <Reactchart />
          </TabPanel>
          <TabPanel>
            <h2>Any content 3</h2>
            <p>Content for Tab 3 goes here.</p>
          </TabPanel>
        </Tabs>
      </div>
    </>
  );
}

export default App;
