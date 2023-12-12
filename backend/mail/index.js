
import nodemailer from 'nodemailer'
import 'dotenv/config'

const myEmail = 'zainjaved.fyp@gmail.com'
// getting environment variable
const {nodemailer_pass}= process.env

// Function to send an email
export const sendEmail = (toEmail, subject, htmlContent) => {
  // Create a nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: myEmail,
      pass: nodemailer_pass,
    },
  });

  // Email options
  const mailOptions = {
    from: myEmail,
    to: toEmail,
    subject: subject,
    html: htmlContent,
  };

  // Return a promise for sending the email
  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        reject(error);
      } else {
        resolve(info.response);
      }
    });
  });

};