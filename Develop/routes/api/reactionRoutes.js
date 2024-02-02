const router = require('express').Router();
const {
  createReaction,
  deleteReaction,
} = require('../controllers/reactionController');

router.route('/:thoughtId/reactions').post(async (req, res) => {
  try {
    await createReaction(req, res);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}).delete(async (req, res) => {
  try {
    await deleteReaction(req, res);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;