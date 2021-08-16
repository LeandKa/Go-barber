import User from '../models/User';
import File from '../models/Files';
import * as yup from 'yup';

class UserController {
    async index(req, res) {
        const { id } = req.query;
        const user = await User.findOne({
            where: { id: id },
            attributes: ['id', 'name', 'email'],
            include: [
                {
                    model: File,
                    as: 'avatar',
                    attributes: ['path', 'url'],
                },
            ],
        });
        if (!user) {
            throw { message: 'Erro ao procurar o usuario', status: 400 };
        }
        return res.status(200).send(user);
    }

    async store(req, res) {
        const schema = yup.object().shape({
            name: yup.string().required(),
            email: yup.string().required(),
            avatar_id: yup.string().required(),
            password: yup.string().required(),
        });

        schema.validate(req.body, { abortEarly: false }).catch(e => {
            throw { message: e.errors, status: 400 };
        });

        const { email, name, password, avatar_id, provider } = req.body;

        const user = await User.findOne({
            where: {
                email: email,
            },
        });

        if (user) {
            throw {
                message: 'Email já cadastrado',
                status: 400,
            };
        }

        const create = await User.create({
            email,
            name,
            password,
            avatar_id: avatar_id || 2,
            provider,
        });

        if (create) {
            return res.status(200).json(create);
        }
    }

    async update(req, res) {
        const schema = yup.object().shape({
            confirmPassword: yup
                .string()
                .required()
                .min(6)
                .oneOf(
                    [yup.ref('newPassword'), null],
                    'Passwords precisam ser iguais'
                ),
            newPassword: yup
                .string()
                .required()
                .min(6),
        });

        schema.validate(req.body, { abortEarly: false }).catch(e => {
            throw { message: e.errors, status: 400 };
        });

        const { email } = req.query;
        const { newPassword } = req.body;

        const users = await User.findOne({
            where: {
                email: email,
            },
        });

        if (!users) {
            throw {
                message: 'Usuario não encontrado',
                status: 404,
            };
        }
        const check = await users.checkPassword(newPassword);

        if (check) {
            throw {
                message: 'Senha e igual a sua antiga escolha outra',
                status: 400,
            };
        } else {
            await users.update({
                password: newPassword,
            });

            const usersUpdate = await User.findOne({
                where: {
                    email: email,
                },
                attributes: ['id', 'name', 'provider', 'email', 'password'],
                include: [
                    {
                        model: File,
                        as: 'avatar',
                        attributes: ['path', 'url'],
                    },
                ],
            });

            return res.status(200).json(usersUpdate);
        }
    }

    async updatePerfil(req, res) {
        const { id } = req.query;
        const { email, avatar_id, name } = req.body;
        const schema = yup.object().shape({
            id: yup.string().required('Id do usuario precisa ser passado'),
        });

        schema.validate(req.query, { abortEarly: false }).catch(e => {
            return res.status(400).json(e.errors);
        });

        const users = await User.findOne({ where: { id: id } });

        if (!users) {
            throw {
                message: 'Usuario não encontrado',
                status: 404,
            };
        }

        await users.update({
            name: name || users.name,
            email: email || users.email,
            avatar_id: avatar_id || users.avatar_id,
        });
        const { provider, avatar } = await User.findOne({
            where: { id: id },
            include: [
                {
                    model: File,
                    as: 'avatar',
                    attributes: ['url', 'path', 'id'],
                },
            ],
        });

        return res
            .status(200)
            .json({ id, name, email: users.email, provider, avatar });
    }
}

export default new UserController();
