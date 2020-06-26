import express from 'express';
import verifyToken from '../middlewares/auth';
import PatientsController from '../controllers/patients';
import PatientModel from '../models/patient';

const router = express.Router();
const patientsController = new PatientsController(PatientModel);

router.get('/loadEnumValues', verifyToken, (req, res) => patientsController.loadEnumValues(req, res));
router.get('/', verifyToken, (req, res) => patientsController.get(req, res));
router.get('/:id', verifyToken, (req, res) => patientsController.getById(req, res));
router.get('/search/:q', verifyToken, (req, res) => patientsController.search(req, res));
router.post('/', verifyToken, (req, res) => patientsController.create(req, res));
router.put('/:id', verifyToken, (req, res) => patientsController.update(req, res));
router.delete('/:id', verifyToken, (req, res) => patientsController.remove(req, res));

export default router; 
