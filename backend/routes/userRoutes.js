const express = require('express');
const { allUsers, registerUser, authUser } = require('../controllers/userControllers');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router()

router.route('/').post(registerUser).get(protect, allUsers);
router.post('/login', authUser);

module.exports = router;