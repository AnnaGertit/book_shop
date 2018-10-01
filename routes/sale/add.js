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
  const id = req.body.books;
  try {
    let newTransaction = await dbHelper.sale.newTransaction();
    await dbHelper.sale.addTransaction(id, newTransaction);
  } catch (err) {
    console.error(err)
  }

  try {
    const price = await dbHelper.sale.getPrice(id);
    if (price[0].price > 100) {
      await dbHelper.sale.updatePrice(id);
    }
  } catch (err) {
    console.error(err)
  }

  res.redirect('/sales');
});

module.exports = router;
