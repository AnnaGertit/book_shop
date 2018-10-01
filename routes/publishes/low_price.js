const express = require('express');
const dbHelper = require('lib/db_helper');
const router = express.Router();


router.get('/', async (req, res) => {
  let price;
  try {
    price = await dbHelper.publishes.low_price(req.query.id);
    console.log(price);
  } catch (err) {
    console.error(err);
  }

  res.render('iface/publishes/low_price', {price: price});
});

module.exports = router;
