const express = require("express");
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDeatails, createProductReview, getProductReviews, deleteReviews } = require("../controllers/productController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/products").get(getAllProducts);

router.route("/admin/product/new").post(isAuthenticatedUser,authorizeRoles("admin"), createProduct);

router.route("/seller/product/new").post(isAuthenticatedUser,authorizeRoles("admin","seller"), createProduct);

router.route("/admin/product/:id").put(isAuthenticatedUser,authorizeRoles("admin"), updateProduct).delete(isAuthenticatedUser,authorizeRoles("admin"), deleteProduct);

router.route("/seller/product/:id").put(isAuthenticatedUser,authorizeRoles("admin","seller"), updateProduct).delete(isAuthenticatedUser,authorizeRoles("admin","seller"), deleteProduct);

router.route("/product/:id").get(getProductDeatails);

router.route("/review").put(isAuthenticatedUser, createProductReview);

router.route("/reviews").get(getProductReviews).delete(isAuthenticatedUser,deleteReviews)



module.exports = router;