import User from '../models/User';
import Files from '../models/Files';

class ProviderController {
    async index(req, res) {
        const user = await User.findAll({
            where: {
                provider: true,
            },

            attributes: ['id', 'name', 'email'],
            include: [
                {
                    model: Files,
                    as: 'avatar',
                    attributes: ['path', 'url'],
                },
            ],
        });

        if (!user) {
            throw { message: 'Erro ao buscar', status: 500 };
        }

        return res.status(200).json({ user });
    }
}

export default new ProviderController();
