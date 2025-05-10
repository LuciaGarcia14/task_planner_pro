const express = require('express');
const router = express.Router();

const taskController = require('../controllers/taskController');
const {verify_token} = require('../middlewares/authMiddleware');

router.post('/', verify_token(['usuario']), taskController.createTask);
router.get('/', verify_token(['usuario']), taskController.getUserTask);
router.get('/:id', verify_token(['usuario']), taskController.getTaskById);
router.put('/:id', verify_token(['usuario']), taskController.updateTask);
router.delete('/:id', verify_token(['usuario']), taskController.deleteTask);

module.exports = router;