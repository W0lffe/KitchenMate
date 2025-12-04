import { render, screen } from "@testing-library/react";
import PrefPanel from "./PrefPanel";
import PrefField from "./PrefField";
import { vi } from "vitest";

vi.mock("./PrefField", () => ({
    default: vi.fn(() => <div data-testid="pref-field" />)
}));

const renderPanel = (state) => {
    return render(
        <PrefPanel state={state} />
    )
}

describe("Testing component: PrefPanel", () => {

    beforeEach(() => {
        vi.clearAllMocks();
    });

    test("renders two PrefField components", () => {
        const state = { validInputs: {name: ""}};

        renderPanel(state);

        const fields = screen.getAllByTestId("pref-field");
        expect(fields).toHaveLength(2);
    });

    test("works even if state.validInputs is missing", () => {
        render(<PrefPanel state={{}} />);

        expect(screen.getAllByTestId("pref-field")).toHaveLength(2);
    });
   
});
