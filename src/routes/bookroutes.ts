// const express = require("express");
import express  from "express";
const {
  getBooks,
  getBookById,
  addBook,
  updateBook,
  deleteBook,
} = require("../controllers/bookcontrollers");

const router = express.Router();

router.get("/books", getBooks);
router.get("/books/:id", getBookById);
router.post("/books", addBook);
router.put("/books/:id", updateBook);
router.delete("/books/:id", deleteBook);

module.exports = router;
