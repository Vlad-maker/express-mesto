const Cards = require("../models/cards");

module.exports.getCards = (req, res) => {
  Cards.find({})
    .then((cards) => res.status(200).send(cards))
    .catch((_) => res.status(500).send({ message: "Ошибка" }));
};

module.exports.createCards = (req, res) => {
  const { name, link } = req.body;

  Cards.create({ name, link, owner: req.user._id })
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(400).send({ message: "Ошибка валидации" });
      }
      return res.status(500).send({ message: "Ошибка" });
    });
};

module.exports.deleteCards = (req, res) => {
  const { id } = req.params.cardId;

  Cards.findByIdAndRemove({ _id: id })
    .then((card) => {
      if (!card) {
        return res.status(404).send({ message: "Карточки с данным id не существует" });
      }
      return res.status(200).send(cardInfo);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return res.status(400).send({ message: "Неверно передан id" });
      }
      return res.status(500).send({ message: "Ошибка" });
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => {
      if (!card) {
        return res.status(404).send({ message: "Карточки с данным id не существует" });
      }
      return res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return res.status(400).send({ message: "Неверно передан id" });
      }
      return res.status(500).send({ message: "Ошибка" });
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => {
      if (!card) {
        return res.status(404).send({ message: "Карточки с данным id не существует" });
      }
      return res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return res.status(400).send({ message: "Неверно передан id" });
      }
      return res.status(500).send({ message: "Ошибка" });
    });
};
