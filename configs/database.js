var mongo = require('mongodb').MongoClient;
var conf = require('../configs/app.conf');
let console = conf.console;
const server = 'localhost:27017'; 
const database = 'test_db';
class Database {
  constructor() {
    this._connect().then(_ => console.log("database connected")).catch(err => console.log("Database connection error", err));
  }
  async _connect() {
    let d = await mongo.connect(`mongodb://${server}/${database}`);
    let db = d.db();
    conf.db = db;
  }
}
module.exports = new Database()