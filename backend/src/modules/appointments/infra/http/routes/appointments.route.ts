import { Router } from 'express';

import ensoreAuthenticated from '@modules/users/infra/http/middlewares/ensoreAuthenticated';

import AppointmentsController from '../controllers/AppointmentsController';

const appointmentsRouter = Router();

appointmentsRouter.use(ensoreAuthenticated);

// appointmentsRouter.get('/', async (req, res) => {
//   const appointments = await appointmentsRepository.find();

//   return res.json(appointments);
// });

const appointmentsController = new AppointmentsController();

appointmentsRouter.post('/', appointmentsController.create);

export default appointmentsRouter;
