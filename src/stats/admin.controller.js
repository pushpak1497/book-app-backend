import { Order } from "../order/order.model.js";
import { Book } from "../books/book.model.js";

export const getAdminData = async (req, res) => {
  try {
    // console.log("test");
    const totalOrders = await Order.countDocuments();
    const totalSales = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalSales: { $sum: "$totalPrice" },
        },
      },
    ]);

    // console.log(totalSales);
    const trendingBooksCount = await Book.aggregate([
      { $match: { trending: true } },
      { $count: "trendingBooksCount" },
    ]);
    const trendingBooks =
      trendingBooksCount.length > 0
        ? trendingBooksCount[0].trendingBooksCount
        : 0;
    const totalBooks = await Book.countDocuments();
    const monthlySales = await Order.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
          totalSales: { $sum: "$totalPrice" },
          totalOrders: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    res.status(200).send({
      totalOrders,
      totalSales: totalSales[0]?.totalSales || 0,
      trendingBooks,
      totalBooks,
      monthlySales,
    });
  } catch (error) {
    console.log("Error fetching admin Stats", error);
    res.status(500).send({ message: "Failed to fetch admin stats" });
  }
};
