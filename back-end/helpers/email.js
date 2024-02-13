const fs = require("fs");
const path = require("path");
const nodeMailer = require("nodemailer");

const sendEmail = async (options) => {
  // Read the HTML template content from the file
  const htmlTemplatePath = path.join(__dirname, "email-template.html");
  const htmlTemplate = fs.readFileSync(htmlTemplatePath, "utf8");
  // 1. create a transporter
  const transporter = nodeMailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // 2. define the email options
  const mailOptions = {
    from: "Book Haven <no-reply@bookhaven.com>",
    to: options.email,
    subject: "Your Reading Reminder From BookHaven 🚀",
    html: htmlTemplate
      .replace(
        "{{NAME}}",
        options.name.charAt(0).toUpperCase() + options.name.slice(1)
      )
      .replace("{{BOOK_NAME}}", options.title)
      .replace("{{PERCENTAGE}}", options.percentage),
  };
  // 3. send the email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
