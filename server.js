//

require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const booksController = require('./controllers/books_controller');

const {
   trace
} = require('./helper');

const PORT = process.env.PORT;

const app = express();

mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
   },
   () => {
      trace('connected to mongo')(process.env.MONGO_URI);
   });

// MIDDLEWARE

app.use(express.urlencoded({
   extended: true
}))
app.use(methodOverride('_method'))

// ROUTES

app.use('/books', booksController)


app.get('/', (req, res) => {
   res.redirect('/books')
})

// LISTEN
app.listen(PORT, () => {
   trace('server listening')(PORT);
})