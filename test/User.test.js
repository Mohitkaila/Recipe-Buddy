const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const User = require("./user");

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
}, 10000); 

afterAll(async () => {
  await mongoose.disconnect();
  if (mongoServer) {
    await mongoServer.stop();
  }
});

describe("User Model", () => {
  it("should create a new user", async () => {
    const userData = {
      username: "testuser",
      email: "testuser@example.com",
      password: "password123",
    };

    const user = new User(userData);
    await user.save();

    const savedUser = await User.findById(user._id);

    expect(savedUser.username).toBe(userData.username);
    expect(savedUser.email).toBe(userData.email);
    expect(savedUser.password).toBe(userData.password);
  });

  it("should throw an error if required fields are missing", async () => {
    const invalidUser = new User({
      username: "",
      email: "",
      password: "",
    });

    await expect(invalidUser.save()).rejects.toThrow();
  });

  it("should throw an error if username is not unique", async () => {
    const userData = {
      username: "uniqueuser",
      email: "uniqueuser@example.com",
      password: "password123",
    };

    const user1 = new User(userData);
    await user1.save();

    const user2 = new User(userData);
    await expect(user2.save()).rejects.toThrow("E11000 duplicate key error collection");
  });

  it("should throw an error if email is not unique", async () => {
    const userData = {
      username: "uniqueuser2",
      email: "uniqueuser2@example.com",
      password: "password123",
    };

    const user1 = new User(userData);
    await user1.save();

    const user2 = new User(userData);
    await expect(user2.save()).rejects.toThrow("E11000 duplicate key error collection");
  });
});
