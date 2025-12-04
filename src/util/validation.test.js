import {
  validateName,
  validateNumber,
  validateArray,
  validateTimeFormat,
  validateProducts,
  validateDish,
  validateRecipe
} from "./validation.js";

describe("Testing validation functions", () => {

  test("validateName returns true for valid name", () => {
    expect(validateName("Chocolate Cake")).toBe(true);
  });

  test("validateName returns false for empty or too long name", () => {
    expect(validateName("")).toBe(false);
    expect(validateName("a".repeat(51))).toBe(false);
  });

  test("validateNumber returns true for positive numbers", () => {
    expect(validateNumber(5)).toBe(true);
    expect(validateNumber("10")).toBe(true);
  });
  test("validateNumber returns false for invalid numbers", () => {
    expect(validateNumber(0)).toBe(false);
    expect(validateNumber(-3)).toBe(false);
    expect(validateNumber("abc")).toBe(false);
  });

  test("validateArray returns false for empty or invalid items", () => {
    expect(validateArray([])).toBe(false);
    expect(validateArray([null, "x"])).toBe(false);
    expect(validateArray(["Unit"])).toBe(false);
  });
  test("validateArray returns true for valid arrays", () => {
    expect(validateArray(["a", "b"])).toBe(true);
  });

  test("validateTimeFormat returns false for 'Unit'", () => {
    expect(validateTimeFormat("Unit")).toBe(false);
  });
  test("validateTimeFormat returns true for other values", () => {
    expect(validateTimeFormat("min")).toBe(true);
  });

  test("validateProducts returns errors for invalid arrays", () => {
    expect(validateProducts([], [], [])).toEqual([
      "Please enter name for products!",
      "Please enter quantity for products!",
      "Please enter unit for products!"
    ]);
  });
  test("validateProducts returns empty array for valid inputs", () => {
    expect(validateProducts(["Eggs"], ["2"], ["pcs"])).toEqual([]);
  });

  test("validateDish returns correct errors", () => {
    expect(validateDish({ name: "", course: "course", components: [] })).toEqual([
      "Dish name is invalid!",
      "Please select a course!",
      "Please add components!"
    ]);
  });

  test("validateRecipe returns array of errors", () => {
    const errors = validateRecipe(
      "", // name
      0, // portions
      -5, // time
      "Unit", // timeFormat
      [], // products
      [], // quantity
      [], // unit
      [] // steps
    );
    expect(errors.length).toBeGreaterThan(0);
  });
});
