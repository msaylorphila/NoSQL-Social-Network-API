// const Thought = require('../models/Thought');

// module.exports = {
//   getThoughts(req, res) {
//     Thought.find()
//       .then((thoughts) => res.json(thoughts))
//       .catch((err) => res.status(500).json(err));
//   },
//   getSingleThought(req, res) {
//     Thought.findOne({ _id: req.params.thoughtId })
//       .select('-__v')
//       .then((thought) =>
//         !thought
//           ? res.status(404).json({ message: 'No thought with that ID' })
//           : res.json(thought)
//       )
//       .catch((err) => res.status(500).json(err));
//   },
//   // create a new user
//   createThought(req, res) {
//     Thought.create(req.body)
//       .then((dbThoughtData) => res.json(dbThoughtData))
//       .catch((err) => res.status(500).json(err));
//   },
//  updateThought(req, res) {

// },
//  deleteThought(req, res) {

// },
//  addReaction(req, res) {

// },
//  deleteReaction(req, res){

// }
// };

// //////figure out reactions

