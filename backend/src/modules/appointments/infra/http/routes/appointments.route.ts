import { Router } from 'express';
import { parseISO } from 'date-fns';
// import { getCustomRepository } from 'typeorm';

import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

import ensoreAuthenticated from '@modules/users/infra/http/middlewares/ensoreAuthenticated';

const appointmentsRouter = Router();

appointmentsRouter.use(ensoreAuthenticated);

// appointmentsRouter.get('/', async (req, res) => {
//   const appointments = await appointmentsRepository.find();

//   return res.json(appointments);
// });

appointmentsRouter.post('/', async (req, res) => {
  const appointmentsRepository = new AppointmentsRepository();
  const { provider_id, date } = req.body;

  const parsedDate = parseISO(date);

  const createAppointment = new CreateAppointmentService(
    appointmentsRepository
  );

  const appointment = await createAppointment.execute({
    provider_id,
    date: parsedDate,
  });
  return res.json(appointment);
});

export default appointmentsRouter;
