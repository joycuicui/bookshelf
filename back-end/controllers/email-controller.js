const sendEmail = require("../helpers/email");
const { getUserById } = require("../database/queries/user-queries");

const sendEmailToUser = async (req, res, next) => {
  const { userId } = req.params;
  const { title, percentage } = req.body;
  console.log(percentage);

  const { email, name } = await getUserById(userId);

  // send email
  try {
    sendEmail({ email, name, title, percentage });
    return res.status(200).json({
      success: true,
      message: "Email sent successfully",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { sendEmailToUser };
