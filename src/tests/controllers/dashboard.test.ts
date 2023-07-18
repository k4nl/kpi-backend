import { Request, Response } from "express";
import DashboardController from "@/controllers/DashboardController";
import DashboardServices from "@/services/DashboardServices";
import { statusCode } from "@/utils/status";
import CustomError from "@/utils/CustomError";

const dashboardResponse = [
  {
      "id": 9,
      "data_de_admissao": "2020-04-09T00:00:00.000Z",
      "data_de_rescisao": null,
      "nome": "Matthew Beasley",
      "status": true
  },
  {
      "id": 6,
      "data_de_admissao": "2020-04-25T00:00:00.000Z",
      "data_de_rescisao": null,
      "nome": "Adam Sanders",
      "status": true
  },
  {
      "id": 14,
      "data_de_admissao": "2021-06-25T00:00:00.000Z",
      "data_de_rescisao": null,
      "nome": "Tiffany Ortega",
      "status": true
  },
  {
      "id": 7,
      "data_de_admissao": "2021-09-28T00:00:00.000Z",
      "data_de_rescisao": null,
      "nome": "John Jackson",
      "status": true
  },
  {
      "id": 34,
      "data_de_admissao": "2021-11-10T00:00:00.000Z",
      "data_de_rescisao": null,
      "nome": "Kelly Thomas",
      "status": true
  },
  {
      "id": 12,
      "data_de_admissao": "2021-11-11T00:00:00.000Z",
      "data_de_rescisao": null,
      "nome": "Jesse Anderson",
      "status": true
  },
  {
      "id": 15,
      "data_de_admissao": "2022-06-12T00:00:00.000Z",
      "data_de_rescisao": "2023-02-03T00:00:00.000Z",
      "nome": "Janet Smith",
      "status": false
  },
  {
      "id": 25,
      "data_de_admissao": "2022-08-18T00:00:00.000Z",
      "data_de_rescisao": null,
      "nome": "Paul Saunders",
      "status": true
  }
]

// Mock the DashboardServices
jest.mock("@/services/DashboardServices", () => ({
  get: jest.fn().mockResolvedValue(
    [
      {
          "id": 9,
          "data_de_admissao": "2020-04-09T00:00:00.000Z",
          "data_de_rescisao": null,
          "nome": "Matthew Beasley",
          "status": true
      },
      {
          "id": 6,
          "data_de_admissao": "2020-04-25T00:00:00.000Z",
          "data_de_rescisao": null,
          "nome": "Adam Sanders",
          "status": true
      },
      {
          "id": 14,
          "data_de_admissao": "2021-06-25T00:00:00.000Z",
          "data_de_rescisao": null,
          "nome": "Tiffany Ortega",
          "status": true
      },
      {
          "id": 7,
          "data_de_admissao": "2021-09-28T00:00:00.000Z",
          "data_de_rescisao": null,
          "nome": "John Jackson",
          "status": true
      },
      {
          "id": 34,
          "data_de_admissao": "2021-11-10T00:00:00.000Z",
          "data_de_rescisao": null,
          "nome": "Kelly Thomas",
          "status": true
      },
      {
          "id": 12,
          "data_de_admissao": "2021-11-11T00:00:00.000Z",
          "data_de_rescisao": null,
          "nome": "Jesse Anderson",
          "status": true
      },
      {
          "id": 15,
          "data_de_admissao": "2022-06-12T00:00:00.000Z",
          "data_de_rescisao": "2023-02-03T00:00:00.000Z",
          "nome": "Janet Smith",
          "status": false
      },
      {
          "id": 25,
          "data_de_admissao": "2022-08-18T00:00:00.000Z",
          "data_de_rescisao": null,
          "nome": "Paul Saunders",
          "status": true
      }
  ]
  ),
}));

// Mock the Request and Response objects
const mockRequest = {} as Request;
const mockResponse = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
} as unknown as Response;

describe("DashboardController", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should get data and return it in the response", async () => {
    // Arrange
    const id = '1';
    mockRequest.params = { id };

    // Act
    await DashboardController.get(mockRequest, mockResponse);

    // Assert
    expect(DashboardServices.get).toHaveBeenCalledWith(Number(id));
    expect(mockResponse.status).toHaveBeenCalledWith(statusCode.SUCCESS);
    expect(mockResponse.json).toHaveBeenCalledWith(dashboardResponse);
  });

  it("should handle errors and return them in the response", async () => {
    // Arrange
    const id = '1';
    mockRequest.params = { id };

    // Mock the error response from the service

    const error = new CustomError(404, 'User not found');

    (DashboardServices.get as jest.Mock).mockRejectedValue(error);

    // Act
    await DashboardController.get(mockRequest, mockResponse);

    // Assert
    expect(DashboardServices.get).toHaveBeenCalledWith(Number(id));
    expect(mockResponse.status).toHaveBeenCalledWith(error.status);
    expect(mockResponse.json).toHaveBeenCalledWith(error.data);
  });
});
