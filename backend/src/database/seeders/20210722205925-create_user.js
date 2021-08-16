const bcrypt = require('bcryptjs');

module.exports = {
    up: (QueryInterface) => {
        return QueryInterface.bulkInsert(
            'users',
            [
                {
                    name: 'Teste',
                    email: 'teste@fastfeet.com',
                    provider: true,
                    password_hash: bcrypt.hashSync('12345', 8),
                    created_at: new Date(),
                    updated_at: new Date(),
                },
            ],
            {}
        );
    },

    down: () => {},
};
