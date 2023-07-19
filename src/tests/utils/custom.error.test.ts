import CustomError from "../../utils/CustomError";

describe("CustomError", () => {
  it("should set the status and data properties correctly", () => {
    // Arrange
    const status = 404;
    const data = { message: "Not found" };

    // Act
    const customError = new CustomError(status, data);

    // Assert
    expect(customError).toBeInstanceOf(Error);
    expect(customError.status).toBe(status);
    expect(customError.data).toBe(data);
  });

  it("should have a default message property", () => {
    // Arrange
    const status = 500;
    const data = { message: "Internal server error" };

    // Act
    const customError = new CustomError(status, data);

    // Assert
    expect(customError).toBeInstanceOf(Error);
    expect(customError.status).toBe(status);
    expect(customError.data).toBe(data);
    expect(customError.message).toBe("");
  });
});