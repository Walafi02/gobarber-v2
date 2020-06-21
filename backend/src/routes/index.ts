import { Router } from 'express';

import appointments from './appointments.route';
import users from './users.route';
import sessions from './sessions.route';

const router = Router();

router.use('/appointments', appointments);
router.use('/users', users);
router.use('/sessions', sessions);

export default router;
