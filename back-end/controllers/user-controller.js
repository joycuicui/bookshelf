const bcrypt = require("bcrypt");
const { updateUserById } = require("../database/queries/user-queries.js");

const updateUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { name, avatar } = req.body;
    let { password } = req.body;
    if (password) {
      password = bcrypt.hashSync(password, 10);
    }
    const updatedUser = await updateUserById(userId, name, password, avatar);
    if (!updatedUser) {
      const error = new Error();
      error.message = "User not updated";
      error.statusCode = 500;
      return next(error);
    }
    const { password: pass, ...rest } = updatedUser;
    res.status(200).json(rest);
  } catch (err) {
    next(err);
  }
};

module.exports = { updateUser };
