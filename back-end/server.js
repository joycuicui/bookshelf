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

// error-handling middleware - catch errors and send error response to the client
// trigger this middleware by calling next() with an error object in route handlers
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});
