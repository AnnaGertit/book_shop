const express = require('express');
const dbHelper = require('lib/db_helper');
const router = express.Router();


router.get('/', async (req, res) => {

  let list;
  try {
    list = await dbHelper.books.list();
  } catch (err) {
    console.error(err);
  }

  res.render('iface/books/list', {list: list});
});

module.exports = router;
