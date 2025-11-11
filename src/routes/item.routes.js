import express from "express";
import * as itemController from "../controllers/item.controllers.js";

const router = express.Router();

router.get("/", itemController.getAll);
router.get("/:id", itemController.getById);
router.post("/", itemController.create);
router.put("/:id", itemController.update);
router.delete("/:id", itemController.remove);

export default router;
