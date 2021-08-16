import Mail from '../../lib/Mail';

class CancelMail {
    get key() {
        return 'CancelMail';
    }

    async handle({ data }) {
        const { appointment } = data;

        await Mail.sendMail({
            to: `${appointment.provider.name} <${appointment.provider.email}>`,
            subject: 'Cancelamento',
            template: 'appointmentCancel',
            context: {
                provider: appointment.provider.name,
                user: appointment.user.name,
                date: format(
                    parseISO(appointment.date),
                    "'dia' dd 'de' MMMM', às' H:mm'h'",
                    {
                        locale: pt,
                    }
                ),
            },
        });
    }
}

export default new CancelMail();
