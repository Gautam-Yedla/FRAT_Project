import React, { useEffect, useState } from 'react';

function AttendanceRecords() {
    const [records, setRecords] = useState([]);
    const [error, setError] = useState(null);

    // Fetching attendance records
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/attendance');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setRecords(data);
            } catch (error) {
                console.error('Error fetching attendance:', error);
                setError('Failed to fetch attendance records.');
            }
        };

        fetchData();
    }, []);

    // Function to send email notification
    const sendEmail = async (studentName, studentEmail) => {
        try {
            const response = await fetch('http://localhost:5000/api/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ studentName, studentEmail }),
            });

            if (!response.ok) {
                throw new Error('Failed to send email');
            }

            const result = await response.json();
            console.log('Email sent successfully:', result);
        } catch (error) {
            console.error('Error sending email:', error);
        }
    };

    // Function to record attendance
    const recordAttendance = async (studentId) => {
        try {
            const response = await fetch('http://localhost:5000/api/attendance', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ studentId }),
            });

            if (!response.ok) {
                throw new Error('Failed to record attendance');
            }

            const result = await response.json();
            console.log(result.message);

            // Fetch the student's email and name after recording attendance
            const studentResponse = await fetch(`http://localhost:5000/api/students/${studentId}`);
            const studentData = await studentResponse.json();
            
            sendEmail(studentData.name, studentData.email);
        } catch (error) {
            console.error('Error recording attendance:', error);
        }
    };

    return (
        <div>
            <h2>Attendance Records</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Roll No</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {records.map(record => (
                        <tr key={`${record.roll_no}-${record.date}`}>
                            <td>{record.student_name}</td>
                            <td>{record.roll_no}</td>
                            <td>{new Date(record.date).toLocaleDateString()}</td>
                            <td>{record.status}</td>
                            <td>
                                <button onClick={() => recordAttendance(record.student_id)}>Mark Attendance</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default AttendanceRecords;
