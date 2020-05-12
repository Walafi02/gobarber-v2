import { Router } from 'express';

import appointments from './appointments.route';

const router = Router();

router.use('/appointments', appointments);

export default router;
