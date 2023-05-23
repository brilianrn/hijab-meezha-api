if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const helmet = require("helmet");
const multer = require("multer");
const morgan = require("morgan");
const app = express();
const routes = require("./routes");
const cors = require("cors");
const errorHandler = require("./middlewares/error-hanlders");
const { Storage } = require("./services/imgur.service");

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(helmet());
app.use(morgan("tiny"));
app.use(multer({ storage: Storage }).any());

app.use(routes);
app.use(errorHandler);

module.exports = app;
