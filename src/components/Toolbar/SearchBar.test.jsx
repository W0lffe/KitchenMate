import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "./SearchBar";

const filter = vi.fn();

const renderSearch = () => {
    return render(
        <SearchBar filter={filter} />
    )
}

describe("Testing component: SearchBar", () => {

    test("renders input field", () => {
        renderSearch();

        const inputField = screen.getByRole("textbox");

        expect(inputField).toBeInTheDocument();
        expect(inputField).toHaveAttribute("type", "text");
    })

    test("calls filter function when user types input", () => {
        renderSearch();
        const inputField = screen.getByRole("textbox");
        expect(inputField).toBeInTheDocument();

        fireEvent.change(inputField, { target: { value: "Ban" } });
        expect(filter).toHaveBeenCalledWith("Ban");

        fireEvent.change(inputField, { target: { value: "Banana" } });
        expect(filter).toHaveBeenCalledWith("Banana");

        expect(filter).toHaveBeenCalledTimes(2);
    })

})
