import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { LanguageProvider } from "../../../src/contexts/LanguageContext";
import { ThemeProvider } from "../../../src/contexts/ThemeContext";
import { Product } from "../../../src/pages/Product";

const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <LanguageProvider>{children}</LanguageProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

describe("Product Page", () => {
  it("should render page title", () => {
    render(
      <TestWrapper>
        <Product />
      </TestWrapper>,
    );

    expect(screen.getByText("Product")).toBeInTheDocument();
  });

  it("should render OSS section", () => {
    render(
      <TestWrapper>
        <Product />
      </TestWrapper>,
    );

    expect(screen.getByText("OSS")).toBeInTheDocument();
  });

  it("should not render presentations section when empty", () => {
    render(
      <TestWrapper>
        <Product />
      </TestWrapper>,
    );

    // Since presentations array is empty, section should not be rendered
    expect(screen.queryByText("Presentations")).not.toBeInTheDocument();
  });

  it("should display OSS projects with links", () => {
    render(
      <TestWrapper>
        <Product />
      </TestWrapper>,
    );

    // Check for at least one OSS project structure
    const articles = screen.getAllByRole("article");
    expect(articles.length).toBeGreaterThan(0);

    // Check for GitHub links (multiple projects have GitHub links)
    const githubLinks = screen.getAllByText("GitHub");
    expect(githubLinks.length).toBeGreaterThan(0);
  });

  it("should only display OSS project articles when presentations are empty", () => {
    render(
      <TestWrapper>
        <Product />
      </TestWrapper>,
    );

    // Check for OSS project articles only (since presentations are empty)
    const articles = screen.getAllByRole("article");
    expect(articles.length).toBe(5); // We have 5 OSS projects
  });
});
