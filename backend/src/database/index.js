import Sequelize from 'sequelize';

import DatabaseConfig from '../config/database';
import User from '../app/models/User';
import Files from '../app/models/Files';
import Appointment from '../app/models/Appointment';
import Notifications from '../app/models/Notifications';

const models = [User, Files, Appointment, Notifications];

class Database {
    constructor() {
        this.init();
    }

    init() {
        this.connection = new Sequelize(DatabaseConfig);
        models
            .map(model => model.init(this.connection))
            .map(
                model =>
                    model.associate && model.associate(this.connection.models)
            );
    }
}

export default new Database();
