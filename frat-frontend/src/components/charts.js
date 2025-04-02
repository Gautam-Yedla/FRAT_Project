// src/components/AttendanceChart.js
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register the components with ChartJS
ChartJS.register(ArcElement, Tooltip, Legend);

const AttendanceChart = () => {
  const data = {
    labels: ['Present', 'Absent'],
    datasets: [
      {
        data: [80, 20],
        backgroundColor: ['#4CAF50', '#FF6384'],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div style={{ width: '100%', height: '300px' }}>
      <Pie data={data} options={chartOptions} />
    </div>
  );
};

export default AttendanceChart;
