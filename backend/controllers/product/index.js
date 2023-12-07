
import getProducts from "./get-products"
import getProductById from "./get-by-id"
import createProduct from "./create"
import updateProduct from "./update"
import deleteProduct from "./delete"
import reportProduct from "./report-product"
import { checkUserReports } from "./is-reported_by_user"
module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  reportProduct, 
  checkUserReports
}