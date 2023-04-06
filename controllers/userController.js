const User = require('../models/User');

module.exports = {
    getUsers(req, res) {
        User.find()
        .then((users) => res.json(users))
        .catch((err) => res.status(500).json(err));
    },
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
    deleteUser(req, res) {
        User.findOneAndRemove({_id: req.params.userId})
        .then((user) => {
            if (!user) {
                res.status(404).json({ message: "No user with this ID!" })
            }
            res.json({ message: "User deleted!" })
        })
        .catch((err) => {
            console.log(err)
        })
    },
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


