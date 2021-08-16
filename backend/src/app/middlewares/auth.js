import jwt from 'jsonwebtoken';
import { promisify } from 'util';

export default async (req, res, next) => {
    const authHeater = req.headers.authorization;

    if (!authHeater) {
        return res.status(401).json({ error: 'Token not provided' });
    }

    try {
        const verify = await promisify(jwt.verify)(authHeater, 'secret');

        req.userId = verify.id;
        return next();
    } catch (error) {
        return res.status(401).send('Invalid Token');
    }
};
