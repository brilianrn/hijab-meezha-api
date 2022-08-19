const { OtpCode } = require('../models');

const generateOtpByPhone = async (phone) => {
  let OTP = '';
  for (let i = 0; i < 6; i++) {
    OTP += phone[Math.floor(Math.random() * 10)];
  }
  try {
    const findOtp = await OtpCode.findOne({
      where: { token: OTP, isActive: true },
    });
    if (findOtp) generateOtpByPhone(phone);
    else return OTP;
  } catch (error) {
    return error;
  }
};

const generateDateDisplay = (dateObj) => {
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const month = monthNames[dateObj.getMonth()];
  const day = String(dateObj.getDate()).padStart(2, '0');
  const year = dateObj.getFullYear();
  const minutes = (dateObj.getMinutes() < 10 ? '0' : '') + dateObj.getMinutes();
  const hours = (dateObj.getHours() < 10 ? '0' : '') + dateObj.getHours();
  return `${month} ${day}, ${year} at ${hours}:${minutes}`;
};

module.exports = { generateOtpByPhone, generateDateDisplay };
