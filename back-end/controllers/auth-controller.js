const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const {
  createUser,
  getUserByEmail,
} = require("../database/queries/user-queries");

const signup = async (req, res, next) => {
  const { name, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  try {
    const newUser = await createUser({
      name,
      email,
      password: hashedPassword,
    });
    if (newUser) {
      res.status(201).json("User created successfully ✅");
    } else {
      const error = new Error();
      error.message = "Failed to create user 📛";
      error.statusCode = 500;
      throw error;
    }
  } catch (err) {
    // calling the error-handling middleware
    next(err);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await getUserByEmail(email);

    if (!validUser) {
      const error = new Error();
      error.message = "User not found ❓";
      error.statusCode = 404;
      throw error;
    }

    const validPassword = bcrypt.compareSync(password, validUser.password);

    if (!validPassword) {
      const error = new Error();
      error.message = "Invalid credentials ❌";
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign({ id: validUser.id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = validUser;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (err) {
    // calling the error-handling middleware
    next(err);
  }
};

module.exports = { signup, login };
