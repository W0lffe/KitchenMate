import { render, screen } from "@testing-library/react";
import Errors from "./Errors";

describe("Testing Errors component", () => {

    test("renders list element", () => {

        const emptyArray = [];

        render(<Errors errors={emptyArray}/>)
        const listElement = screen.getByRole("list");
        expect(listElement).toBeInTheDocument();
    })

    test("does not render list items when array is undefined", () => {

        render(<Errors />)
        const listItems = screen.queryAllByRole("listitem");
        expect(listItems.length).toBe(0);
    })

    test("renders list items", () => {
        const errors = ["test", "error"];

        render(<Errors errors={errors}/>)
        const listItems = screen.queryAllByRole("listitem");
        
        expect(listItems.length).toBe(2);
        errors.forEach(error => {
            expect(screen.getByText(error)).toBeInTheDocument();
        })
    })
    


    
})