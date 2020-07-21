'use strict';

const mongoose = require('mongoose');

const schema = mongoose.Schema({
  // id: { type: 'Number', required: true, },
  //a reference to a record in the category collection
  category: { type: String, required: true },
  name: { type: String, required: true },
  display_name: { type: String },
  description: { type: String },
  price: { type: Number },
  inStock: { type: Number }
},
  //Should I convert my virtual content imported from MongoDB into an object? Yes.
  //Should I turn my virtuals into JSON whenever I send them out to MongoDB? Yes. 
  { toObject: { virtuals: true } },
  { toJSON: { virtuals: true } },
);

schema.virtual('fullCategory', {
  // collection you're relating to
  // match it to api-server.categories in MongoDB
  ref: 'categories',

  // the local (in product schema) key-value
  // to use to search for a record in the other collection
  localField: 'category',

  // the foreign (in category schema) key-value
  // to use to match a record to the local
  foreignField: 'name',

  // just give me one record from other collection
  justOne: true,
});

//trigger(populate) the virtual field created above everytime we find a product
schema
  .virtual('fullString')
  .get(function () {
    return this.name + ' || ' + this.category;
  })
  .set(function (str) {
    this.name = str;
    this.category = null;
  });

module.exports = mongoose.model('products', schema);