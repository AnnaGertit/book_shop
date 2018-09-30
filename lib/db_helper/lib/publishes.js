const mysql = require('lib/mysql');
const Promise = require('bluebird');


const db = {
  list: () => {
    return mysql.queryAsync(`
    SELECT 
    id AS id, name AS name, telephone AS telephone, export_day AS day
FROM
    publish
WHERE
    is_worked = 1
ORDER BY name;
    `).then(list => {
      if (list.length === 0) {
        return Promise.reject(new Error('NO_BOOKS'));
      }
      return Promise.resolve(list);
    }).catch(err => {
      return Promise.reject(err);
    });
  },

  add: (name, exportDay, telephone) => {
    return mysql.queryAsync(`
    INSERT INTO publish (name, export_day, telephone) VALUES ('${name}', '${exportDay}', '${telephone}');
    `).catch(err => {
      return Promise.reject(err);
    });
  },

  deactivate: (id) => {
    return mysql.queryAsync(`
    UPDATE publish SET is_worked='1' WHERE id='${id}';
    `).catch(err => {
      return Promise.reject(err);
    });
  }
};


module.exports = db;