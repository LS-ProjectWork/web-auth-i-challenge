// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './database/authDB.db3'
    },
    migrations: {
      directory: './database/migrations'
    },
    useNullAsDefault: true
  },

};
