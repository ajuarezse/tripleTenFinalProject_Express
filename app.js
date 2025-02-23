const express = require("express");
const mongoose = require("mongoose");
const mainRouter = require("./routes/index");
const errorHandler = require("./middlewares/errorHandler");

const app = express();
const { PORT = 3000 } = process.env;

mongoose
  .connect("mongodb://127.0.0.1:27017/jarocho_db")
  .then(() => {
    console.log("conntected to DB");
  })
  .catch(console.error);

app.use(express.json());
app.use("/", mainRouter);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
