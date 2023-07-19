import { Request, Response } from "express";
import UsersManagerController from "../../controllers/UsersManagerController";
import UsersManagerServices from "../../services/UsersManagerServices";
import { statusCode } from "../../utils/status";
import CustomError from "../../utils/CustomError";

const userManagerResponse = [
  {
    user: {
        id: 1,
        data_de_admissao: '2021-10-06T00:00:00.000Z',
        data_de_rescisao: null,
        nome: 'Danielle Winters',
        status: true
      },
    manager: null
  },
  {
    user: {
        id: 2,
        data_de_admissao: '2021-08-01T00:00:00.000Z',
        data_de_rescisao: '2022-07-17T00:00:00.000Z',
        nome: 'Pamela Berry',
        status: false
    },
    manager: {
        id: 19,
        data_de_admissao: '2022-08-22T00:00:00.000Z',
        data_de_rescisao: null,
        nome: 'Sharon Barr',
        status: true
    }
  }];
// Mock the UsersManagerServices
jest.mock("@/services/UsersManagerServices", () => ({
  getAll: jest.fn().mockResolvedValue([
    {
      user: {
          id: 1,
          data_de_admissao: '2021-10-06T00:00:00.000Z',
          data_de_rescisao: null,
          nome: 'Danielle Winters',
          status: true
        },
      manager: null
    },
    {
      user: {
          id: 2,
          data_de_admissao: '2021-08-01T00:00:00.000Z',
          data_de_rescisao: '2022-07-17T00:00:00.000Z',
          nome: 'Pamela Berry',
          status: false
      },
      manager: {
          id: 19,
          data_de_admissao: '2022-08-22T00:00:00.000Z',
          data_de_rescisao: null,
          nome: 'Sharon Barr',
          status: true
      }
    }]),
}));

// Mock the Request and Response objects
const mockRequest = {} as Request;
const mockResponse = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
} as unknown as Response;

describe("UsersManagerController", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should get data and return it in the response", async () => {
    
    await UsersManagerController.getAll(mockRequest, mockResponse);

    expect(UsersManagerServices.getAll).toHaveBeenCalledWith();
    expect(mockResponse.status).toHaveBeenCalledWith(statusCode.SUCCESS);
    expect(mockResponse.json).toHaveBeenCalledWith(userManagerResponse);
  });

  it("should handle errors and return them in the response", async () => {

    const internalServer = new CustomError(500, 'Internal Server Error');

    (UsersManagerServices.getAll as jest.Mock).mockRejectedValue(internalServer);

    
    await UsersManagerController.getAll(mockRequest, mockResponse);

    expect(UsersManagerServices.getAll).toHaveBeenCalledWith();
    expect(mockResponse.status).toHaveBeenCalledWith(internalServer.status);
    expect(mockResponse.json).toHaveBeenCalledWith(internalServer.data);
  });
});
