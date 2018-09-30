const express = require('express');
const dbHelper = require('lib/db_helper');
const router = express.Router();


router.get('/', async (req, res) => {
  res.render('iface/books/writer');
});

router.post('/', async (req, res) => {
  try {
    await dbHelper.authors.add(req.body.first_name, req.body.last_name)
  } catch (err) {
    console.error(err)
  }

  res.redirect('/books');
});

module.exports = router;
