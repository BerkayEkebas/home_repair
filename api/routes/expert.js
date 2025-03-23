import express from "express";
import { getRequests } from "../controllers/expertController.js";

const router = express.Router();

router.get("/get-requests",getRequests)


export default router;