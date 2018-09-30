const mysql = require('lib/mysql');
const Promise = require('bluebird');


const db = {
  list: () => {
    return mysql.queryAsync(`
    SELECT 
    id AS id, CONCAT(first_name, ' ', last_name) AS name
FROM
    autors
    `).then(list => {
      if (list.length === 0) {
        return Promise.reject(new Error('NO_BOOKS'));
      }
      return Promise.resolve(list);
    }).catch(err => {
      return Promise.reject(err);
    });
  },

  add: (firstName, lastName) => {
    return mysql.queryAsync(`
    INSERT INTO autors (first_name, last_name) VALUES ('${firstName}', '${lastName}');

    `).catch(err => {
      return Promise.reject(err);
    });
  },
};


module.exports = db;