import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Button } from "./button";

describe("Button", () => {
  it("renders the text correctly", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("shows loading when isLoading=true", () => {
    render(<Button isLoading>Loading</Button>);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("renders as a link when href is provided", () => {
    render(<Button href="/test">Link</Button>);
    expect(screen.getByRole("link")).toHaveAttribute("href", "/test");
  });
});
