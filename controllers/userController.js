const User = require('../models/User');
const Thought = require('../models/Thought')

module.exports = {
    ///get all users
    getUsers(req, res) {
        User.find()
        .then((users) => res.json(users))
        .catch((err) => res.status(500).json(err));
    },
    //get one user by id
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
        .select('-__v')
        .then((user) => {
            if (!user) {
                res.status(404).json({ message: 'No user with that ID' })
            }
            res.json(user)
        }
        )
        .catch((err) => res.status(500).json(err));
    },
    // create a new user
    createUser(req, res) {
        User.create(req.body)
        .then((dbUserData) => res.json(dbUserData))
        .catch((err) => res.status(500).json(err));
    },
    //update a user by id
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        ) 
        .then((user) => {
            if (!user) {
                res.status(404).json({ message: "No user with this ID! "})
                }
                res.json(user)
            })
        .catch((err) => {
            console.log(err)
        })
        
    },
    //delete user by id
    deleteUser(req, res) {
        User.findOneAndRemove({_id: req.params.userId})
        .then((user) => {
            if (!user) {
               return res.status(404).json({ message: "No user with this ID!" })
            }
            return Thought.deleteMany({ _id: { $in: user.thoughts } })

        }).then(
            res.json({ message: "User and their thoughts deleted! "})
        )
        .catch((err) => {
            console.log(err)
        })
    },
    // add new friend using a user id and the id of the friend you want to add
    addNewFriend(req, res){
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId }},
            { runValidators: true, new: true }, 
        )
        .then((dbUserData) => {
            if(!dbUserData) {
            return res.status(404).json({ message: "No user found with this ID!" })
            }
            return res.json(dbUserData)
        })
        .catch((err) => {
            console.log(err)
        })
    },
    // delete that friend using the friend id and the user id
    deleteNewFriend(req, res){
        User.findOneAndUpdate( 
            { _id: req.params.userId},
            { $pull: { friends: req.params.friendId }},
            { runValidators: true, new: true }
        ).then((user) => {
            if(!user) {
                return res.status(404).json({ message: "No user found with this ID! "})
            }
            return res.json(user)
        }).catch((err) => {
            console.log(err)
        })
    }
};


