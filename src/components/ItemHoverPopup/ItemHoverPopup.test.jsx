// ItemHoverPopup.test.jsx
import { render, screen } from "@testing-library/react";
import ItemHoverPopup from "./ItemHoverPopup";

describe("Testing component: ItemHoverPopup", () => {
  const dummyItem = { 
    id: 1,
    name: "Test Recipe",
    output: "N/A",
    outputType: null,
    portions: 4,
    ingredients: [{product: "Test", quantity: 500, unit: "g"}],
    instructions: ["Testing"],
    favorite: false
};
  const position = { x: 50, y: 100 };

  test("renders null if no item is provided", () => {
    const { container } = render(
      <ItemHoverPopup item={null} position={position} isMobile={false} />
    );
    expect(container.firstChild).toBeNull();
  });

  test("renders ItemInspectView when item is provided (desktop)", () => {
    render(<ItemHoverPopup item={dummyItem} position={position} isMobile={false} />);
    expect(screen.getByText(/Test Recipe/i)).toBeInTheDocument();
  });

  test("renders correctly on mobile", () => {
    const dialog = document.createElement("div");
    dialog.id = "active-dialog";
    document.body.appendChild(dialog);

    render(<ItemHoverPopup item={dummyItem} position={position} isMobile={true} />);
    expect(screen.getByText(/Test Recipe/i)).toBeInTheDocument();
  });
});