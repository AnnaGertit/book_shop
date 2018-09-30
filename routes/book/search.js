const express = require('express');
const dbHelper = require('lib/db_helper');
const router = express.Router();


router.get('/', async (req, res) => {
  res.render('iface/books/search');
});

router.post('/', async (req, res) => {
  console.log(req.body);
  let parameters = '';

  const book = req.body.book;
  if (book !== '') {
    parameters += `AND bk.name LIKE '%${book}%'`;
  }

  const author = req.body.author;
  if (author !== '') {
    parameters += `AND CONCAT(au.first_name, ' ', au.last_name) LIKE '%${author}%'`
  }

  const publish = req.body.publish;
  if (publish !== '') {
    parameters += `AND pb.name LIKE '%${publish}%'`
  }

  const startYear = req.body.start_year;
  const endYear = req.body.end_year;
  if (startYear !== '' && endYear !== ''){
    parameters += `AND YEAR(bk.publication) BETWEEN '${startYear}' AND '${endYear}'`;
  } else if (startYear !== '') {
    parameters += `AND YEAR(bk.publication) > '${startYear}'`;
  } else if (endYear !== '') {
    parameters += `AND YEAR(bk.publication) < '${endYear}'`;
  }

  const minPrice = req.body.min_price;
  const maxPrice = req.body.max_price;
  if (minPrice !== '' && maxPrice !== ''){
    parameters += `AND CEILING(bk.price - (bk.price * st.discont / 100)) BETWEEN '${minPrice}' AND '${maxPrice}'`;
  } else if (minPrice !== '') {
    parameters += `AND CEILING(bk.price - (bk.price * st.discont / 100)) > '${minPrice}'`;
  } else if (maxPrice !== '') {
    parameters += `AND CEILING(bk.price - (bk.price * st.discont / 100)) < '${maxPrice}'`;
  }


  let list;
  try {
    list = await dbHelper.books.customList(parameters);
    console.log(list);
  } catch (err) {
    console.error(err);
  }

  res.render('iface/books/search', {list: list});
});

module.exports = router;
