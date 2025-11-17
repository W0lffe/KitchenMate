import { render, screen } from "@testing-library/react";
import {Errors} from "./Errors";

describe("Testing component: Errors", () => {

    test("renders list element", () => {

        render(<Errors errors={[]}/>)
        const listElement = screen.getByRole("list");
        expect(listElement).toBeInTheDocument();
        expect(screen.queryByRole("listitem")).not.toBeInTheDocument();
    })

    test("does not render list items when array is undefined", () => {

        render(<Errors />)
        const listItems = screen.queryAllByRole("listitem");
        expect(listItems).toHaveLength(0);
    })

    test("renders list items", () => {
        const errors = ["test", "error"];

        render(<Errors errors={errors}/>)
        const listItems = screen.getAllByRole("listitem");
        expect(listItems).toHaveLength(2);

        screen.debug();

        errors.forEach(error => {
            expect(screen.getByText(error)).toBeInTheDocument();
        })
    })
    


    
})