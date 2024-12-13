const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

dotenv.config({ path: "./config.env" });
const { dbConnection } = require("./config/connect");
const globalerrorHandler = require("./middlewares/globalErrorMiddleware");

const userRoute = require("./routes/userRoute");
const authRoute = require("./routes/authRoute");
const productRoute = require("./routes/productRoute");
const cartRoute = require("./routes/cartRoute");
const orderRoute = require("./routes/orderRoute");
const wishlistRoute = require("./routes/wishlistRoute");
const commentRoute = require("./routes/commentRoute");

// const __dirname = path.resolve();

//express aapp
const app = express();

//database connect
dbConnection();

//middlewares
app.use(cookieParser());
app.use(express.json({ limit: "50kb" }));
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//mout routes
app.use("/api/v1/users", userRoute);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/product", productRoute);
app.use("/api/v1/cart", cartRoute);
app.use("/api/v1/order", orderRoute);
app.use("/api/v1/wishlist", wishlistRoute);
app.use("/api/v1/comment", commentRoute);

app.use(express.static(path.join(__dirname, "client/dist")));
app.use(express.static(path.join(__dirname, "uploads")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});
//global error handler
app.use(globalerrorHandler);

const server = app.listen(8000, () => {
  console.log("Server started on port 8000");
});

// rejection outside express server
process.on("unhandledRejection", (err) => {
  console.log("unhandledRejection", err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
