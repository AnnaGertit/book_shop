const mysql = require('lib/mysql');
const Promise = require('bluebird');


const db = {
  list: () => {
    return mysql.queryAsync(`
    SELECT 
    st.id AS id,
    bk.name AS book_name,
    concat(au.first_name, ' ', au.last_name) AS author,
    pb.name AS publish_name,
    year(bk.publication) AS book_publication,
    CEILING(bk.price - (bk.price * st.discont / 100)) AS price,
    COUNT(*) AS count
FROM
    store st
        LEFT JOIN
    books bk ON st.book_id = bk.id
        LEFT JOIN
    autors au ON bk.autor_id = au.id
        LEFT JOIN
    publish pb ON bk.publish_id = pb.id
WHERE
    st.transaction_id IS NULL
GROUP BY st.book_id , CEILING(bk.price - (bk.price * st.discont / 100));
    `).then(list => {
      if (list.length === 0) {
        return Promise.reject(new Error('NO_BOOKS'));
      }
      return Promise.resolve(list);
    }).catch(err => {
      return Promise.reject(err);
    });
  },

  listBooks: () => {
    return mysql.queryAsync(`
    SELECT 
    bk.id AS id,
    CONCAT(au.first_name,
            ' ',
            au.last_name,
            ': "',
            bk.name,
            '" ',
            YEAR(bk.publication),
            ' price: ',
            bk.price) AS book_info
FROM
    books bk
        LEFT JOIN
    autors au ON bk.autor_id = au.id
ORDER BY book_info
    `).then(list => {
      if (list.length === 0) {
        return Promise.reject(new Error('NO_BOOKS'));
      }
      return Promise.resolve(list);
    }).catch(err => {
      return Promise.reject(err);
    });
  },

  addBook: (name, publication, author, publish, price) => {
    return mysql.queryAsync(`
    INSERT INTO books (name, publication, autor_id, publish_id, price) VALUES ('${name}', '${publication}', '${author}', '${publish}', '${price}');

    `).catch(err => {
      return Promise.reject(err);
    });
  },

  addBookToStore: (books, discount, quantity) => {
    let body = '';
    if (quantity === '1') {
      body = `(${books}, ${discount})`;
    } else {
      for (let i = 0; i < quantity - 1; i++) {
        body += `(${books}, ${discount}),`;
      }
      body += `(${books}, ${discount})`;
    }
    console.log(`INSERT INTO store (book_id, discont) VALUES ${body};`);
    return mysql.queryAsync(`
    INSERT INTO store (book_id, discont) VALUES ${body};
    `).catch(err => {
      return Promise.reject(err);
    });
  },

  deleteBookToStore: (id) => {
    return mysql.queryAsync(`
    DELETE FROM store WHERE id='${id}';
    `).catch(err => {
      return Promise.reject(err);
    });
  },

  customList: (data) => {
    return mysql.queryAsync(`
    SELECT 
    st.id AS id,
    bk.name AS book_name,
    concat(au.first_name, ' ', au.last_name) AS author,
    pb.name AS publish_name,
    year(bk.publication) AS book_publication,
    CEILING(bk.price - (bk.price * st.discont / 100)) AS price,
    COUNT(*) AS count
FROM
    store st
        LEFT JOIN
    books bk ON st.book_id = bk.id
        LEFT JOIN
    autors au ON bk.autor_id = au.id
        LEFT JOIN
    publish pb ON bk.publish_id = pb.id
WHERE
    st.transaction_id IS NULL
    ${data}
GROUP BY st.book_id , CEILING(bk.price - (bk.price * st.discont / 100));
    `).then(list => {
      if (list.length === 0) {
        return Promise.reject(new Error('NO_BOOKS'));
      }
      return Promise.resolve(list);
    }).catch(err => {
      return Promise.reject(err);
    });
  },
};


module.exports = db;