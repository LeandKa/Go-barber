import User from '../models/User';
import Appointment from '../models/Appointment';
import pt from 'date-fns/locale/pt';
import {
    startOfHour,
    parseISO,
    isBefore,
    subHours,
    format,
    isWeekend,
} from 'date-fns';
import * as yup from 'yup';
import Files from '../models/Files';
import Queue from '../../lib/Queue';
import Notifications from '../models/Notifications';
import CancelMail from '../jobs/CancelMail';

class AppointmentController {
    async index(req, res) {
        const { page } = req.query;

        const appointments = await Appointment.findAll({
            where: {
                user_id: req.body.user_id,
            },
            order: ['data'],
            attributes: ['id', 'data', 'past', 'cancelable'],
            limit: 20,
            offset: ((page || 1) - 1) * 20,
            include: [
                {
                    model: User,
                    as: 'provider',
                    attributes: ['id', 'name'],
                    include: [
                        {
                            model: Files,
                            as: 'avatar',
                            attributes: ['path', 'url'],
                        },
                    ],
                },
            ],
        });

        const total = await Appointment.count();
        const totalPage = Math.ceil(total / 20);

        return res
            .status(200)
            .json({ appointments, page: page || 1, limit: 20, totalPage });
    }

    async store(req, res) {
        const schema = yup.object().shape({
            data: yup.date().required(),
            user_id: yup.number().required(),
            provider_id: yup.number().required(),
        });

        schema.validate(req.body, { abortEarly: false }).catch(e => {
            throw { message: e.errors, status: 400 };
        });
        const { data, provider_id, user_id } = req.body;

        const provider = await User.findOne({
            where: {
                id: provider_id,
                provider: true,
            },
        });

        if (!provider) {
            throw { message: 'Por favor passe um id de provider valido' };
        }

        const hourStart = startOfHour(parseISO(data));

        if (isWeekend(hourStart)) {
            throw {
                message: 'Não pode ser usado uma data no fim de semana',
            };
        }

        if (isBefore(hourStart, new Date())) {
            throw {
                message: 'Data invalida sendo anterior a data atual',
                status: 400,
            };
        }

        const avaible = await Appointment.findOne({
            where: {
                provider_id,
                canceled_at: null,
                data: hourStart,
            },
        });

        if (avaible) {
            throw {
                message: 'Horario não disponivel',
                status: 400,
            };
        }

        if (provider_id === user_id) {
            throw {
                message: 'Você não pode fazer um agendamento como você mesmo',
                status: 400,
            };
        }
        const appointments = await Appointment.create({
            data: hourStart,
            user_id: user_id,
            provider_id: provider_id,
        });

        const userNotification = await User.findOne({
            where: {
                id: user_id,
            },
        });

        const formatDate = format(
            hourStart,
            "'dia' dd 'de' MMMM', às' H:mm'h'",
            { locale: pt }
        );

        const notification = await Notifications.create({
            content: `Novo agendamento de ${userNotification.name} para ${formatDate}`,
            user_id: provider_id,
        });

        return res.status(200).json(appointments);
    }

    async delete(req, res) {
        const { id } = req.params;

        const appointments = await Appointment.findOne({
            where: {
                id: id,
            },
            include: [
                {
                    model: User,
                    as: 'provider',
                    attributes: ['id', 'name'],
                },
                {
                    model: User,
                    as: 'user',
                    attributes: ['id', 'name'],
                },
            ],
        });

        if (appointments.user_id !== req.userid) {
            throw {
                message: 'Não foi possivel porque este não e o seu agendamento',
                status: 400,
            };
        }

        const date = subHours(appointments.date, 2);

        if (isBefore(date, new Date())) {
            throw {
                message: 'Não pode cancelar agendamento com menos de 2 horas',
                status: 400,
            };
        }

        await appointments.update({
            canceled_at: new Date(),
        });

        const appointment = await Appointment.findByPk(id);

        await Queue.add(CancelMail.key, {
            appointment,
        });

        return res.status(200).json(appointments);
    }
}

export default new AppointmentController();
