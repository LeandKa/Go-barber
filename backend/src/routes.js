import { Router } from 'express';
import auth from './app/middlewares/auth';
import ProviderController from './app/controllers/ProviderController';
import SessionController from './app/controllers/SessionController';
import UserController from './app/controllers/UserController';
import FileController from './app/controllers/FileController';
import AppointmentController from './app/controllers/AppointmentController';
import AvailableController from './app/controllers/AvailableController';
import NotificationController from './app/controllers/NotificationController';
import ScheduleController from './app/controllers/ScheduleController';

import multer from '../src/config/multer';

const router = new Router();

const use = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

router.post('/session', use(SessionController.login)); //Logar

router.get('/forget', SessionController.forget);

router.get('/users', auth, use(UserController.index)); // retorna apenas um usuario atraves da query

router.post('/user', use(UserController.store)); // criar usuario
router.put('/users', use(UserController.update)); //Mudar senha atraves do email
router.put('/perfil', auth, use(UserController.updatePerfil)); // Mudar outros campos do usuario menos password atraves do id query

router.get('/providers', auth, use(ProviderController.index)); // retorna todos os usuarios que são providers

router.post('/files', auth, multer.single('avatar'), use(FileController.index)); // adiciona uma foto ao banco de dados

router.get('/appointments', auth, use(AppointmentController.index));
router.post('/appointments', auth, use(AppointmentController.store));
router.delete('/appointments/:id', auth, use(AppointmentController.delete));

router.get('/schedule', auth, use(ScheduleController.index));

router.get('/providers/available/:id', auth, use(AvailableController.index));

router.get('/notifications', auth, use(NotificationController.index));
router.put('/notifications', auth, use(NotificationController.update));

export default router;
