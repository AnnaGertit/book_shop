const express = require('express');
const dbHelper = require('lib/db_helper');
const router = express.Router();


router.get('/', async (req, res) => {
  let books;
  try {
    books = await dbHelper.books.listBooks();
  } catch (err) {
    console.error(err)
  }

  res.render('iface/books/store', {data: books});
});

router.post('/', async (req, res) => {
  console.log(req.body);
  const books = req.body.books;
  const discount = req.body.discount || 0;
  const quantity = req.body.quantity;
  try {
    await dbHelper.books.addBookToStore(books, discount, req.body.quantity, quantity);
  } catch (err) {
    console.error(err)
  }

  res.redirect('/books');

});

module.exports = router;
