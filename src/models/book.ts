import Joi from "joi";

const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  year: { type: Number, required: true },
  genre: { type: String, required: true },
});

const bookSchemaValidation= Joi.object({
  title: Joi.string().min(1).required(),
  author:Joi.string().min(1).required(),
  year: Joi.string().min(1).required(),
  genre: Joi.string().min(1).required(),
})

const Book = mongoose.model('Book', bookSchema);

module.exports= {
  Book,
  bookSchemaValidation}
