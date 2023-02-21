var mongo = require('mongodb').MongoClient;
var conf = require('../configs/app.conf');
let console = conf.console;
const server = 'localhost:27017'; 
const database = 'crm';
class Database {
  constructor() {
    this._connect().then(_ => console.log("database connected")).catch(err => console.log("Database connection error", err));
  }
  async _connect() {
    let d = await mongo.connect(`mongodb://${server}/${database}`);
    let db = d.db();
    let candidates = db.collection("candidates");
    await candidates.createIndexes([{
      key: { id: 1 },
      unique: true,
    }, {
      key: { first_name: 1 }
    }, {
      key: { last_name: 1 }
    }, {
      key: { email: 1 },
      unique: true,
    }]);
    conf.collections = {
      candidates: candidates,
    };
  }
}
module.exports = new Database()