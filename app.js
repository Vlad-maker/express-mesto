const express = require("express");
const userRouter = require("./routes/users");
const cardsRouter = require("./routes/cards");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

const PORT = 3000;

mongoose
  .connect("mongodb://localhost:27017/mestodb", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Connected to DB");
  });

app.use(bodyParser.json());

app.use((req, res, next) => {
  req.user = {
    _id: "60686548e27b7d4eb9af893e",
  };
  next();
});

app.use("/", userRouter);
app.use("/", cardsRouter);

app.use((req, res) =>
  res.status(404).send({ message: "Запрашиваемый ресурс не найден" })
);

app.listen(PORT);
