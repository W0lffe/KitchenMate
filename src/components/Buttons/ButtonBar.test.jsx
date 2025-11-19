import { render, screen, fireEvent } from "@testing-library/react";
import ButtonBar from "./ButtonBar";


const handleDelete = vi.fn();
const handleModify = vi.fn();
const handleFavorite = vi.fn();
const handleAddCart = vi.fn();

const buttonsWithProps = (isMobile, fav) => {
    return render(
        <ButtonBar 
            isMobile={isMobile}
            handleDelete={handleDelete}
            handleModify={handleModify}
            handleAddCart={handleAddCart}
            handleFavorite={handleFavorite}
            fav={fav}
        />
    )
}

describe("Testing component: ButtonBar", () =>{

    test("renders 4 buttons when isMobile is false", () => {
        buttonsWithProps(false, 0);
        expect(screen.getAllByRole("button")).toHaveLength(4);
    })

    test("calls event handlers on click", () => {
        buttonsWithProps(false, 0);

        const buttons = screen.getAllByRole("button");

        fireEvent.click(buttons[0]);
        expect(handleDelete).toHaveBeenCalled();
        
        fireEvent.click(buttons[1]);
        expect(handleModify).toHaveBeenCalled();

        fireEvent.click(buttons[2]);
        expect(handleFavorite).toHaveBeenCalled();

        fireEvent.click(buttons[3]);
        expect(handleAddCart).toHaveBeenCalled();

    })


})