const router = require('express').Router();

const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    // deleteThought,
    // addReaction,
    // deleteReaction
} = require('../../controllers/thoughtController')

router.route('/').get(getThoughts).post(createThought)
router.route('/:thoughtId').get(getSingleThought)
// .put(updateUser).delete(deleteUser)


module.exports = router