const User = require("../models/user");

module.exports.getUsers = (req, res) =>
  User.find({})
    .then((users) => {
      res.status(200).send(users);
    })
    .catch((_) => res.status(500).send({ message: "Ошибка" }));

module.exports.getProfile = (req, res) =>
  User.findOne({ _id: req.params.id })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "Пользователя с данным id не существует" });
      }
      return res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return res.status(400).send({ message: "Неверно передан id" });
      }
      return res.status(500).send({ message: "Ошибка" });
    });

module.exports.createProfile = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(400).send({ message: "Ошибка валидации" });
      }
      return res.status(500).send({ message: "Ошибка" });
    });
};

module.exports.updatePrfoile = (req, res) => {
  const { id } = req.user._id;
  const { name, about } = req.body;

  User.findByIdAndUpdate(id, { name, about }, { new: true })
    .then((user) => {
      if (!user) {
        return res
          .status(404)
          .send({ message: "Пользователя c данным id не существует" });
      }
      return res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(400).send({ message: "Ошибка валидации" });
      } else if (err.name === "CastError") {
        return res.status(400).send({ message: "Неверно передан id" });
      }
      return res.status(500).send({ message: "Ошибка" });
    });
};

module.exports.updateAvatar = (req, res) => {
  const { id } = req.user._id;
  const { avatar } = req.body;

  User.findByIdAndUpdate(id, { avatar }, { new: true })
    .then((user) => {
      if (!user) {
        return res
          .status(404)
          .send({ message: "Пользователя с данным id не существует" });
      }
      return res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(400).send({ message: "Ошибка валидации" });
      } else if (err.name === "CastError") {
        return res.status(400).send({ message: "Неверно передан id" });
      }
      return res.status(500).send({ message: "Ошибка" });
    });
};
