import { Router } from 'express';

import UserRepository from '@modules/users/infra/typeorm/repositories/UserRepository';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (req, res) => {
  const userRepository = new UserRepository();
  const { email, password } = req.body;
  const authenticateUser = new AuthenticateUserService(userRepository);

  const { user, token } = await authenticateUser.execute({ email, password });

  return res.json({ user, token });
});

export default sessionsRouter;
