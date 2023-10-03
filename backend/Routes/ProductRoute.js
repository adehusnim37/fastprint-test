import express from "express";
import {
    createProduct,
    deleteProduct,
    getProduct,
    ProductById,
    updateProduct,
} from "../Controller/ProductController.js";

const product = express.Router();

product.route("/").get(getProduct).post(createProduct);
product.route("/:id").get(ProductById).patch(updateProduct).delete(deleteProduct);

export default product;