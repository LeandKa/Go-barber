import Files from '../models/Files';

class FileController {
    async index(req, res) {
        const avatar = req.file;

        if (!avatar) {
            throw {
                message: 'Por favor passe uma foto ',
                status: 404,
            };
        }

        const files = await Files.create({
            name: avatar.originalname,
            path: avatar.filename,
        });
        if (!files) {
            throw {
                message: 'Algo deu errado ao adicionar o arquivo',
                status: 400,
            };
        }
        return res.status(200).send({ files });
    }
}

export default new FileController();
