'use strict';
const express = require('express');
const dbHelper = require('lib/db_helper');
const Promise = require('bluebird');
const router = express.Router();


router.get('/', async (req, res) => {
  let data;
  try {
    data = await Promise.props([
      dbHelper.authors.list(),
      dbHelper.publishes.list()
    ]);
  } catch (err) {
    console.error(err)
  }

  if(data){
    let authors = [];
    let publishes = [];

    for (let i of data[0]) {
      authors.push({
        id: i.id,
        name: i.name
      })
    }

    for (let i of data[1]) {
      publishes.push({
        id: i.id,
        name: i.name
      })
    }

    data = {
      authors: authors,
      publishes: publishes
    }
  }

  res.render('iface/books/add', {data: data});
});

router.post('/', async (req, res) => {
  const name = req.body.name;
  const publication = req.body.date;
  const author = req.body.author;
  const publish = req.body.publish;
  const price = req.body.price;

  try {
    await dbHelper.books.addBook(name, publication, author, publish, price)
  } catch (err) {
    console.error(err)
  }

  res.redirect('/books');

});

module.exports = router;
