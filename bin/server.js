const app = require('../src/app');
const http = require('http');
const dotenv = require('dotenv');

dotenv.config({ path: __dirname + '/.env' });
dotenv.load();

const server = http.createServer(app);
const PORT = 3000;

server.listen(PORT, err => {
  if(err) console.log(err);
  else    console.log('server running on port ' + PORT);
});