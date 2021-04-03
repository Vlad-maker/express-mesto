const router = require("express").Router();
const {
  likeCard,
  dislikeCard,
  getCards,
  createCards,
  deleteCards,
} = require("../controllers/cards");

router.get("/cards", getCards);
router.post("/cards", createCards);
router.delete("/cards/:cardId", deleteCards);
router.put("/cards/:cardId/likes", likeCard);
router.delete("/cards/:cardId/likes", dislikeCard);

module.exports = router;
