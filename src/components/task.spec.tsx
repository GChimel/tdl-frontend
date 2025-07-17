import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Task } from "./task";

describe("Task", () => {
  const queryClient = new QueryClient();
  const defaultProps = {
    id: "1",
    name: "Test Task",
    projectId: "1",
    completed: false,
    onModal: false,
    onEdit: jest.fn(),
    onToggleComplete: jest.fn(),
  };

  function renderWithProvider(ui: React.ReactElement) {
    return render(
      <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
    );
  }

  it("renders the task name", () => {
    renderWithProvider(<Task {...defaultProps} />);
    expect(screen.getByText("Test Task")).toBeInTheDocument();
  });

  it("calls onEdit when the edit button is clicked", () => {
    renderWithProvider(<Task {...defaultProps} />);
    // The first button is the edit button
    const [editButton] = screen.getAllByRole("button");
    editButton.click();
    expect(defaultProps.onEdit).toHaveBeenCalled();
  });
});
