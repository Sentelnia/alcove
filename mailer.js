/////////////////////NODEMAILER///////////////////
const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport(process.env.SMTP_URI)

module.exports = transporter;