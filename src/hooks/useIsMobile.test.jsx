import { render, 
        screen } from "@testing-library/react";
import { useIsMobile } from "./useIsMobile";

function TestComponent() {
  const isMobile = useIsMobile();
  return <div>{isMobile ? "true" : "false"}</div>;
}

describe("testing useIsMobile hook", () => {

  test("isMobile is true", () => {
    window.innerWidth = 680;
    render(<TestComponent />);
    expect(screen.getByText("true")).toBeInTheDocument();
  });

  test("isMobile is false", () => {
    window.innerWidth = 1280;
    render(<TestComponent />);
    expect(screen.getByText("false")).toBeInTheDocument();
  });
});