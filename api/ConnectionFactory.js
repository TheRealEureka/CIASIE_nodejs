const knex = require('knex')({
    client: 'mysql',
    connection: {
        host : 'db',
        port : 3306,
        user : 'root',
        password : process.env.MARIADB_ROOT_PASSWORD,
        database : process.env.MARIADB_DATABASE
    }
});

module.exports = knex;