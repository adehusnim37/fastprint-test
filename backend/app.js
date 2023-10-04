import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import productRoute from "./Routes/ProductRoute.js";

dotenv.config();

const app = express();

app.use(cors({
    origin: true
}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/api/v1/product", productRoute);
app.listen(process.env.APP_PORT || 5000, () => {
    console.log(`Server is running on port ${process.env.APP_PORT}`);
});