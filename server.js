
require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const { initDatabase } = require('./database')
const { users } = require('./routes/users.js');
const PORT = 9191;

async function main() {
  const server = express();
  server.use(bodyParser.json())
  server.use(bodyParser.urlencoded({extended: false}))
  server.use('/api/v1/', users);

  const sequalize = await initDatabase();
  server.listen(PORT, () => {
    console.log(`Server is UP via port ${PORT}...`);
  });
}

main();
