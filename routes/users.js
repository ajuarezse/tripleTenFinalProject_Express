const router = require("express").Router();
const {
  getUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/users");

router.get("/", getUsers);
router.post("/", createUser);
router.get("/:userId", getUser);
router.put("/:userId", updateUser);
router.delete("/:userId", deleteUser);

module.exports = router;
