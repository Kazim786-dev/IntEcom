import getAllOrders from "./get-all-orders"
import getAllUserOrders from "./get-user-orders"
import createOrder from "./create"
import updateOrder from "./update"
import deleteOrder from "./delete"
import getAllOrderProducts from "./all-order-products"
import getOrderSummary from "./get-summary"
import checkout from "./checkout"
import getSellerOrders from "./seller-all-orders"
import updateOrderDeliveryStatus from "./update-status"
module.exports = {
  getAllOrders,
  getAllUserOrders,
  createOrder,
  updateOrder,
  deleteOrder,
  getAllOrderProducts,
  getOrderSummary,
  checkout,
  getSellerOrders,
  updateOrderDeliveryStatus
}