import User from '../models/User';
import Notifications from '../models/Notifications';

class NotificationController {
    async index(req, res) {
        const { id } = req.query;

        const provider = await User.findOne({
            where: {
                id,
                provider: true,
            },
        });

        if (!provider) {
            throw {
                message: 'Provider não encontrado',
                status: 404,
            };
        }

        const notification = await Notifications.findAll({
            where: {
                user_id: id,
            },
            order: ['created_at'],
            limit: 20,
        });

        return res.status(200).json(notification);
    }

    async update(req, res) {
        const { id } = req.query;

        const notification = await Notifications.findOne({
            where: {
                id,
            },
        });

        if (!notification) {
            throw {
                message: 'Notificação não encontrada',
                status: 404,
            };
        }

        await notification.update({
            read: true,
        });

        return res.status(200).json(notification);
    }
}

export default new NotificationController();
