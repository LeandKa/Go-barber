import Sequelize, { Model } from 'sequelize';

class Files extends Model {
    static init(sequelize) {
        super.init(
            {
                name: Sequelize.STRING,
                path: Sequelize.STRING,
                url: {
                    type: Sequelize.VIRTUAL,
                    get() {
                        return `${process.env.BASIC_URL}/images/avatar/${this.path}`;
                    },
                },
            },
            {
                sequelize,
            }
        );
        return this;
    }
}

export default Files;
