import { render, screen, fireEvent } from "@testing-library/react";
import Info from "./Info";

const default_props = {
    item: {
        header: "Hello World",
        brief: "Hello Brief",
        mobile: "mobile_image.jpg",
        desktopImage: "desktop_image.jpg"
    },
    reverse: false,
    isMobile: false,
    isFirst: false,
    isLast: false,
    navigate: vi.fn(),
    ref: { current: { scrollTo: vi.fn() } }
}

const renderInfo = (props) => {
    return render(
        <Info {...default_props} {...props} />
    );
}

describe("Testing component: Info", () => {

   test("renders header and brief", () => {
        renderInfo();

        expect(screen.getByRole("heading", {name: "Hello World"})).toBeInTheDocument();
        expect(screen.getByText("Hello Brief")).toBeInTheDocument();
    })

    test("renders get started button in first child when isFirst is true", () => {
        renderInfo({ isFirst: true });

        const button = screen.getByRole("button", { name: "CLICK TO GET STARTED" });
        expect(button).toBeInTheDocument();
    })

    test("calls navigate with correct value", () => {
        renderInfo({ isFirst: true });
        const button = screen.getByRole("button", { name: "CLICK TO GET STARTED" });

        fireEvent.click(button);
        expect(default_props.navigate).toHaveBeenCalledWith("/app");
    })

    test("does not render get started button in first child when isFirst is false", () => {
        renderInfo({ isFirst: false });

        const button = screen.queryByRole("button", { name: "CLICK TO GET STARTED" });
        expect(button).not.toBeInTheDocument();
    })

    test("renders mobile image when isMobile is true", () => {
        renderInfo({ isMobile: true });

        const img = screen.getByRole("img");
        expect(img).toHaveAttribute("src", "mobile_image.jpg");
    });

    test("renders text to swipe right when isFirst is true and isMobile is true", () => {
        renderInfo({ isMobile: true, isFirst: true });

        const label = screen.getByText("SWIPE RIGHT FOR MORE");
        expect(label).toBeInTheDocument();
    });

    test("renders BACK TO START label if isLast is true and calls event handler if clicked", () => {

        renderInfo({ isLast: true });

        const mockTarget = { offsetTop: 123, offsetLeft: 45 };
        vi.spyOn(document, "getElementById").mockReturnValue(mockTarget);

        const label = screen.getByText("BACK TO START");
        expect(label).toBeInTheDocument();

        fireEvent.click(label);
        expect(default_props.ref.current.scrollTo).toHaveBeenCalled();
    });
});