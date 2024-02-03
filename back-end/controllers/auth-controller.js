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
      res.status(500).json("Failed to create user 📛");
    }
  } catch (err) {
    console.log(err.message);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await getUserByEmail(email);

    if (!validUser) console.log("User not found");
    const validPassword = bcrypt.compareSync(password, validUser.password);
    if (!validPassword) console.log("Invalid password");

    const token = jwt.sign({ id: validUser.id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = validUser;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = { signup, login };
