const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const multer = require('multer');
require('dotenv').config();

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.static('public')); // Serve static files from the 'public' directory

// Set up multer for form data
const upload = multer(); // Initialize multer without any storage configuration

// Email configuration
const transporter = nodemailer.createTransport({
    service: 'Gmail', // or your email service
    auth: {
        user: process.env.EMAIL_USER, // Your email from .env
        pass: process.env.EMAIL_PASS, // Your app-specific password from .env
    },
});

// Route to handle form submission
app.post('/submit', upload.none(), (req, res) => {
    console.log('Received data:', req.body); // Log the incoming request body

    const { firstName, date, email, phone, comments } = req.body;

    // Log extracted data for debugging
    console.log('Extracted Data:', { firstName, date, email, phone, comments });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: 'aparnaagencies9099@gmail.com', // Your recipient email
        subject: 'New Client Submission',
        text: `You have a new client submission:\n\nName: ${firstName}\nDate: ${date}\nEmail: ${email}\nPhone: ${phone}\nComments: ${comments}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).send({ success: false, message: 'Error sending email' });
        }
        res.send({ success: true, message: 'Form submitted successfully!' });
    });
});

// Route for the root URL
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html'); // Serve the HTML file
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});