import { render, screen, fireEvent } from "@testing-library/react";
import TabButtons from "./TabButtons";

const two_sections = { a: "section-a", b: "section-b" };
const three_sections = { a: "section-a", b: "section-b", c: "section-c" };
const func = vi.fn();

const renderTabButtons = (sections, openTab = "section-a") => {
    return render(
        <TabButtons sections={sections} openTab={openTab} func={func} />
    );
}

describe("Testing component: TabButton", () => {

    test("renders 2 buttons using two sections", () => {
        renderTabButtons(two_sections);
        expect(screen.getAllByRole("button")).toHaveLength(2);
        expect(screen.getAllByRole("button")).not.toHaveLength(1);
    });

    test("renders 3 buttons using three sections", () => {
        renderTabButtons(three_sections);
        expect(screen.getAllByRole("button")).toHaveLength(3);
        expect(screen.getAllByRole("button")).not.toHaveLength(5);
    });

    test("renders correct number to each section button", () => {
        renderTabButtons(three_sections);
        const buttons = screen.getAllByRole("button");

        buttons.forEach((button, i) => {
            expect(button).toHaveTextContent(i + 1);
        })
    });

    test("calls event handler with correct section", () => {
        renderTabButtons(three_sections);
        const buttons = screen.getAllByRole("button");

        fireEvent.click(buttons[1]);
        expect(func).toHaveBeenCalledWith("section-b");
    });

    test("renders zero buttons when sections is empty", () => {
        renderTabButtons({});
        const buttons = screen.queryAllByRole("button");
        expect(buttons).toHaveLength(0);
        expect(screen.queryByRole("button")).toBeNull();
    });




})