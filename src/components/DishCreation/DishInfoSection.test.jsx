import { render, screen, fireEvent } from "@testing-library/react";
import DishInfoSection from "./DishInfoSection";

vi.mock("../Image/Photo", () => ({
    default: (props) => {
    console.log(props)
    return <div data-testid="photo">{props.img}</div>}
}))

const defaultState = {
    validInputs: {
        image: "image",
        name: "Test",
        course: "course"
    } 
}

const renderSection = (state = defaultState, cook) => {
    return render(
        <DishInfoSection state={state} cookType={cook}/>
    )
}

describe("Testing component: DishInfoSection", () => {

    test("renders elements with given default values", () =>  {
        const cook = "professional";
        renderSection(defaultState, cook);

        const input = screen.getByRole("textbox");
        expect(input).toBeInTheDocument();
        expect(input.value).toBe(defaultState.validInputs.name);

        const photo = screen.getByTestId("photo");
        expect(photo).toBeInTheDocument();
        expect(photo).toHaveTextContent(defaultState.validInputs.image);

        const select = screen.getByRole("combobox"); 
        expect(select).toBeInTheDocument();
        expect(select.value).toBe(defaultState.validInputs.course);
    });
})