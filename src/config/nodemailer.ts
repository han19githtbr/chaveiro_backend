// eslint-disable-next-line linebreak-style
export default {
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false, // true for 465, false for other ports.
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD,
  },
  default: {
    from: `[name] <${process.env.SMTP_FROM}>`,
  },
};
