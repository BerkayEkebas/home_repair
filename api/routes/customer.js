import express from "express";
import { createRequests, getRequests } from "../controllers/customerController.js";

const router = express.Router();

router.post("/get-requests",getRequests)
router.post("/create-request",createRequests)


export default router;