import express from 'express';
import verifyToken from '../middlewares/auth';
import CovenantsController from '../controllers/covenants';
import CovenantModel from '../models/covenant';

const router = express.Router();
const covenantsController = new CovenantsController(CovenantModel);

router.get('/', verifyToken, (req, res) => covenantsController.get(req, res));
router.get('/:id?', verifyToken, (req, res) => covenantsController.getById(req, res));
router.post('/', verifyToken, (req, res) => covenantsController.create(req, res));
router.put('/:id', verifyToken, (req, res) => covenantsController.update(req, res));
router.delete('/:id', verifyToken, (req, res) => covenantsController.remove(req, res));

export default router; 
