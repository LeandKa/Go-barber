import User from '../models/User';
import File from '../models/Files';
import * as yup from 'yup';
import { Op } from 'sequelize';
import Appointment from '../models/Appointment';
import { startOfDay, endOfDay, parseISO } from 'date-fns';

class ScheduleController {
    async index(req, res) {
        const { date } = req.query;
        console.log(date);
        const schema = yup.object().shape({
            id: yup.string().required(),
            date: yup.string().required(),
        });

        schema.validate(req.body, { abortEarly: false }).catch(e => {
            throw { message: e.errors, status: 400 };
        });

        const user = await User.findOne({
            where: {
                id: req.userId,
                provider: true,
            },
        });

        if (!user) {
            throw {
                message: 'User não e um provedor',
                status: 400,
            };
        }

        const parsed = parseISO(date);

        const appointments = await Appointment.findAll({
            where: {
                provider_id: req.userId,
                canceled_at: null,
                data: {
                    [Op.between]: [startOfDay(parsed), endOfDay(parsed)],
                },
            },
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: ['name'],
                    include: [
                        {
                            model: File,
                            as: 'avatar',
                            attributes: ['url', 'path'],
                        },
                    ],
                },
            ],
            order: ['data'],
        });

        return res.status(200).json(appointments);
    }
}

export default new ScheduleController();
