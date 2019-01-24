// Update with your config settings.

module.exports = {

  development: {
    client: 'mysql',
    connection: {
      host : 'localhost',
      user : 'root',
      password : 'Naza10092011+',
      database : 'dessine_moi_un_job'
    },
    migrations: {
      directory: __dirname + '/db/migrations',
    },
    seeds: {
      directory: __dirname + '/db/dev_seeds',
    },
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    migrations: {
      directory: __dirname + '/db/migrations',
    },
    seeds: {
      directory: __dirname + '/db/seeds',
    },
  }

};
