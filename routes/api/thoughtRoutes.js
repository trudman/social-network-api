const router = require("express").Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction,
} = require("../../controllers/thoughtController");

// /api/thoughts
router.route("/").get(getThoughts);

// api/thoughts
router.route("/").post(createThought);

// /api/thoughts/:thoughtId
router.route("/:thoughtId").get(getSingleThought).delete(deleteThought).put(updateThought);

// /api/thoughts/:thoughtId/reactions
router.route("/:thoughtId/reactions").post(addReaction).delete(deleteReaction);

module.exports = router;
