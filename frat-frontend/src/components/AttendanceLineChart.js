// src/components/AttendanceLineChart.js
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const AttendanceLineChart = ({ data }) => {
  if (data.length === 0) {
    return <div>No attendance records available for analysis.</div>;
  }

  // Prepare chart data
  const attendanceCounts = data.reduce((acc, record) => {
    const date = record.date;
    acc[date] = acc[date] || { present: 0, absent: 0 };
    if (record.status === 'Present') {
      acc[date].present += 1;
    } else {
      acc[date].absent += 1;
    }
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(attendanceCounts),
    datasets: [
      {
        label: 'Present',
        data: Object.values(attendanceCounts).map(count => count.present),
        fill: false,
        backgroundColor: 'rgba(75, 192, 192, 1)',
        borderColor: 'rgba(75, 192, 192, 1)',
      },
      {
        label: 'Absent',
        data: Object.values(attendanceCounts).map(count => count.absent),
        fill: false,
        backgroundColor: 'rgba(255, 99, 132, 1)',
        borderColor: 'rgba(255, 99, 132, 1)',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div style={{ width: '100%', height: '300px' }}>
      <h2>Attendance Trends</h2>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default AttendanceLineChart;
