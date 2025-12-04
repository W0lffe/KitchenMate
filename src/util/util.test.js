import { LIST_LABELS } from "./constants.js";
import { getListLabels, combineProductData, findRecipeDependencies, getRecipeInfo } from "./util";

describe("Testing util functions", () => {

    describe("getListLabels", () => {
        test("returns correct labels for active lists", () => {
            expect(getListLabels(1)).toEqual(LIST_LABELS[1]);
            expect(getListLabels(2)).toEqual(LIST_LABELS[2]);
            expect(getListLabels(3)).toEqual(LIST_LABELS[3]);
            expect(getListLabels(4)).toEqual(LIST_LABELS[4]);
        });

        test("returns empty array for unknown list", () => {
            expect(getListLabels(99)).toEqual([]);
            expect(getListLabels(null)).toEqual([]);
            expect(getListLabels(undefined)).toEqual([]);
        });
    })

    describe("combineProductData", () => {

        test("combines product, quantity, and unit arrays correctly", () => {
            const products = ["Flour", "Sugar", "Eggs"];
            const quantities = ["200", "100", "3"];
            const units = ["g", "g", "pcs"];

            const result = combineProductData(products, quantities, units);

            expect(result).toEqual([
                { product: "Flour", quantity: "200", unit: "g" },
                { product: "Sugar", quantity: "100", unit: "g" },
                { product: "Eggs", quantity: "3", unit: "pcs" },
            ]);
        });

        test("returns empty array if inputs are empty", () => {
            const result = combineProductData([], [], []);
            expect(result).toEqual([]);
        });

    });

    describe("findRecipeDependencies", () => {

        test("returns an empty array if dishes array is empty", () => {
            const result = findRecipeDependencies("recipe1", []);
            expect(result).toEqual([]);
        });

        test("returns dish IDs that include the recipeID in their components", () => {
            const dishes = [
                { id: "dish1", components: ["recipe1", "recipe2"] },
                { id: "dish2", components: ["recipe3"] },
                { id: "dish3", components: ["recipe1"] },
            ];

            const result = findRecipeDependencies("recipe1", dishes);

            expect(result).toEqual(["dish1", "dish3"]);
        });

        test("handles dishes with empty components array", () => {
            const dishes = [
                { id: "dish1", components: [] },
                { id: "dish2", components: ["recipe1"] },
            ];

            const result = findRecipeDependencies("recipe1", dishes);

            expect(result).toEqual(["dish2"]);
        });

        test("returns an empty array if no dishes include the recipeID", () => {
            const dishes = [
                { id: "dish1", components: ["recipe2"] },
                { id: "dish2", components: ["recipe3"] },
            ];

            const result = findRecipeDependencies("recipe1", dishes);

            expect(result).toEqual([]);
        });
    })
})