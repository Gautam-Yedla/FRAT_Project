import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField } from '@mui/material';

const AttendanceTable = ({ records }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Log the initial records
  console.log('Attendance Records:', records);

  const filteredRecords = Array.isArray(records)
    ? records.filter(record => {
        const studentName = record?.student_name || '';
        const roll_no = record?.roll_no || '';
        const matchesName = studentName.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRollNo = roll_no.toLowerCase().includes(searchTerm.toLowerCase());
        
        // Log for debugging
        console.log(`Checking ${studentName} and ${roll_no} against "${searchTerm}": Name Match: ${matchesName}, Roll No Match: ${matchesRollNo}`);

        return matchesName || matchesRollNo;
      })
    : [];

  console.log('Filtered Records:', filteredRecords); // Check filtered results

  return (
    <div>
      <TextField
        label="Search Students"
        variant="outlined"
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 2, width: '100%' }}
      />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Student Name</TableCell>
              <TableCell>Roll Number</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRecords.map((record, index) => (
              <TableRow key={index}>
                <TableCell>{new Date(record.date).toLocaleDateString()}</TableCell>
                <TableCell>{record.student_name}</TableCell>  
                <TableCell>{record.roll_no}</TableCell>
                <TableCell>{record.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AttendanceTable;
