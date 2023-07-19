import { Request, Response } from "express";
import UserController from "../../controllers/UserController";
import UserServices from "../../services/UserServices";
import { statusCode } from "../../utils/status";
import CustomError from "../../utils/CustomError";

const userResponse = {
  id: 1,
  matricula: 0,
  status: true,
  nome: 'Danielle Winters',
  email: 'daniellewinters@kpis.tech',
  data_de_admissao: '2021-10-06T00:00:00.000Z',
  data_de_rescisao: null,
  cargo: 'diretor'
}

// Mock the UserServices
jest.mock("@/services/UserServices", () => ({
  get: jest.fn().mockResolvedValue({
    id: 1,
    matricula: 0,
    status: true,
    nome: 'Danielle Winters',
    email: 'daniellewinters@kpis.tech',
    data_de_admissao: '2021-10-06T00:00:00.000Z',
    data_de_rescisao: null,
    cargo: 'diretor'
  }),
}));

// Mock the Request and Response objects
const mockRequest = {} as Request;
const mockResponse = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
} as unknown as Response;

describe("UserController", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should get data and return it in the response", async () => {
    // Arrange
    const id = '1';
    mockRequest.params = { param: id };

    // Act
    await UserController.get(mockRequest, mockResponse);

    // Assert
    expect(UserServices.get).toHaveBeenCalledWith(id);
    expect(mockResponse.status).toHaveBeenCalledWith(statusCode.SUCCESS);
    expect(mockResponse.json).toHaveBeenCalledWith(userResponse);
  });

  it("should handle errors and return them in the response", async () => {
    // Arrange
    const id = '1';
    mockRequest.params = { param: id };

    // Mock the error response from the service

    const error = new CustomError(404, 'User not found');

    (UserServices.get as jest.Mock).mockRejectedValue(error);

    // Act
    await UserController.get(mockRequest, mockResponse);

    // Assert
    expect(UserServices.get).toHaveBeenCalledWith(id);
    expect(mockResponse.status).toHaveBeenCalledWith(error.status);
    expect(mockResponse.json).toHaveBeenCalledWith(error.data);
  });
});
