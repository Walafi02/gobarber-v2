import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';

import UsersController from '../controllers/UsersController';
import UserAvatarController from '../controllers/UserAvatarController';

import ensoreAuthenticated from '../middlewares/ensoreAuthenticated';

const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', usersController.create);

usersRouter.patch(
  '/avatar',
  ensoreAuthenticated,
  upload.single('avatar'),
  userAvatarController.update
);

export default usersRouter;
