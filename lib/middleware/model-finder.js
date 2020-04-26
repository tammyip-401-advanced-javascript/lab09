'use strict';
const categoriesSchema = require('../models/categories-schema.js');
const productsSchema = require('../models/products-schema.js');
const Model = require('../models/model.js');

const modelFinder = (req, res, next) => {
  // valid models are: 'products' and 'categories'

  switch (req.params.model) {
    case 'categories':
      console.log('found model categories');
      req.colModel = new Model(categoriesSchema);
      next();
      break;
    case 'products':
      console.log('found model products');
      req.colModel = new Model(productsSchema);
      next();
      break;
    default:
      console.log('invalid model');
      res.status(404);
      res.end();
      break;
  }
};

module.exports = modelFinder;