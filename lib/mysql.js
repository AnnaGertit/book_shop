"use strict";

const Promise         = require('bluebird');
const mysql           = require('mysql');
const mysqlConfig     = require('../config').get('mysql');

Promise.promisifyAll(require("mysql/lib/Connection").prototype);
Promise.promisifyAll(require("mysql/lib/Pool").prototype);

var pool = mysql.createPool({
  connectionLimit : mysqlConfig.max_connections,
  host            : mysqlConfig.host,
  user            : mysqlConfig.user,
  password        : mysqlConfig.password,
  database        : mysqlConfig.database,
  charset         : mysqlConfig.charset,
  timezone        : mysqlConfig.timezone
});

pool.on('connection', connection => {
  connection.query('SET time_zone = ?', mysqlConfig.timezone);
  connection.on('enqueue', sequence => {
    if (sequence.sql && mysqlConfig.show_query === 1) {
      console.log(`mysql (local) query: ${sequence.sql}`);
    }
  });
});
module.exports = pool;
