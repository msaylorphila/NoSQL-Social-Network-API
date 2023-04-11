const Thought = require("../models/Thought");
const User = require("../models/User");


module.exports = {
  //get all thoughts
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  ///get one thought by id
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
  // create a new thought
  createThought(req, res) {
    Thought.create(req.body)
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

  ////update a thought by id
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) => {
        if (!thought) {
          res.status(404).json({ message: "No thought with this ID! " });
        }
        res.json(thought);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  ///delete a thought by id
  deleteThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params.thoughtId })
      .then((thought) => {
        if (!thought) {
          res.status(404).json({ message: "No thought with this ID!" });
        }
        res.json({ message: "Thought deleted!" });
      })
      .catch((err) => {
        console.log(err);
      });
  },
  ///react to a thought by the thoughts id
  addReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          return res
            .status(404)
            .json({ message: "No thought found with that ID!" });
        }
        return res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  ///delete a reaction by the reactions id within the thought the user reacted to
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { _id: req.params.reactionId } }},
      { runValidators: true, new: true}
    ).then((thought) => {
      if(!thought) {
        return res.status(404).json({ message: "No thought found with that ID!" })
      }
      return res.json(thought)
    }).catch((err) => {
      console.log(err)
    })
  },
};

