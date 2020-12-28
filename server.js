const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const { readdirSync } = require("fs");
require("dotenv").config();
const authRoutes = require("./routes/auth");
const app = express();

//DB
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
  })
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log("DB connection error"));

//middleware
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "2mb" }));
app.use(cors());

//routes
app.use("/api", authRoutes);
readdirSync("./routes").map((r) => app.use("/api", require("./routes/" + r)));

//Server
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
