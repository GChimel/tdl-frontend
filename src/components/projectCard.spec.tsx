import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { ProjectCard } from "./projectCard";

describe("ProjectCard", () => {
  const queryClient = new QueryClient();

  function renderWithProvider(ui: React.ReactElement) {
    return render(
      <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
    );
  }

  it("renders the project name", () => {
    renderWithProvider(
      <ProjectCard
        name="Test Project"
        projectId="1"
        completedTasks={2}
        totalTasks={4}
      />
    );
    expect(screen.getByText("Test Project")).toBeInTheDocument();
  });

  it("shows the correct percentage", () => {
    renderWithProvider(
      <ProjectCard
        name="Test Project"
        projectId="1"
        completedTasks={2}
        totalTasks={4}
      />
    );
    expect(screen.getByText("50%")).toBeInTheDocument();
  });
});
