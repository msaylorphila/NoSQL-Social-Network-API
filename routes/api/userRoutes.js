const router = require('express').Router();

const {
    getUsers,
    createUser,
    getSingleUser,
    updateUser,
    deleteUser,
    addNewFriend,
    deleteNewFriend
} = require('../../controllers/userController')

router.route('/').get(getUsers).post(createUser);
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);
router.route('/:userId/friends/:friendId').post(addNewFriend).delete(deleteNewFriend);

module.exports = router