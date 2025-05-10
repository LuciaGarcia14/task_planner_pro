const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { verify_token }  = require('../middlewares/authMiddleware')

router.post('/login', userController.loginUser);
router.get('/verify_token', userController.verifyToken);

router.get('/', verify_token(['admin']), userController.getUserController);
router.get('/:id', verify_token(['admin']), userController.getUserById);
router.post('/', verify_token(['admin']), userController.createUser);
router.delete('/:id', verify_token(['admin']), userController.deleteUser);
router.put('/:id', verify_token(['admin']), userController.updateUser);

module.exports = router;

