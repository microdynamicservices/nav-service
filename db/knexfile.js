require('dotenv').config('../.env')
const pg = require('pg')


module.exports = {
  development: {
    client: 'postgresql',
    connection: 'postgres:laura:sdc022019@localhost:5432/adventures',
    migrations: {
      directory: __dirname + '/migrations'
    },
    seeds: {
      directory: __dirname + '/seeds'
    }
  }
}

// directory: 'config/db/seeds'