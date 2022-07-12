const express = require("express");
const cors = require("cors");
const compression = require("compression");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require("dotenv").config();

app.use(compression());
app.use(cors());

process.on("SIGINT", () => {
  console.log("SIGINT signal received: closing HTTP server");
  shutdown();
});

process.on("SIGTERM", () => {
  console.log("SIGTERM signal received: closing HTTP server");
  shutdown();
});

// clean up your resources and exit
const shutdown = () => process.exit();

app.use(morgan("dev"));

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));
app.use((error, req, res, next) => {
  console.log(error);
  res.sendStatus(400);
});

// app.all("/api/resources/*", [require("./routes/routesGuard")]);
app.use("/", require("./routes"));

// 404 not found
app.use((req, res, next) => {
  req.statusCode = 404;
  next();
});

// start server
app.listen(process.env.PORT || 4000);
