import React from 'react';

const AttendanceTable = () => {
  // Placeholder data
  const attendanceData = [
    { name: 'Gautam', rollNo: '322506402458', date: '2024-11-01', status: 'Present' },
    // Add more data here
  ];

  return (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Roll No</th>
          <th>Date</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {attendanceData.map((record, index) => (
          <tr key={index}>
            <td>{record.name}</td>
            <td>{record.rollNo}</td>
            <td>{record.date}</td>
            <td>{record.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AttendanceTable;
