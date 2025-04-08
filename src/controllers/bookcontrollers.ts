import  { Request, Response } from "express";
const { ObjectId } = require("mongodb");
const { booksdb } = require("../connection/mongodb");
const {bookSchemaValidation} = require("../models/book")


// Retrieve all books
const getBooks = async (req: Request, res: Response) => {
  try {
    const bookdb = await booksdb();
    const fetchdata = await bookdb.find({}).toArray();
    res.json(fetchdata);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Retrieve book by ID
const getBookById = async (req: Request, res: Response) => {
  try {
    const bookdb = await booksdb();
    const getdatabyid = await bookdb.findOne({
      _id: new ObjectId(req.params.id),
    });
    if (!getdatabyid)
      return res.status(404).json({ message: "Book not found" });
    res.json(getdatabyid);
  } catch (error) {
    res.status(400).json({ message: "Invalid ID" });
  }
};

// Add a new book
const addBook = async (req: Request, res: Response) => {
  try {
    const bookdb = await booksdb();
    const {error} = bookSchemaValidation.validate(req.body);
    console.log(error);
    if(error){
      res.status(400).json({
        message: error?.details?.[0]?.message
      })
    }

    const newBook = await bookdb.insertOne(req.body);
    if (newBook.acknowledged) {
      res.json({
        dbMessage: "Data inserted successfully",
      });

    } else {
      res.json({
        errorMessage: "Data isn't inserted",
      });
    }
  } catch (error) {
    res.status(400).json({ message: "Invalid book data" });
  }
};

// Update book by ID
const updateBook = async (req: Request, res: Response) => {
  try {
    const bookdb = await booksdb();
    const {error} = bookSchemaValidation.validate(req.body);
    console.log(error);
    if(error){
      res.status(400).json({
        message: error?.details?.[0]?.message
      })
    }
     await bookdb.findOneAndUpdate(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body },
      { returnDocument: "after" }
    );

    res.json({ message: "updated" });
  } catch (error) {
    res.status(400).json({ message: "Invalid update data" });
  }
};

// Delete book by ID
const deleteBook = async (req: Request, res: Response) => {
  try {
    const bookdb = await booksdb();
    const book = await bookdb.findOneAndDelete({
      _id: new ObjectId(req.params.id),
    });
    // if (!book.value) return res.status(404).json({ message: "Book not found" });
    res.json({ message: "Book deleted" });
  } catch (error) {
    res.status(400).json({ message: "Invalid ID" });
  }
};

module.exports = {
  getBooks,
  getBookById,
  addBook,
  updateBook,
  deleteBook,
};
