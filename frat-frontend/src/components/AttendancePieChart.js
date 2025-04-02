// src/components/AttendancePieChart.js
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const AttendancePieChart = ({ data }) => {
  if (data.length === 0) {
    return <div>No attendance records available for analysis.</div>;
  }

  const attendanceCounts = data.reduce((acc, record) => {
    acc[record.status] = (acc[record.status] || 0) + 1;
    return acc;
  }, { Present: 0, Absent: 0 });

  const chartData = {
    labels: ['Present', 'Absent'],
    datasets: [
      {
        data: [attendanceCounts.Present, attendanceCounts.Absent],
        backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div style={{ width: '100%', height: '300px' }}>
      <h2>Attendance Breakdown</h2>
      <Pie data={chartData} options={chartOptions} />
    </div>
  );
};

export default AttendancePieChart;
