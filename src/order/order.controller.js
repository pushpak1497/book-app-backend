import { Order } from "./order.model.js";

export const createOrder = async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    await newOrder.save();
    res.status(200).send(newOrder);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "error while placing order" });
  }
};

export const getOrdersByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const orders = await Order.find({ email }).sort({ createdAt: -1 });
    if (!orders) {
      res.status(404).send({ message: "Orders not found" });
    }
    res.status(200).send(orders);
  } catch (error) {
    console.log("error fetching orders", error);
    res.status(500).send({ message: "Failed to fetch Order" });
  }
};
