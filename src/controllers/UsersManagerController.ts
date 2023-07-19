import UsersManagerServices from "../services/UsersManagerServices";
import { IError } from "../interfaces/error.interface";
import { Request, Response } from "express";
import { statusCode } from "../utils/status";

export default class UsersManagerController {
  static async getAll(_req: Request, res: Response) {
    try {
      const response = await UsersManagerServices.getAll();
      return res.status(statusCode.SUCCESS).json(response);
    } catch (error: IError | any) {
      return res.status(error.status).json(error.data);
    }
  }
}