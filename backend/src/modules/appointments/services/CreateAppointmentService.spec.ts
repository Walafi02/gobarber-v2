import AppError from '@shared/errors/AppError';

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

describe('CreateAppointmen', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();

    const createAppointmen = new CreateAppointmentService(
      fakeAppointmentsRepository
    );

    const appointment = await createAppointmen.execute({
      provider_id: '1',
      date: new Date(),
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('1');
  });

  it('should not be able to create two appointments on the same time ', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();

    const createAppointmen = new CreateAppointmentService(
      fakeAppointmentsRepository
    );

    const appointmentDate = new Date(2020, 4, 10, 11);

    await createAppointmen.execute({
      provider_id: '1',
      date: appointmentDate,
    });

    expect(
      createAppointmen.execute({
        provider_id: '2',
        date: appointmentDate,
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
