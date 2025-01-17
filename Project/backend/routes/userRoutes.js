const express = require('express');
const { registerUser, loginUser, getMe } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', registerUser);
router.post('/login', loginUser);
router.get('/getMe', protect,getMe);


module.exports = router;