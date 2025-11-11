import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import categoryRoutes from "./routes/category.routes.js";
import itemRoutes from "./routes/item.routes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/categories", categoryRoutes);
app.use("/api/items", itemRoutes);

export default app;
