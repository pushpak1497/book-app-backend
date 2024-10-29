import { Router } from "express";
import {
  deleteBook,
  getBook,
  getBooks,
  postBook,
  updateBook,
} from "./book.controller.js";
import { verifyAdmin } from "../middleware/verifyAdmin.js";

const router = Router();

// post a book to database
router.post("/create-book", postBook);
router.get("/", getBooks);
router.get("/:id", getBook);
router.put("/edit/:id", verifyAdmin, updateBook);
router.delete("/:id", verifyAdmin, deleteBook);
export default router;
