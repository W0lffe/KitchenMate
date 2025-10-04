import { render, 
        screen } from "@testing-library/react"
import Header from "./Header"
import { KitchenContext } from "../../context/KitchenContext"

describe("Testing header component", () => {
    const sloganContent = "Testing Slogan";
    const mockSetSlogan = vi.fn();
    const mockCtx = {
        slogan: sloganContent,
        setSlogan: mockSetSlogan
    }

    const renderHeader = () => {
        return render(
            <KitchenContext.Provider value={mockCtx}>
                <Header />
            </KitchenContext.Provider>
        )
    }

    test("Renders app logo", () => {
        renderHeader();
        const image = screen.getByAltText("KitchenMate", {exact: true});
        expect(image).toHaveAttribute("src", expect.stringContaining("whiteKitchenmate"));
        expect(image).toBeInTheDocument();
    })

    test("Renders slogan inside heading element", () => {
        renderHeader();
        const heading = screen.getByRole("heading", {level: 2});
        expect(heading).toHaveTextContent(sloganContent);
    })

    test("Calls setSlogan upon mounting", () => {
        renderHeader();
        expect(mockSetSlogan).toHaveBeenCalled();
    });
    
})