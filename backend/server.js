const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'W7301@jqir#',
    database: 'FRAT_Attendance'
});

db.connect(err => {
    if (err) {
        console.error('Database connection error:', err);
    } else {
        console.log('Connected to MySQL database');
    }
});

app.get('/', (req, res) => {
    res.send('Server is running');
});

// Fetch attendance records with formatted date
app.get('/api/attendance', (req, res) => {
    const query = `
        SELECT s.name AS student_name, 
               s.roll_no, 
               DATE_FORMAT(a.date, "%Y-%m-%d %H:%i:%s") AS date, 
               a.status 
        FROM attendance a 
        JOIN students s ON a.student_id = s.id;
    `;
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching attendance:', err);
            res.status(500).json({ error: 'Database error' });
        } else {
            res.json(results);
        }
    });
});

// Record attendance with current timestamp
app.post('/api/attendance', (req, res) => {
    const { studentId, status } = req.body; // Accept status from the request
    const currentDateTime = new Date().toISOString().slice(0, 19).replace('T', ' ');

    const query = 'INSERT INTO attendance (student_id, date, status) VALUES (?, ?, ?)';
    db.query(query, [studentId, currentDateTime, status], (err, results) => {
        if (err) {
            console.error('Error inserting attendance:', err);
            res.status(500).json({ error: 'Database error' });
        } else {
            const emailQuery = 'SELECT name, email FROM students WHERE id = ?';
            db.query(emailQuery, [studentId], (err, emailResults) => {
                if (err) {
                    console.error('Error fetching student email:', err);
                } else if (emailResults.length > 0) {
                    const studentName = emailResults[0].name;
                    const studentEmail = emailResults[0].email;

                    // Send email notification if the student is marked absent
                    if (status === 'Absent') {
                        sendEmailNotification(studentName, studentEmail, 'absent');
                    } else {
                        // Send notification for presence if needed
                        sendEmailNotification(studentName, studentEmail, 'present');
                    }
                } else {
                    console.log('No student found with the given ID');
                }
            });
            res.json({ success: true, message: 'Attendance recorded successfully' });
        }
    });
});

// New Endpoint to send email notification directly
app.post('/api/send-email', (req, res) => {
    const { studentName, studentEmail, status } = req.body;
    sendEmailNotification(studentName, studentEmail, status);
    res.json({ success: true, message: 'Email sent successfully' });
});

// Function to send email notification
const sendEmailNotification = (studentName, studentEmail, status) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'yedlagautam822@gmail.com',
            pass: 'gvuz gjia cjqa hsro' // Consider using environment variables for security
        }
    });

    const subject = status === 'absent' ? 'Attendance Notification - Absent' : 'Attendance Notification - Present';
    const text = status === 'absent' 
        ? `Hello ${studentName}, your attendance has been marked as absent. Please ensure to inform your instructor.`
        : `Hello ${studentName}, your attendance has been recorded successfully.`;

    const mailOptions = {
        from: 'yedlagautam822@gmail.com',
        to: studentEmail,
        subject: subject,
        text: text
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error sending email: ', error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
};

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
