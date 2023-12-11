
import getProducts from "./get-products"
import getProductById from "./get-by-id"
import createProduct from "./create"
import updateProduct from "./update"
import deleteProduct from "./delete"
import reportProduct from "./report-product"
import { checkUserReports } from "./is-reported_by_user"
import getProductsBySeller from "./get-product-by-seller"
import getReportedProducts from "./all-reports"
import blockProduct from "./block-product"
import cancelReport from "./delete-or-cancel-report"
module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  reportProduct, 
  checkUserReports,
  getProductsBySeller,
  getReportedProducts,
  blockProduct,
  cancelReport
}