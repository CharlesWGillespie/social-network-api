const Thought = require("../models/Thought");

const getAllThoughts = async (req, res) => {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getSingleThought = async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.id).populate("reactions");

    if (!thought) {
      return res.status(404).json({ message: "Thought not found" });
    }

    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
};

const createThought = async (req, res) => {
  try {
    const newThought = await Thought.create(req.body);

    // Push the created thought's _id to the associated user's thoughts array field
    const userId = req.body.userId; // Assuming you include the userId in the request body
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.thoughts.push(newThought._id);
    await user.save();

    res.status(201).json(newThought);
  } catch (err) {
    res.status(400).json(err);
  }
};

const updateThought = async (req, res) => {
  try {
    const updatedThought = await Thought.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    if (!updatedThought) {
      return res.status(404).json({ message: "Thought not found" });
    }

    res.json(updatedThought);
  } catch (err) {
    res.status(400).json(err);
  }
};

const deleteThought = async (req, res) => {
  try {
    const deletedThought = await Thought.findByIdAndDelete(req.params.id);

    if (!deletedThought) {
      return res.status(404).json({ message: "Thought not found" });
    }

    res.json({ message: "Thought deleted" });
  } catch (err) {
    res.status(500).json(err);
  }
};

const createReaction = async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.thoughtId);

    if (!thought) {
      return res.status(404).json({ message: "Thought not found" });
    }

    thought.reactions.push(req.body);
    await thought.save();

    res.status(201).json(thought);
  } catch (err) {
    res.status(400).json(err);
  }
};

const deleteReaction = async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.thoughtId);

    if (!thought) {
      return res.status(404).json({ message: "Thought not found" });
    }

    const reactionId = req.body.reactionId;
    thought.reactions = thought.reactions.filter(
      (reaction) => reaction.reactionId.toString() !== reactionId
    );
    await thought.save();

    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  getAllThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction,
};
