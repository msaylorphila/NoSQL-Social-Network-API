//// imports of the user and api routes and express

const router = require('express').Router();
const userRoutes = require('./userRoutes');
const thoughtRoutes = require('./thoughtRoutes');

router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

////exporting the router
module.exports = router;