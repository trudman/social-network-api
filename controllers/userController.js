const { User, Thought } = require("../models");

module.exports = {
  getAllUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },

  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select("-__v")
      .populate("thoughts")
      .then((user) =>
        !user ? res.status(404).json({ message: "No user with that ID" }) : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID" })
          : Thought.deleteMany({ _id: { $in: user.thoughts } })
      )
      .then(() => res.json({ message: "User and thoughts deleted!" }))
      .catch((err) => res.status(500).json(err));
  },

  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user ? res.status(404).json({ message: "No user with this id!" }) : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  addFriend(req, res) {
    User.findByIdAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.body.userId } },
      { new: true }
    )
      .select("-__v")
      .then((user) =>
        !user ? res.status(404).json({ message: "No user with that ID" }) : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  removeFriend(req, res) {
    User.findByIdAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.body.userId } },
      { new: true }
    )
      .select("-__v")
      .then((user) =>
        !user ? res.status(404).json({ message: "No user with that ID" }) : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
};
