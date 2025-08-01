import nodemailer from 'nodemailer';

export const sendOtpEmail = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `MEETUP <noreply.meetup@gmail.com>`,
    to: email,
    subject: 'Verify your Email with OTP',
    html: `<p>Your OTP is <strong>${otp}</strong>. It expires in 10 minutes.</p>`,
  };

  await transporter.sendMail(mailOptions);
};
