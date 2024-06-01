import "dotenv/config";

const { API_HOST } = process.env;

export const verifyEmailTemplate = (email, verificationCode) => ({
  to: email,
  subject: "Verify email",
  html: `<a target="_blank" href="${API_HOST}/api/users/verify/${verificationCode}">Click verify email</a>`,
});
