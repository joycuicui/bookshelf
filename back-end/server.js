// populate environment variables with values from the .env file
require("dotenv").config();
const { createProxyMiddleware } = require('http-proxy-middleware');

// dependencies
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const app = express();
const port = process.env.PORT || 8000;

// middleware
app.use(morgan("dev"));
// parsing json data
app.use(express.json());

app.use(cookieParser());

// // Proxy middleware for the Open Library API
const openLibraryProxy = createProxyMiddleware({
  target: 'https://openlibrary.org',
  changeOrigin: true,
  pathRewrite: {
    '^/open-library': '',
  },
  });
  
  app.use("/open-library", openLibraryProxy);
 

// routes
// const userRouter = require("./routes/user-router");
const authRouter = require("./routes/auth-router");
const readingListsRouter = require("./routes/readingLists-router");
const progressRouter = require("./routes/progress-router");
const reviewsRouter = require("./routes/reviews-router");
const booksRouter = require("./routes/books-router");
const emailRouter = require("./routes/emails-router");
// const { createProxyMiddleware } = require("http-proxy-middleware");

// app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/readinglists", readingListsRouter);
app.use("/api/progress", progressRouter);
app.use("/api/reviews", reviewsRouter);
app.use("/api/books", booksRouter);
app.use("/api/emails", emailRouter);

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
