const express = require('express');
const dbHelper = require('lib/db_helper');
const router = express.Router();


router.get('/', async (req, res) => {
  res.render('iface/publishes/add');
});

router.post('/', async (req, res) => {

  try {
    await dbHelper.publishes.add(req.body.name, req.body.export_day, req.body.telephone)
  } catch (err) {
    console.error(err)
  }

  res.redirect('/publishes');

});

module.exports = router;
