import React, { useEffect, useState } from 'react';
import AttendanceTable from '../components/AttendanceTable'; 
import AttendanceChart from '../components/charts'; 
import AttendanceAnalysis from '../components/AttendanceAnalysis'; 
import AttendanceLineChart from '../components/AttendanceLineChart'; 
import AttendancePieChart from '../components/AttendancePieChart'; 
import { getAttendanceData } from '../services/api'; 
import DateRangeFilter from '../components/DateRangeFilter'; 
import { Button } from '@mui/material';

const Dashboard = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        const data = await getAttendanceData();
        console.log('Fetched Attendance Data for Dashboard:', data); // Log to verify structure
        setAttendanceData(data);
        setFilteredData(data); 
      } catch (error) {
        console.error('Error fetching attendance data:', error);
      }
    };

    fetchAttendanceData();
  }, []);

  const handleFilterChange = ({ startDate, endDate }) => {
    const filtered = attendanceData.filter(record => {
      const recordDate = new Date(record.date);
      return (
        (!startDate || recordDate >= new Date(startDate)) &&
        (!endDate || recordDate <= new Date(endDate))
      );
    });
    setFilteredData(filtered);
  };

  const handleExport = () => {
    const csvData = attendanceData.map(row => ({
      date: row.date,
      name: row.name, // Ensure name is included
      roll_no: row.roll_no, // Ensure roll_no is included
      status: row.status,
    }));
    const csv = [
      ['Date', 'Name', 'Roll Number', 'Status'], // Add name to header
      ...csvData.map(item => [item.date, item.name, item.roll_no, item.status]),
    ].map(e => e.join(",")).join("\n");

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'attendance_data.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>FRAT Dashboard</h1>
      <DateRangeFilter onFilterChange={handleFilterChange} />
      <Button variant="contained" color="secondary" onClick={handleExport}>
        Export Attendance
      </Button>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ flex: 1 }}>
          <h2>Attendance Records</h2>
          <AttendanceTable records={filteredData} />
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
          <div style={{ flex: '1 1 300px', minWidth: '250px' }}>
            <AttendanceChart data={filteredData} />
          </div>
          <div style={{ flex: '1 1 300px', minWidth: '250px' }}>
            <AttendanceAnalysis data={filteredData} />
          </div>
          <div style={{ flex: '1 1 300px', minWidth: '250px' }}>
            <AttendanceLineChart data={filteredData} />
          </div>
          <div style={{ flex: '1 1 300px', minWidth: '250px' }}>
            <AttendancePieChart data={filteredData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
