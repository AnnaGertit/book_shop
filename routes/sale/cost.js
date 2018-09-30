const express = require('express');
const dbHelper = require('lib/db_helper');
const router = express.Router();

router.get('/', async (req, res) => {
  res.render('iface/sale/cost');
});

router.post('/', async (req, res) => {
  let gettingPrises;
  let sumValues = 0;
  try {
    gettingPrises = await dbHelper.sale.salesPerDay(req.body.date);
    for (let i of gettingPrises) {
      sumValues += parseInt(i.price, 10)
    }
  } catch (err) {
    console.error(err);
  }

  res.render('iface/sale/cost', {data: sumValues});
});

module.exports = router;
