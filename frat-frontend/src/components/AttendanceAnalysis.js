// src/components/AttendanceAnalysis.js
import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import './AttendanceAnalysis.css'; // Make sure this file exists for styling

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AttendanceAnalysis = ({ data }) => {
  if (data.length === 0) {
    return <div>No attendance records available for analysis.</div>;
  }

  // Calculate attendance counts
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

  // Prepare chart data
  const chartData = {
    labels: Object.keys(attendanceCounts),
    datasets: [
      {
        label: 'Present',
        data: Object.values(attendanceCounts).map(count => count.present),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
      {
        label: 'Absent',
        data: Object.values(attendanceCounts).map(count => count.absent),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      },
    ],
  };

  return (
    <div className="attendance-analysis" style={{ width: '100%', maxWidth: '600px', margin: '0 auto' }}>
      <h2>Attendance Analysis</h2>
      <Bar data={chartData} />
    </div>
  );
};

export default AttendanceAnalysis;
