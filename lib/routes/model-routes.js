'use strict';

// esoteric resources
const express = require('express');
const router = express.Router();

// internal modules
const modelFinder = require('../middleware/model-finder.js');

// middleware
router.param('model', modelFinder);

// routes
// Create Single
router.post('/:model', async (req, res, next) => {
  // should have a req.body with the new record to create
  // should have req.colModel with a instance of the correct (product or category) collection

  //the create function is being taken from model.js
  //call the create operation on the model that I defined, which is either product calling the product schema or the category
  let result = await req.colModel.create(req.body);
  res.status(201);
  res.send(result);
});

// Read All
router.get('/:model', async (req, res, next) => {
  let result = await req.colModel.readByQuery({});
  res.status(200);
  res.send(result);
});

// Read Single
router.get('/:model/:id', async (req, res, next) => {
  let result = await req.colModel.read(req.params.id);
  res.status(200);
  res.send(result);
});

// Update Single
router.put('/:model/:id', (req, res, next) => {
  let updatedResult = await req.colModel.update(req.params.id, req.body);
  res.status(200);
  res.send(updatedResult);
});

// Delete Single
router.delete('/:model/:id', (req, res, next) => {
  let deletedResult = await req.colModel.delete(req.params.id);
  res.status(200);
  res.send(deletedResult);
});

module.exports = router;