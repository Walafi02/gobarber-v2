import { Router } from 'express';

import appointments from './appointments.route';
import users from './users.route';

const router = Router();

router.use('/appointments', appointments);
router.use('/users', users);

export default router;
