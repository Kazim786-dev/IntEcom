import getAllOrders from "./get-all-orders.js"
import getAllUserOrders from "./get-user-orders.js"
import createOrder from "./create.js"
import updateOrder from "./update.js"
import deleteOrder from "./delete.js"
import getAllOrderProducts from "./all-order-products.js"
import getOrderSummary from "./get-summary.js"
import checkout from "./checkout.js"
import getSellerOrders from "./seller-all-orders.js"
import updateOrderDeliveryStatus from "./update-status.js"
import getSellerOrderSummary from "./seller-analytics"
import getSellerProductSales from "./seller-analytics-details"
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
  updateOrderDeliveryStatus,
  getSellerOrderSummary,
  getSellerProductSales
}