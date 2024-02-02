const router = require('express').Router();
const {
  getAllThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction,
} = require('../../controllers/thoughtController');

router.route('/').get(async (req, res) => {
  try {
    await getAllThoughts(req, res);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}).post(async (req, res) => {
  try {
    await createThought(req, res);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.route('/:id').get(async (req, res) => {
  try {
    await getSingleThought(req, res);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}).put(async (req, res) => {
  try {
    await updateThought(req, res);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}).delete(async (req, res) => {
  try {
    await deleteThought(req, res);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

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