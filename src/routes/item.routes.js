import express from "express";
import { createItems, getItems } from "../controllers/item.controller.js";

const router = express.Router()

router.post('/create',createItems)
router.get('/get',getItems)

export default router