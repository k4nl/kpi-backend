import UserServices from "@/services/UserServices";
import { IError } from "@/interfaces/error.interface";
import { Request, Response } from "express";
import { statusCode } from "@/utils/status";

export default class UserController {
  static async get(req: Request, res: Response) {
    try {
      const response = await UserServices.get(req.params.param);
      return res.status(statusCode.SUCCESS).json(response);
    } catch (error: IError | any) {
      return res.status(error.status).json(error.data);
    }
  }
}