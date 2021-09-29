const {Client} = require('pg')

const connectionData = new Client ({
    user: 'postgres',
    host: '',
    database: 'node',
    password: 'wi8h51u1',
    port: 5432,
  })

module.exports = connectionData;
