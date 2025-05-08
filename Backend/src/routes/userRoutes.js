const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { verifyToken } = require('../middlewares/authMiddleware')

router.post('/login', userController.loginUser);
router.get('/verify_token', userController.verifyToken);

router.get('/', verifyToken(['admin']), userController.getUserController);
router.get('/:id', verifyToken(['admin']), userController.getUserById);
router.post('/', verifyToken(['admin']), userController.createUser);
router.delete('/:id', verifyToken(['admin']), userController.deleteUser);
router.put('/:id', verifyToken(['admin']), userController.updateUser);

module.exports = router;

