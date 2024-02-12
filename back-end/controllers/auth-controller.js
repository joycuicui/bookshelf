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
      error.message = "Failed to create user";
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
      error.message = "User not found";
      error.statusCode = 404;
      throw error;
    }

    const validPassword = bcrypt.compareSync(password, validUser.password);

    if (!validPassword) {
      const error = new Error();
      error.message = "Invalid credentials";
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

const logout = async (req, res, next) => {
  try {
    res.clearCookie("access_token").status(200).json("Logged out successfully");
  } catch (err) {
    next(err);
  }
};

const google = async (req, res, next) => {
  const { email, name, avatar } = req.body;
  try {
    // check if user exists
    const user = await getUserByEmail(email);
    // if user exists, log in
    if (user) {
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
      const { password, ...rest } = user;
      res
        .status(200)
        .cookie("access_token", token, { httpOnly: true })
        .json(rest);
    } else {
      // if user doesn't exist, create a new user
      // create a random password for the user
      const generatedPassword = Math.random().toString(36).slice(-8);
      const hashedPassword = bcrypt.hashSync(generatedPassword, 10);
      const newUser = await createUser({
        name,
        email,
        password: hashedPassword,
        avatar,
      });
      const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET);
      const { password, ...rest } = newUser;
      res
        .status(200)
        .cookie("access_token", token, { httpOnly: true })
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { signup, login, logout, google };
