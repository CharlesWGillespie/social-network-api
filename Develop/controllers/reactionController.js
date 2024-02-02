const Thought = require('../models/Thought');

const createReaction = async (thoughtId, reactionData) => {
  try {
    const thought = await Thought.findById(thoughtId);

    if (!thought) {
      throw new Error('Thought not found');
    }

    thought.reactions.push(reactionData);
    await thought.save();

    return thought;
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteReaction = async (thoughtId, reactionId) => {
  try {
    const thought = await Thought.findById(thoughtId);

    if (!thought) {
      throw new Error('Thought not found');
    }

    thought.reactions = thought.reactions.filter(
      (reaction) => reaction.reactionId.toString() !== reactionId
    );

    await thought.save();
    return thought;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { createReaction, deleteReaction };