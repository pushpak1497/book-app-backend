import { Book } from "./book.model.js";
import mongoose from "mongoose";

// post a book
const postBook = async (req, res) => {
  try {
    const newBook = await Book({ ...req.body });
    await newBook.save();
    res
      .status(200)
      .send({ message: "book posted successfully", book: newBook });
  } catch (error) {
    console.log("error creating book", error);
    res.status(500).send({ message: "Failed to create book" });
  }
};

// get all books
const getBooks = async (req, res) => {
  // console.log("pushpak");
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    return res.status(200).send(books);
  } catch (error) {
    console.log("Error Fetching Books", error);
    return res.status(500).send({ message: "failed to fetch books" });
  }
};

// get single book
const getBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    if (!book) {
      res.status(404).send({ message: "book not found in database" });
    }
    res.status(200).send(book);
  } catch (error) {
    console.log("error while fetching single book", error);
    res.status(500).send({ message: "failed to fetch the given book" });
  }
};

// update book data
const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedBook = await Book.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedBook) {
      return res.status(404).send({ message: "book not found in database" });
    }
    return res
      .status(200)
      .send({ message: "book updated successfully", book: updatedBook });
  } catch (error) {
    console.log("error while updating book", error);
    return res.status(500).send({ message: "failed to update the given book" });
  }
};

// delete Book
const deleteBook = async (req, res) => {
  const bookId = req.params.id;

  // Validate the `bookId` first
  if (!bookId || !mongoose.Types.ObjectId.isValid(bookId)) {
    return res.status(400).json({ message: "Invalid or missing book ID" });
  }

  try {
    // Attempt to delete the book
    const book = await Book.findByIdAndDelete(bookId);

    // If no book was found to delete, send a 404 response
    if (!book) {
      console.log("No book found to delete with ID:", bookId);
      return res.status(404).json({ message: "Book not found" });
    }

    // If deletion was successful, send a 200 response
    console.log("Book deleted successfully:", book);
    return res.status(200).json({ message: "Book deleted successfully", book });
  } catch (error) {
    console.error("Error deleting book:", error);

    // Additional safeguard: Only attempt to send error response if headers weren't already sent
    if (!res.headersSent) {
      return res.status(500).json({
        message: "An error occurred while deleting the book",
        error: error.message,
      });
    }
  }
};

export { postBook, getBooks, getBook, updateBook, deleteBook };
