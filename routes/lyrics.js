const router = require("express").Router();
const {
  getLyrics,
  createLyrics,
  getLyricById,
  updateLyric,
  deleteLyric,
} = require("../controllers/lyrics");

router.get("/", getLyrics);
router.post("/", createLyrics);
router.get("/:lyricId", getLyricById);
router.put("/:lyricId", updateLyric);
router.delete("/:lyricId", deleteLyric);

module.exports = router;
