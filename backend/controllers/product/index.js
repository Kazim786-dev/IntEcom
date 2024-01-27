
import getProducts from "./get-products.js"
import getProductById from "./get-by-id.js"
import createProduct from "./create.js"
import updateProduct from "./update.js"
import deleteProduct from "./delete.js"
import reportProduct from "./report-product.js"
import { checkUserReports } from "./is-reported_by_user.js"
import getProductsBySeller from "./get-product-by-seller.js"
import getReportedProducts from "./all-reports.js"
import blockProduct from "./block-product.js"
import cancelReport from "./delete-or-cancel-report.js"
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