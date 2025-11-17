import { render, screen } from "@testing-library/react";
import Header from "./Header";
import { KitchenContext } from "../../context/KitchenContext";

const renderWithContext = (ctxValue, children = null) => {
  return render(
    <KitchenContext.Provider value={ctxValue}>
      <Header>{children}</Header>
    </KitchenContext.Provider>
  );
};



describe("Testing component: Header", () => {
    
    const setSlogan = vi.fn();
    const slogan = "Testing Slogan";

    test("Renders app logo", () => {
        renderWithContext({
            slogan,
            setSlogan
        });
        const image = screen.getByAltText("KitchenMate", {exact: true});
        expect(image).toBeInTheDocument();
    })
    
    test("Calls setSlogan upon mounting", () => {


        renderWithContext({
            slogan,
            setSlogan
        });
        expect(setSlogan).toHaveBeenCalled();
    });

    test("Renders slogan inside heading element", () => {
        renderWithContext({
            slogan,
            setSlogan
        });

        expect(screen.getByText(slogan)).toBeInTheDocument();
    })

    test("renders custom layout with children", () => {
        const children = <div data-testid="child">Testing Div</div>
        renderWithContext({
            slogan,
            setSlogan
        }, children);

        expect(screen.getByText("Testing Div")).toBeInTheDocument();
        expect(screen.getByTestId("child")).toBeInTheDocument();

    })
    
})