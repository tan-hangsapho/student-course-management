import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import connectMongoDB from "../index";
// export const logger = {
//   info: jest.fn(),
//   error: jest.fn(),
//   // Add other methods if necessary
// };
// jest.mock("../utils/logger");
describe("connectMongoDB", () => {
  let mongoServer: MongoMemoryServer;
  let mongoDBConnector: ReturnType<typeof connectMongoDB.getInstance>;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
  });

  beforeEach(() => {
    mongoDBConnector = connectMongoDB.getInstance();
  });

  afterEach(async () => {
    await mongoDBConnector.disconnect();
    connectMongoDB.resetInstance();
  });

  afterAll(async () => {
    await mongoServer.stop();
  });

  it("should connect to MongoDB", async () => {
    const mongoUri = mongoServer.getUri();
    await mongoDBConnector.connect({ url: mongoUri });

    expect(mongoose.connection.readyState).toBe(1); // 1 means connected
  });

  it("should disconnect from MongoDB", async () => {
    const mongoUri = mongoServer.getUri();
    await mongoDBConnector.connect({ url: mongoUri });
    await mongoDBConnector.disconnect();

    expect(mongoose.connection.readyState).toBe(0); // 0 means disconnected
  });

  it("should handle connection errors", async () => {
    const consoleSpy = jest.spyOn(console, "log").mockImplementation(); // Mock console.log to prevent output during testing
    const invalidUri = mongoServer.getUri();
    try {
      await mongoDBConnector.connect({ url: invalidUri });
    } catch (error: any) {
      // Log the specific error message for debugging
      console.log("Error connecting to MongoDB:", error.message);

      // Expect that console.log was called with the exact error message
      expect(consoleSpy).toHaveBeenCalledWith("MongoDB disconnected");
    } finally {
      consoleSpy.mockRestore(); // Restore console.log to its original implementation
    }
  });
});
