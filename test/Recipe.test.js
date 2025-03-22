const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const Recipe = require("./recipe");

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

describe("Recipe Model", () => {
  it("should create a new recipe", async () => {
    const recipeData = {
      userId: new mongoose.Types.ObjectId(),
      title: "Spaghetti Carbonara",
      recipeText: "Boil spaghetti and mix with eggs, cheese, and pancetta.",
    };

    const recipe = new Recipe(recipeData);
    await recipe.save();

    const savedRecipe = await Recipe.findById(recipe._id);

    expect(savedRecipe.title).toBe(recipeData.title);
    expect(savedRecipe.recipeText).toBe(recipeData.recipeText);
  });

  it("should throw an error if required fields are missing", async () => {
    const invalidRecipe = new Recipe({
      userId: new mongoose.Types.ObjectId(),
      title: "",
      recipeText: "",
    });

    await expect(invalidRecipe.save()).rejects.toThrow();
  });
});
