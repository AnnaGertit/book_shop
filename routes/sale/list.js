const express = require('express');
const dbHelper = require('lib/db_helper');
const router = express.Router();


router.get('/', async (req, res) => {

  let list;
  try {
    list = await dbHelper.sale.list();
    console.log(list);
  } catch (err) {
    console.error(err);
  }

  res.render('iface/sale/list', {list: list});
});

module.exports = router;
