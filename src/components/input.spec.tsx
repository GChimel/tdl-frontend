import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Input } from "./input";

describe("Input", () => {
  it("renders the input", () => {
    render(<Input placeholder="Type here" />);
    expect(screen.getByPlaceholderText("Type here")).toBeInTheDocument();
  });

  it("displays error message", () => {
    render(<Input error="Error!" />);
    expect(screen.getByText("Error!")).toBeInTheDocument();
  });
});
