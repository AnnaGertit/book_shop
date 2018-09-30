const express = require('express');
const dbHelper = require('lib/db_helper');
const router = express.Router();


router.get('/', async (req, res) => {
  try {
    await dbHelper.publishes.deactivate(req.query.id);
  } catch (err) {
    console.error(err)
  }
  res.redirect('/publishes');
});

module.exports = router;
