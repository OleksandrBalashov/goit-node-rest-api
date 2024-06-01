import nodemailer from "nodemailer";
import "dotenv/config";

const { EMAIL_SECRET_KEY, EMAIL_FROM } = process.env;

const nodemailerConfig = {
  host: "smtp.ukr.net",
  port: 2525,
  secure: true,
  auth: {
    user: EMAIL_FROM,
    pass: EMAIL_SECRET_KEY,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

const sendEmail = (data) => {
  const email = { ...data, from: EMAIL_FROM };

  return transport.sendMail(email);
};

export default sendEmail;
