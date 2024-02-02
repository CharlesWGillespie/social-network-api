const router = require("express").Router();
const {
  createReaction,
  deleteReaction,
} = require("../controllers/reactionController");

router
  .route("/:thoughtId/reactions")
  .post(async (req, res) => {
    try {
      const result = await createReaction(req.params.thoughtId, req.body);
      res.status(201).json(result);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  })
  .delete(async (req, res) => {
    try {
      const result = await deleteReaction(
        req.params.thoughtId,
        req.body.reactionId
      );
      res.json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

module.exports = router;
