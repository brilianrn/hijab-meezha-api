const nodemailer = require('nodemailer');
const { emailView } = require('../assets/views/email');

const emailTransport = (
  { email, subject, otpCode, msgType, dateDisplay },
  done
) => {
  const mailTransporter = nodemailer.createTransport({
    host: process.env.NODEMAILER_HOST,
    port: +process.env.NODEMAILER_PORT,
    secure: false,
    auth: {
      user: process.env.NODEMAILER_AUTH_USER,
      pass: process.env.NODEMAILER_AUTH_PASSWORD,
    },
  });

  mailTransporter.sendMail(
    emailView({ dateDisplay, email, msgType, otpCode, subject }),
    (err, info) => {
      if (err) return done(err, null);
      return done(null, info);
    }
  );
};

module.exports = { emailTransport };
