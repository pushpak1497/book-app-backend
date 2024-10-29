import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
const app = express();
dotenv.config({ path: "./.env" });

//middleware
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
import bookRouter from "./src/books/book.route.js";
import orderRouter from "./src/order/order.route.js";
import userRouter from "./src/user/user.route.js";
import adminRouter from "./src/stats/admin.stats.js";
app.use("/api/books", bookRouter);
app.use("/api/orders", orderRouter);
app.use("/api/auth", userRouter);
app.use("/api/admin", adminRouter);
async function main() {
  await mongoose.connect(`${process.env.DB_URI}/test`);
  app.get("/", (req, res) => {
    res.send("Book Store Server is running!");
  });
}
main()
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.log(err));

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
