require('dotenv').config('../.env')
const pg = require('pg')


module.exports = {
  development: {
    client: 'postgresql',
    connection: process.env.PG_CONNECTION_STRING,
    migrations: {
      directory: __dirname + '/migrations'
    },
    seeds: {
      directory: __dirname + '/seeds'
    }
  }
}

// directory: 'config/db/seeds'