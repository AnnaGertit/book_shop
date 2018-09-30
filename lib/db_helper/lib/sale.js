const mysql = require('lib/mysql');
const Promise = require('bluebird');


const db = {
  list: () => {
    return mysql.queryAsync(`
    SELECT 
    tr.id AS id,
    bk.name AS book,
    st.discont AS discont,
    CEIL(bk.price * COUNT(*) - (bk.price * COUNT(*) * st.discont / 100)) AS price,
    DATE(tr.date) AS date,
    COUNT(*) AS count
FROM
    transactions tr
        INNER JOIN
    store st ON st.transaction_id = tr.id
        LEFT JOIN
    books bk ON st.book_id = bk.id
GROUP BY st.book_id , st.discont
    `).then(list => {
      if (list.length === 0) {
        return Promise.reject(new Error('NO_BOOKS'));
      }
      return Promise.resolve(list);
    }).catch(err => {
      return Promise.reject(err);
    });
  },

  bookForSale: () => {
    return mysql.queryAsync(`
    SELECT 
    st.id AS id,
    CONCAT(au.first_name,
            ' ',
            au.last_name,
            ': "',
            bk.name,
            '" ',
            YEAR(bk.publication),
            ' price: ',
            CEILING(bk.price - (bk.price * st.discont / 100))) AS book_info
FROM
    store st
        LEFT JOIN
    books bk ON st.book_id = bk.id
        LEFT JOIN
    autors au ON bk.autor_id = au.id
WHERE
    st.transaction_id IS NULL
GROUP BY st.book_id , st.discont;
    `).then(list => {
      if (list.length === 0) {
        return Promise.reject(new Error('NO_BOOKS'));
      }
      return Promise.resolve(list);
    }).catch(err => {
      return Promise.reject(err);
    });
  },

  newTransaction: () => {
    return mysql.queryAsync(`
    INSERT INTO transactions (date) VALUES (now());
    `).then(list => {
      if (list.length === 0) {
        return Promise.reject(new Error('NO_BOOKS'));
      }
      return Promise.resolve(list.insertId);
    }).catch(err => {
      return Promise.reject(err);
    });
  },

  addTransaction: (id, transactionId) => {
    return mysql.queryAsync(`
    UPDATE store 
SET 
    transaction_id = '${transactionId}'
WHERE
    id = '${id}'
    `).catch(err => {
      return Promise.reject(err);
    });
  }
};


module.exports = db;