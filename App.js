require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const helmet = require("helmet");
const hpp = require("hpp");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const apiRoutes = require("./routes/api");
const authRoutes = require("./routes/auth");

mongoose.Promise = global.Promise;

app.use(function (req, res, next) {
  res.setHeader("Access-Allow-Control-Origin", "https://squizer.ct8.pl");
  res.setHeader("Access-Allow-Control-Methods", "*");
  res.setHeader("Access-Allow-Control-Credentials", true);
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    credentials: true,
    origin: process.env.ENV === "development" ? "http://localhost:8000" : "https://squizer.ct8.pl",
  }),
);
app.use(helmet());
app.use(hpp());

const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => res.send("Hello world!"));

app.use("/api", apiRoutes);
app.use("/auth", authRoutes);

app.listen(PORT, () =>
  mongoose
    .connect(process.env.MONGO_URL_PROD, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    })
    .then(() => console.log("connection with mongodb has started")),
);

module.exports = app;
