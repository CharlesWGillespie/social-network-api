const User = require("../models/User");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getSingleUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .populate("thoughts")
      .populate("friends");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

const createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json(err);
  }
};

const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(updatedUser);
  } catch (err) {
    res.status(400).json(err);
  }
};

const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // BONUS: Remove associated thoughts
    await Thought.deleteMany({ _id: { $in: deletedUser.thoughts } });

    res.json({ message: "User and thoughts deleted" });
  } catch (err) {
    res.status(500).json(err);
  }
};

const addFriend = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const friend = await User.findById(req.params.friendId);

    if (!user || !friend) {
      return res.status(404).json({ message: "User or friend not found" });
    }

    user.friends.push(friend._id);
    await user.save();

    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

const removeFriend = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const friendId = req.params.friendId;

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.friends = user.friends.filter(
      (friend) => friend.toString() !== friendId
    );
    await user.save();

    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  getAllUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
};
