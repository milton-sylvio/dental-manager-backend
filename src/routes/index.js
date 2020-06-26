import express from 'express';
import usersRoute from './users';
import patientsRoute from './patients';
import covenantsRoute from './covenants';

const router = express.Router();

router.use('/users', usersRoute);
router.use('/patients', patientsRoute);
router.use('/covenants', covenantsRoute);
router.get('/', (req, res) => res.send('Hello World!'));

export default router;