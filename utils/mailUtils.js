const nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "juniorhodor279@gmail.com",
    pass: "nmtnnmewbroudvds",
  },
});

module.exports.sendOTP = async (to, otp) => {
  try {
    let info = await transporter.sendMail({
      to: to, // list of receivers
      subject: "One Time Password (OTP) for booking ride on MedCabs", // Subject line
      text: `Med Cabs - book a ride otp`, // plain text body
      html: `Dear User, <br> Your One Time Password (OTP) for booking ride on MedCabs is <b>${otp}</b> <br><br> Please note, this OTP is valid only for mentioned transaction and cannot be used for any other transaction. <br> Please do not share this One Time Password with anyone.`, // html body <this will be sent make change here>
    });
    console.log("Message sent to admin: %s", info.messageId);
  } catch (e) {
    console.log("admin error", e);
  }
};
