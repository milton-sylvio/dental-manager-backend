import express from 'express';
import verifyToken from '../middlewares/auth';
import AuthService from '../services/auth';
import UsersController from '../controllers/users';
import UserModel from '../models/user';

const router = express.Router();
const usersController = new UsersController(UserModel, AuthService);

router.get('/', verifyToken, (req, res) => usersController.get(req, res));
router.get('/:id?', verifyToken, (req, res) => usersController.getById(req, res));

router.post('/', verifyToken, (req, res) => usersController.create(req, res));
router.post('/email', verifyToken, (req, res) => usersController.checkEmailExist(req, res));
router.post('/authenticate', verifyToken, (req, res) => usersController.authenticate(req, res));
router.post('/recovery-pass', verifyToken, (req, res) => usersController.recoveryPassword(req, res));

router.delete('/:id', verifyToken, (req, res) => usersController.remove(req, res));

router.put('/:id', verifyToken, (req, res) => usersController.update(req, res));

export default router; 
