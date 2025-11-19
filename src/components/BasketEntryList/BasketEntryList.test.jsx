import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ManualBasketEntry, { getFormValues, mapProductData } from "./BasketEntryList";
import { KitchenContext } from "../../context/KitchenContext";
import { vi } from "vitest";
import { combineProductData } from "../../util/util";
import { validateProducts } from "../../util/validation";
import { handleToast } from "../../util/toast";
import handleErrorsToast from "../Error/Errors";

vi.mock("../FormList/FormList", () => ({
    default: ({ use, state }) => <div data-testid="form-list">{use}</div>
}));

vi.mock("../Buttons/Button", () => ({
    default: ({ use }) => <button data-testid={`btn-${use}`}>{use}</button>
}));

vi.mock("../../util/util", () => ({
    combineProductData: vi.fn((products, quantities, units) =>
        products.map((prod, i) => ({
            ...prod,
            quantity: quantities[i],
            unit: units[i],
        }))
    )
}));

vi.mock("../../util/validation", () => ({
    validateProducts: vi.fn(() => [])
}));

vi.mock("../../util/toast", () => ({
    handleToast: vi.fn()
}));

vi.mock("../Error/Errors", () => ({
    __esModule: true,
    default: vi.fn()
}));

const renderWithContext = (contextValue) =>
    render(
        <KitchenContext.Provider value={contextValue}>
            <ManualBasketEntry />
        </KitchenContext.Provider>
    );

describe("Testing component: BasketEntryList", () => {

    test("renders mobile layout when isMobile is true", () => {
        const ctx = {
            isMobile: true,
            editStatus: { mode: "add" },
            fullBasket: { current: [] },
            setModalState: vi.fn(),
            handleRequest: vi.fn(),
            setEntryStatus: vi.fn(),
        };

        renderWithContext(ctx);

        expect(screen.getByRole("heading")).toBeInTheDocument();
        expect(screen.getByText("Add Items")).toBeInTheDocument();
        expect(screen.getByTestId("btn-close")).toBeInTheDocument();
    });

    test("renders desktop layout when isMobile is not true", () => {
        const ctx = {
            isMobile: false,
            editStatus: { mode: "add" },
            fullBasket: { current: [] },
            setModalState: vi.fn(),
            handleRequest: vi.fn(),
            setEntryStatus: vi.fn(),
        };

        renderWithContext(ctx);

        expect(screen.getByTestId("form-list")).toBeInTheDocument();
        expect(screen.getByTestId("btn-basket")).toBeInTheDocument();
    });

    test("mapProductData adds ids and obtained properties correctly", () => {
            const input = {
                products: [
                    { product: "Apple", quantity: 2, unit: "kg" },
                    { product: "Banana", quantity: 3, unit: "kg" },
                ],
                id: [1,  2],
                index: [0], 
            };

            const result = mapProductData(input);

            expect(result).toEqual([
                { product: "Apple", quantity: 2, unit: "kg", id: 1, obtained: 1 },
                { product: "Banana", quantity: 3, unit: "kg", id: 2, obtained: 0 },
            ])
    })

    test("getFormValues gets correct values", () => {
            
        const products = ["Apple", "Banana", "Kiwi"];
        const quantities = [500, 180, 1];
        const units = ["pcs", "g", "kg"];

        const formData = new FormData();

        products.forEach(product => {
            formData.append("product", product);
        })

        quantities.forEach(quantity => {
            formData.append("quantity", quantity);
        })

        units.forEach(unit => {
            formData.append("unit", unit);
        })


        const results = getFormValues(formData);

        expect(results.products).toHaveLength(3);
        expect(results.quantity).toHaveLength(3);
        expect(results.unit).toHaveLength(3);

        results.products.forEach((p, i) => {
            expect(p).toEqual(products[i]);
        })

        results.quantity.forEach((q, i) => {
            expect(Number(q)).toEqual(quantities[i]);
        })

        results.unit.forEach((u, i) => {
            expect(u).toEqual(units[i]);
        })

    })
})