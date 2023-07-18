import { statusCode } from "@/utils/status";

describe("statusCode", () => {
  it("should have the correct properties and values", () => {
    expect(statusCode).toHaveProperty("SUCCESS", 200);
    expect(statusCode).toHaveProperty("ERROR", 500);
    expect(statusCode).toHaveProperty("NOT_FOUND", 404);
    expect(statusCode).toHaveProperty("UNAUTHORIZED", 401);
    expect(statusCode).toHaveProperty("FORBIDDEN", 403);
    expect(statusCode).toHaveProperty("BAD_REQUEST", 400);
    expect(statusCode).toHaveProperty("CREATED", 201);
    expect(statusCode).toHaveProperty("NO_CONTENT", 204);
    expect(statusCode).toHaveProperty("CONFLICT", 409);
    expect(statusCode).toHaveProperty("UNPROCESSABLE_ENTITY", 422);
    expect(statusCode).toHaveProperty("INTERNAL_SERVER_ERROR", 500);
    expect(statusCode).toHaveProperty("SERVICE_UNAVAILABLE", 503);
    expect(statusCode).toHaveProperty("GATEWAY_TIMEOUT", 504);
    expect(statusCode).toHaveProperty("BAD_GATEWAY", 502);
  });
});
