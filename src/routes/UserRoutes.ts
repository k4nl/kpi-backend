import express from "express";
import UserController from "src/controllers/UserController";

const router = express.Router();

router.get('/:param', UserController.get);

export default router;