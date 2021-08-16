import {
    startOfDay,
    endOfDay,
    parseISO,
    setSeconds,
    setHours,
    setMinutes,
    format,
    isAfter,
} from 'date-fns';
import Appointment from '../models/Appointment';
import { Op } from 'sequelize';

class AvailableController {
    async index(req, res) {
        const { id } = req.params;
        const { date } = req.query;

        console.log(date);
        const parsed = Number(date);

        const appointments = await Appointment.findAll({
            where: {
                provider_id: id,
                canceled_at: null,
                data: {
                    [Op.between]: [startOfDay(date), endOfDay(date)],
                },
            },
        });
        const schedule = [
            '08:00',
            '09:00',
            '10:00',
            '11:00',
            '12:00',
            '13:00',
            '14:00',
            '15:00',
            '16:00',
            '17:00',
            '18:00',
            '19:00',
            '20:00',
            '21:00',
        ];
        const available = schedule.map(time => {
            const [hour, minute] = time.split(':');
            const value = setSeconds(
                setMinutes(setHours(parsed, hour), minute), //Formatador de Horas
                0
            );
            return {
                time,
                value: format(value, "yyyy-MM-dd'T'HH:mm:ssxxx"),
                valie:
                    isAfter(value, new Date()) && // Mostra false ou true para as hora disponiveis
                    !appointments.find(a => format(a.data, 'HH:mm') === time),
            };
        });

        return res.status(200).json(available);
    }
}

export default new AvailableController();
