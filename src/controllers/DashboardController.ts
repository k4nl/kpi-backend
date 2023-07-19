import DashboardServices from "../services/DashboardServices";
import { IError } from "../interfaces/error.interface";
import { Request, Response } from "express";
import { statusCode } from "../utils/status";

export default class DashboardController {
  static async get(req: Request, res: Response) {
    try {
      const response = await DashboardServices.get(Number(req.params.id));
      return res.status(statusCode.SUCCESS).json(response);
    } catch (error: IError | any) {
      return res.status(error.status).json(error.data);
    }
  }
}