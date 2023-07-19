const dotenv = require('dotenv');
dotenv.config();

console.log(process.env.DB_HOST);

module.exports = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  dialect: 'postgres'
}