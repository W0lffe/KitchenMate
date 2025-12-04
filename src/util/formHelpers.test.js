import {
    getRecipeFormValues,
    getDishFormValues,
    deriveFormStateValues,
    getUserFormValues
} from "./formHelpers";


describe("Testing formhelper functions", () => {

    describe("getDishFormValues", () => {
        test("returns correct values", () => {

            const formData = new FormData();
            formData.set("name", "Test Dish");
            formData.set("course", "Main");
            const file = new File(["dummy content"], "image.png", { type: "image/png" });
            formData.set("image", file);
            const state = {
                validInputs: {
                    components: ["Component1", "Component2"]
                }
            };

            const result = getDishFormValues(formData, state);

            expect(result).toEqual({
                name: "Test Dish",
                course: "Main",
                image: file,
                components: ["Component1", "Component2"]
            });

        });

        test("returns empty components array if state is undefined", () => {
            const formData = new FormData();
            formData.set("name", "Dish");
            formData.set("course", "Dessert");

            const result = getDishFormValues(formData, undefined);

            expect(result).toEqual({
                name: "Dish",
                course: "Dessert",
                image: null,
                components: []
            });
        });
    });

    describe("getRecipeFormValues", () => {

        test("returns correct values from FormData", () => {
            const formData = new FormData();
            formData.set("name", "Chocolate Cake");
            formData.set("portions", "4");
            formData.set("output", "Cake");
            formData.set("outputType", "Dessert");
            formData.set("time", "60");
            formData.set("timeFormat", "min");
            formData.set("category", "Desserts");

            formData.append("product", "Flour");
            formData.append("product", "Sugar");
            formData.append("quantity", "200");
            formData.append("quantity", "100");
            formData.append("unit", "g");
            formData.append("unit", "g");
            formData.append("step", "Mix ingredients");
            formData.append("step", "Bake at 180C");

            const result = getRecipeFormValues(formData);

            expect(result).toEqual({
                name: "Chocolate Cake",
                portions: "4",
                output: "Cake",
                outputType: "Dessert",
                time: "60",
                timeFormat: "min",
                products: ["Flour", "Sugar"],
                quantity: ["200", "100"],
                unit: ["g", "g"],
                steps: ["Mix ingredients", "Bake at 180C"],
                category: "Desserts"
            });
        });

        test("returns empty arrays if multiple-value fields are missing", () => {
            const formData = new FormData();
            formData.set("name", "Dish");
            formData.set("portions", "2");
            formData.set("outputType", "Main");
            formData.set("time", "30");
            formData.set("timeFormat", "min");
            formData.set("category", "Main Dishes");

            const result = getRecipeFormValues(formData);

            expect(result.products).toEqual([]);
            expect(result.quantity).toEqual([]);
            expect(result.unit).toEqual([]);
            expect(result.steps).toEqual([]);
        });
    })

    describe("getUserFormValues", () => {

        test("returns correct values from FormData", () => {
            const formData = new FormData();
            formData.set("username", "chef123");
            formData.set("passwd", "supersecret");
            const file = new File(["dummy content"], "avatar.png", { type: "image/png" });
            formData.set("image", file);
            formData.set("cookType", "home");
            formData.set("unitType", "metric");

            const result = getUserFormValues(formData);

            expect(result).toEqual({
                user: "chef123",
                passwd: "supersecret",
                image: file,
                cookType: "home",
                unitType: "metric",
            });
        });

        test("returns null for missing fields", () => {
            const formData = new FormData();
            const result = getUserFormValues(formData);

            expect(result).toEqual({
                user: null,
                passwd: null,
                image: null,
                cookType: null,
                unitType: null,
            });
        });
    });

    describe("deriveFormValues", () => {

        test("returns correct recipe values when isRecipe=true", () => {
            const state = {
                validInputs: {
                    name: "Chocolate Cake",
                    portions: 4,
                    output: "Cake",
                    outputType: "Dessert",
                    time: 60,
                    timeFormat: "min",
                    products: ["Flour", "Sugar"],
                    quantity: ["200", "100"],
                    unit: ["g", "g"],
                    steps: ["Mix", "Bake"],
                    category: "Desserts"
                }
            };

            const result = deriveFormStateValues(state, true);

            expect(result).toEqual({ ...state.validInputs });
        });

        test("returns default recipe values when fields are missing", () => {
            const state = { validInputs: {} };

            const result = deriveFormStateValues(state, true);

            expect(result).toEqual({
                name: "",
                portions: 0,
                output: "N/A",
                outputType: null,
                time: 0,
                timeFormat: null,
                products: [],
                quantity: [],
                unit: [],
                steps: [],
                category: "Uncategorized"
            });
        });

        test("returns correct dish values when isRecipe=false", () => {
            const state = {
                validInputs: {
                    name: "Test Dish",
                    course: "Main",
                    image: null,
                    components: ["Component1"]
                }
            };

            const result = deriveFormStateValues(state, false);

            expect(result).toEqual({ ...state.validInputs });
        });

        test("returns default dish values when fields are missing", () => {
            const state = { validInputs: {} };

            const result = deriveFormStateValues(state, false);

            expect(result).toEqual({
                name: "",
                course: "",
                image: null,
                components: []
            });
        });

    })

});