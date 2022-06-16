//

const express = require('express');
const books = express.Router();
const {
   trace,
   stub
} = require('../helper');
// const Book = require('../models/book');


// READ - INDEX

books.get('/', async (req, res) => {
   const params = req.params;
   trace('/books (GET)')(params);

   res.send(stub('books'));
})

module.exports = books;