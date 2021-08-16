import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import path from 'path';
import routes from './routes';

import './database';

class App {
    constructor() {
        this.server = express();
        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.server.use(cors());
        this.server.use(express.json());
        this.server.use(
            '/images/avatar',
            express.static(path.resolve(__dirname, '../images/avatar'))
        );
    }

    routes() {
        this.server.use(routes);
        this.server.use(async (err, req, res, next) => {
            if (!err.status) {
                return res.status(500).json(err.message);
            }
            return res.status(err.status).json(err.message);
        });
    }
}

export default new App().server;
