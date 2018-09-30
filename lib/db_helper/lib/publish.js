const mysql = require('lib/mysql');
const Promise = require('bluebird');


const db = {
  list: () => {
    return mysql.queryAsync(`
    SELECT 
    id AS id, name AS name
FROM
    publish;
    `).then(list => {
      if (list.length === 0) {
        return Promise.reject(new Error('NO_BOOKS'));
      }
      return Promise.resolve(list);
    }).catch(err => {
      return Promise.reject(err);
    });
  }
};


module.exports = db;