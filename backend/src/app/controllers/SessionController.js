import * as yup from 'yup';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import Files from '../models/Files';

class SessionController {
    async login(req, res) {
        const schema = yup.object().shape({
            email: yup.string().required(),
            password: yup.string().required(),
        });

        schema.validate(req.body, { abortEarly: false }).catch(e => {
            throw { message: e.errors, status: 400 };
        });

        const { email, password } = req.body;

        const user = await User.findOne({
            where: {
                email: email,
            },
            include: [
                {
                    model: Files,
                    as: 'avatar',
                    attributes: ['url', 'path', 'id'],
                },
            ],
        });

        if (!user) {
            throw { message: 'Erro ao procurar o usuario', status: 400 };
        }

        const check = await user.checkPassword(password);
        if (!check) {
            throw {
                message: 'Password não e igual ao cadastrado',
                status: 400,
            };
        }

        const { id, name, provider, avatar } = user;

        return res.status(200).json({
            id,
            name,
            email: user.email,
            provider,
            avatar,
            token: jwt.sign(
                {
                    id: id,
                },
                process.env.TOKEN_SECRET,
                { expiresIn: '7d' }
            ),
        });
    }

    async forget(req, res) {
        const { email } = req.query;
        console.log(email);
        const user = await User.findOne({
            where: {
                email: email,
            },
            attributes: ['id', 'name', 'email'],
        });
        if (!user) {
            throw {
                message: 'Erro ao procurar o usuario nenhum usuario encontrado',
                status: 400,
            };
        }

        return res.status(200).json(user);
    }
}

export default new SessionController();
