// populate environment variables with values from the .env file
require("dotenv").config();

// dependencies
const express = require("express");
const morgan = require("morgan");

const app = express();
const port = process.env.PORT || 8000;

// middleware
app.use(morgan("dev"));
// parsing json data
app.use(express.json());

// routes
// const userRouter = require("./routes/user-router");
const authRouter = require("./routes/auth-router");

// app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);

app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});
