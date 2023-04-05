const Thought = require("../models/Thought");
const User = require("../models/User");

module.exports = {
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select("-__v")
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with that ID" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // create a new user
  createThought(req, res) {
    Thought.create(req.body)
      // { $push: { <field1>: { <modifier1>: <value1>, ... }, ... } }
      .then((thought) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $addToSet: { thoughts: thought._id } },       
          { new: true }
        );
      })
      .then((user) =>
        !user
          ? res.status(404).json({
              message: "Thought created, but found no user with that ID",
            })
          : res.json("Created the thought 🎉")
      )
      .catch((err) => res.status(500).json(err));
  },
  updateThought(req, res) {},
  deleteThought(req, res) {},
  addReaction(req, res) {},
  deleteReaction(req, res) {},
};

// //////figure out reactions
