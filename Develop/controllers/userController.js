const User = require("../models/User");
const Thought = require("../models/Thought");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
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
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
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
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    await Thought.deleteMany({ _id: { $in: deletedUser.thoughts } });

    res.json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addFriend = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const friend = await User.findById(req.params.friendId);

    if (!user || !friend) {
      return res.status(404).json({ message: "User or friend not found" });
    }

    if (!user.friends.includes(friend._id)) {
      user.friends.push(friend._id);
      await user.save();

      if (!friend.friends.includes(user._id)) {
        friend.friends.push(user._id);
        await friend.save();
      }

      const message = `Users ${user.username} and ${friend.username} have added each other as friends.`;

      return res.json({
        message,
        user: await User.findById(req.params.userId)
          .populate("thoughts")
          .populate("friends"),
      });
    }

    return res.json({
      message: "Users are already friends.",
      user: await User.findById(req.params.userId)
        .populate("thoughts")
        .populate("friends"),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding friend" });
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

    const updatedUser = await User.findById(req.params.userId)
      .populate("thoughts")
      .populate("friends");

    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error removing friend" });
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
