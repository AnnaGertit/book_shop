const express = require('express');
const dbHelper = require('lib/db_helper');
const router = express.Router();


router.get('/', async (req, res) => {

  let list;
  try {
    list = await dbHelper.publishes.listDays();
    console.log(list);
  } catch (err) {
    console.error(err);
  }

  res.render('iface/publishes/diagram', {list: list});
});

module.exports = router;
