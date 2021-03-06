//

const express = require('express');
const books = express.Router();
const Book = require('../models/book');
const Book_Seed = require('../data/books_seed');

const {
   trace,
   apiErrorStub
} = require('../helper');
const { response } = require('express');

// RETRIEVE - SEED DATA

books.get('/data/seed', async (req, res) => {
   const params = req.params;
   trace('/data/seed (GET)')(params);
   const seedData = Book_Seed;
   await Book.insertMany(seedData);
   trace('seed book data')('success');
   res.redirect('/books');
})

// READ

books.get('/:id', async (req, res) => {
   const id = req.params.id;
   trace('/books/:id (GET)')(id);

   try {
      const foundBook = await Book.findById(id);
      res.json(foundBook);
   } catch(err) {
      res.redirect('/error')
   }
})

// CREATE

books.post('/', async (req, res) => {
   const params = req.params;
   trace('/books (POST)')(params);
   if (!req.body.imageURL) {
      req.body.imageURL = undefined;
   }

   const newBook = await Book.create(req.body);
   res.redirect('/books');
})

// UPDATE

books.put('/:id', async (req, res) => {
   const params = req.params;
   const id = params.id;
   const body = req.body;
   trace('/books/:id (PUT)')(id);

   const updatedBook = await Book.findByIdAndUpdate(id, body, {
      new: true
   });
   console.log(updatedBook)
   res.redirect(`/books/${id}`)

})

// DELETE

books.delete('/:id', async (req, res) => {
   const params = req.params;
   const id = params.id;
   trace('/books/:id (DELETE)')(id);

   const deletedBook = await Book.findByIdAndDelete(id);
   res.status(303).redirect('/books');

})

// READ - INDEX

books.get('/', async (req, res) => {
   const params = req.params;
   trace('/books (GET)')(params);

   const foundBooks = await Book.find();

   res.json(foundBooks);
})

// ERROR

books.get('*', async (req, res) => {
   const error = '404 - resource not found';
   trace(error)('');

   res.json(apiErrorStub(error));
});


module.exports = books;