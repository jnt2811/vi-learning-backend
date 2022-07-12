const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const cors = require("cors");
app.use(cors());

const dotenv = require("dotenv");
dotenv.config();

const routes = require("./routes");
routes(app);

app.listen(process.env.PORT || 4000);
