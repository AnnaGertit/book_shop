const express = require('express');
const dbHelper = require('lib/db_helper');
const router = express.Router();


router.get('/', async (req, res) => {
  try {
    await dbHelper.books.deleteBookToStore(req.query.id);
  } catch (err) {
    console.error(err)
  }
  res.redirect('/books');
});

module.exports = router;
