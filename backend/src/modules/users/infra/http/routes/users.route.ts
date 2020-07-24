import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';

import UserRepository from '@modules/users/infra/typeorm/repositories/UserRepository';
import CreateUserService from '@modules/users/services/CreateUserService';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

import ensoreAuthenticated from '../middlewares/ensoreAuthenticated';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (req, res) => {
  const userRepository = new UserRepository();
  const { name, email, password } = req.body;

  const createUser = new CreateUserService(userRepository);

  const user = await createUser.execute({
    name,
    email,
    password,
  });

  return res.json(user);
});

usersRouter.patch(
  '/avatar',
  ensoreAuthenticated,
  upload.single('avatar'),
  async (req, res) => {
    const userRepository = new UserRepository();
    const updateUserAvatar = new UpdateUserAvatarService(userRepository);

    const user = await updateUserAvatar.execute({
      user_id: req.user.id,
      avatarFileName: req.file.filename,
    });

    delete user.password;

    return res.json(user);
  }
);

export default usersRouter;
