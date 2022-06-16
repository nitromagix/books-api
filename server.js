//

require("dotenv").config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const booksController = require('./controllers/books_controller');

const {
   trace,
   apiErrorStub
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
}));
app.use(cors());
app.use(methodOverride('_method'));
app.use(express.json());

// ROUTES

//    /books
app.use('/books', booksController);

//    error
app.get('/error', async (req, res) => {
   const error = '404 - resource not found'
   trace(error)('');

   res.json(apiErrorStub(error));
});

//    /
app.get('/', (req, res) => {
   res.json({msg: 'This API is CORS-enabled for all origins!'});
   // res.redirect('/books');
})

app.get('*', async (req, res) => {
   const error = '404 - resource not found'
   trace(error)('');

   res.json(apiErrorStub(error));
});

// LISTEN

app.listen(PORT, () => {
   trace('CORS-enabled web server listening')(PORT);
})