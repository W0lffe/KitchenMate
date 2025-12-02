import { render, screen } from "@testing-library/react";
import ContentModal from "./ContentModal";

vi.mock("../LoginForm/LoginForm", () => ({
  default: () => <div data-testid="loginform">LoginForm</div>
}));

vi.mock("../ContentWrapper/ContentWrapper", () => ({
  default: () => <div data-testid="content-wrapper">ContentWrapper</div>
}));

const contentModal = (section, editStatus) => {
    return render( <ContentModal section={section} editStatus={editStatus} /> )
} 

describe("Testing component: ContentModal", () => {

  test("renders loginform when section is 'login'", () => {
    contentModal("login");
    expect(screen.getByTestId("loginform")).toBeInTheDocument();
    expect(screen.queryByTestId("content-wrapper")).not.toBeInTheDocument();
  });

  test("renders ContentWrapper when section is 'recipes'", () => {
    contentModal("recipes");
    expect(screen.getByTestId("content-wrapper")).toBeInTheDocument();
    expect(screen.queryByTestId("loginform")).not.toBeInTheDocument();
  });

  test("renders ContentWrapper when section is 'dishes'", () => {
    contentModal("dishes");
    expect(screen.getByTestId("content-wrapper")).toBeInTheDocument();
    expect(screen.queryByTestId("loginform")).not.toBeInTheDocument();
  });

  test("renders ContentWrapper when editStatus.status is truthy", () => {
    contentModal(null, {status: true});
    expect(screen.getByTestId("content-wrapper")).toBeInTheDocument();
    expect(screen.queryByTestId("loginform")).not.toBeInTheDocument();
  });

  test("renders nothing when section is not login/signup/recipes/dishes and editStatus.status is falsy", () => {
    contentModal(null, null);
    expect(screen.queryByTestId("loginform")).not.toBeInTheDocument();
    expect(screen.queryByTestId("content-wrapper")).not.toBeInTheDocument();
  }); 
});
