const express = require("express");
const cors = require("cors");
const compression = require("compression");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const process = require("process");
const logger = require('./utils/logger');
const {ErrorHandler} = require('./utils/error_handler')
const methodOverride = require('method-override')

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require("dotenv").config();

app.use(compression());
app.use(cors());
app.use(methodOverride())

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

app.all("/api/resources/*", [require("./routes/routes_guard")]);
app.use("/", require("./routes"));

app.use(ErrorHandler)

// 404 not found
app.use((req, res, next) => {
  req.statusCode = 404;
  next();
});

// Start the server
app.set('port', process.env.PORT);

let server = app.listen(app.get('port'), function() {
  logger.info('Express server listening on port ' + server.address().port);
});
