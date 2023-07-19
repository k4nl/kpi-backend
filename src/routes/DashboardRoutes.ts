import express from "express";
import DashboardController from "../controllers/DashboardController";

const router = express.Router();

router.get('/:id', DashboardController.get);

export default router;