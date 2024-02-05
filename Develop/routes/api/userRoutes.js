const router = require("express").Router();
const {
  getAllUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require("../../controllers/userController");

router
  .route("/")
  .get(async (req, res) => {
    try {
      await getAllUsers(req, res);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  })
  .post(async (req, res) => {
    try {
      await createUser(req, res);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

router
  .route("/:id")
  .get(async (req, res) => {
    try {
      await getSingleUser(req, res);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  })
  .put(async (req, res) => {
    try {
      await updateUser(req, res);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  })
  .delete(async (req, res) => {
    try {
      await deleteUser(req, res);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

router
  .route("/:userId/friends/:friendId")
  .put(async (req, res) => {
    try {
      await addFriend(req, res);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  })
  .delete(async (req, res) => {
    try {
      await removeFriend(req, res);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

module.exports = router;
