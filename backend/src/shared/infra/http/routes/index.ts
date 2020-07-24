import { Router } from 'express';

import appointments from '@modules/appointments/infra/http/routes/appointments.route';
import users from '@modules/users/infra/http/routes/users.route';
import sessions from '@modules/users/infra/http/routes/sessions.route';

const router = Router();

router.use('/appointments', appointments);
router.use('/users', users);
router.use('/sessions', sessions);

export default router;
