const { Router } = require('express');

const router = Router();
const UserController = require('../../controllers/v2/user-controller');

router.post('/signup', UserController.createUser);
router.get('/:username', UserController.getUser);
router.put('/:username', UserController.updateUser);
router.delete('/:username', UserController.deleteUser);

module.exports = router;
