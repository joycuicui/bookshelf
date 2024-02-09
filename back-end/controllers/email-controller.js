const sendEmail = require("../helpers/email");
const { getUserById } = require("../database/queries/user-queries");

const sendEmailToUser = async (req, res, next) => {
  const { userId } = req.params;
  const { subject, text } = req.body;

  const { email } = await getUserById(userId);

  // send email
  try {
    sendEmail({ email, subject, text });
    return res.status(200).json({
      success: true,
      message: "Email sent successfully",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { sendEmailToUser };
