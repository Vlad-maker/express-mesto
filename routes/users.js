const router = require("express").Router();
const {
  getUsers,
  getProfile,
  createProfile,
  updatePrfoile,
  updateAvatar,
} = require("../controllers/users");

router.get("/users", getUsers);
router.get("/users/:id", getProfile);
router.post("/users", createProfile);
router.patch("/users/me", updatePrfoile);
router.patch("/users/me/avatar", updateAvatar);

module.exports = router;
