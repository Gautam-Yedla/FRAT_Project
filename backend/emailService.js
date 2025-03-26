// const nodemailer = require('nodemailer');

// const { sendEmailNotification } = require('./emailService');

// // Endpoint to send email notifications
// app.post('/api/send-email', (req, res) => {
//     const { studentName, studentEmail } = req.body;
//     sendEmailNotification(studentName, studentEmail);
//     res.json({ success: true });
// });


// // Create a transporter object with the required configuration
// const transporter = nodemailer.createTransport({
//     service: 'gmail', // Use your email service provider (e.g., 'gmail')
//     auth: {
//         user: 'yedlagautam822@gmail.com', // Your email
//         pass: 'gvuz gjia cjqa hsro' // Your email password or app-specific password
//     }
// });

// // Function to send email notification
// const sendEmailNotification = (studentName, studentEmail) => {
//     const mailOptions = {
//         from: 'yedlagautam822@gmail.com', // Use your email here
//         to: studentEmail,
//         subject: 'Attendance Recorded',
//         text: `Hello ${studentName}, your attendance has been recorded.`
//     };

//     transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//             console.log('Error sending email: ', error);
//         } else {
//             console.log('Email sent: ' + info.response);
//         }
//     });
// };


// // Add this endpoint to your emailService.js or server.js file
// app.post('/api/send-email', (req, res) => {
//   const { studentName, studentEmail } = req.body;
//   sendEmailNotification(studentName, studentEmail);
//   res.json({ success: true });
// });



// // Export the sendEmailNotification function
// module.exports = {
//     sendEmailNotification, 
// };
