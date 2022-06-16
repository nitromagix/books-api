//

const mongoose = require('mongoose');
const {
   Schema
} = mongoose;

const {
   trace,
   dateToMMDDYYYY
} = require('../helper');

const bookSchema = new Schema({
   title: {
      type: String,
      required: true
   },
   description: {
      type: String,
   },
   year: {
      type: String,
      min: 0,
      max: ((new Date()).getFullYear() + 1)
   },
   quantity: {
      type: Number,
      min: 0,
      required: true
   },
   imageURL: {
      type: String,

   },
   // author: {
   //    type: Schema.Types.ObjectId,
   //    ref: 'Author'
   // },
})

// // helper methods 
// // instance
// bookSchema.methods.getBakedBy = function () {
//    return `${this.name} was baked with gloves by ${this.baker.name}, who has been with us since ${dateToMMDDYYYY(this.baker.startDate)}`
// }

// // static
// bookSchema.static('getBreadsBakedBy', function (baker) {
//    return this.find({
//       baker
//    });
// });

const Book = mongoose.model('Book', bookSchema)

module.exports = Book;