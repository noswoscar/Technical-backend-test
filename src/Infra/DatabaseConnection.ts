const { Client } = require('pg')
const client = new Client({
      user: 'oscar',
      host: 'localhost',
      database: 'parkingApp',
      password: 'parkingAppFull',
      port: 5432,
})
client.connect(function (err) {
      if (err) throw err
      console.log('Connected to postgres database!')
})
