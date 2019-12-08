const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const SETTINGS = require("./config.js");
const port = SETTINGS.PORT;
const mport = SETTINGS.MONGO_PORT;
const host = SETTINGS.HOSTNAME;

mongoose.connect(`mongodb://${host}:${mport}/afp`, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const connection = mongoose.connection;

connection.once("open", _ => {
  console.log("MongoDB kapcsolat létrehozva");
});

const usersRouter = require("./routes/users");
const villageRouter = require("./routes/village");
const updateRouter = require("./routes/updater");
app.use("/users", usersRouter);
app.use("/village", villageRouter);
app.use("/update", updateRouter);

app.listen(port, host, _ => {
  console.log(`A szerver fut: ${host}:${port}`);
});
