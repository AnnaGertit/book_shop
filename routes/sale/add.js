const express = require('express');
const dbHelper = require('lib/db_helper');
const router = express.Router();


router.get('/', async (req, res) => {
  let books;
  try {
    books = await dbHelper.sale.bookForSale();
  } catch (err) {
    console.error(err)
  }

  res.render('iface/sale/add', {data: books});
});


router.post('/', async (req, res) => {
  try {
    let newTransaction = await dbHelper.sale.newTransaction();
    await dbHelper.sale.addTransaction(req.body.books, newTransaction);
  } catch (err) {
    console.error(err)
  }

  res.redirect('/sales');
});

module.exports = router;
