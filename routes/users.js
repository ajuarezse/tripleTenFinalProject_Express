const router = require("express").Router();
const { getUsers, createUser, getUser } = require("../controllers/users");

router.get("/users", getUsers);
router.get("/:userId", getUser);
router.post("/users", createUser);

module.exports = router;
