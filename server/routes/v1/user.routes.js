const { Router } = require('express');

const router = Router();
const UserController = require('../../controllers/v1/user-controller');
const Validators = require('../../middlewares/validators');

router.post('/signup', Validators.validateUser, UserController.addUser);
router.post('/login', UserController.login);
router.get('/:username', UserController.getUser);
router.put('/:username', UserController.updateUser);
router.delete('/:username', UserController.deletedUser);

module.exports = router;
