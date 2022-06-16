//

const express = require('express');
const {
   trace,
   stub
} = require('../helper');
const Book = require('../models/book');
const books = express.Router();

// READ - INDEX

books.get('/', async (req, res) => {
   const params = req.params;
   trace('/books (GET)')(params);

   res.send(stub('books'));
})