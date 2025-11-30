import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { MarkdownRenderer } from "@/components/blog/MarkdownRenderer";

// 重い依存関係をモック化してテスト高速化
vi.mock("highlight.js/styles/tokyo-night-dark.css", () => ({}));
vi.mock("highlight.js/styles/tokyo-night-light.css", () => ({}));
vi.mock("katex/dist/katex.min.css", () => ({}));

describe("MarkdownRenderer", () => {
  describe("Alert Rendering", () => {
    it("should render Note alerts with blue styling", () => {
      const noteMarkdown = "> **Note**: This is a note alert.";

      render(<MarkdownRenderer content={noteMarkdown} />);

      const alertElement = screen.getByText(/This is a note alert/i);
      expect(alertElement).toBeInTheDocument();

      // Check if the alert container has the correct classes
      const alertContainer = alertElement.closest(".alert-note");
      expect(alertContainer).toBeInTheDocument();
      expect(alertContainer).toHaveClass("border-tn-blue");
      expect(alertContainer).toHaveClass("bg-tn-blue/10");
    });

    it("should render Tip alerts with green styling", () => {
      const tipMarkdown = "> **Tip**: This is a tip alert.";

      render(<MarkdownRenderer content={tipMarkdown} />);

      const alertElement = screen.getByText(/This is a tip alert/i);
      expect(alertElement).toBeInTheDocument();

      const alertContainer = alertElement.closest(".alert-tip");
      expect(alertContainer).toBeInTheDocument();
      expect(alertContainer).toHaveClass("border-tn-green");
      expect(alertContainer).toHaveClass("bg-tn-green/10");
    });

    it("should render Warning alerts with yellow styling", () => {
      const warningMarkdown = "> **Warning**: This is a warning alert.";

      render(<MarkdownRenderer content={warningMarkdown} />);

      const alertElement = screen.getByText(/This is a warning alert/i);
      expect(alertElement).toBeInTheDocument();

      const alertContainer = alertElement.closest(".alert-warning");
      expect(alertContainer).toBeInTheDocument();
      expect(alertContainer).toHaveClass("border-tn-yellow");
      expect(alertContainer).toHaveClass("bg-tn-yellow/10");
    });

    it("should render Danger alerts with red styling", () => {
      const dangerMarkdown = "> **Danger**: This is a danger alert.";

      render(<MarkdownRenderer content={dangerMarkdown} />);

      const alertElement = screen.getByText(/This is a danger alert/i);
      expect(alertElement).toBeInTheDocument();

      const alertContainer = alertElement.closest(".alert-danger");
      expect(alertContainer).toBeInTheDocument();
      expect(alertContainer).toHaveClass("border-tn-red");
      expect(alertContainer).toHaveClass("bg-tn-red/10");
    });

    it("should render regular blockquotes for non-alert content", () => {
      const regularQuote = "> This is just a regular blockquote without alert formatting.";

      render(<MarkdownRenderer content={regularQuote} />);

      const quoteElement = screen.getByText(/This is just a regular blockquote/i);
      expect(quoteElement).toBeInTheDocument();

      // Should be in a regular blockquote, not an alert
      const blockquoteElement = quoteElement.closest("blockquote");
      expect(blockquoteElement).toBeInTheDocument();
      expect(blockquoteElement).not.toHaveClass("alert-note");
      expect(blockquoteElement).not.toHaveClass("alert-tip");
      expect(blockquoteElement).not.toHaveClass("alert-warning");
      expect(blockquoteElement).not.toHaveClass("alert-danger");
    });

    it("should render blockquotes with bold text that are not alerts", () => {
      const boldQuote = "> This has **bold text** but is not an alert pattern.";

      render(<MarkdownRenderer content={boldQuote} />);

      const quoteElement = screen.getByText(/This has/i);
      expect(quoteElement).toBeInTheDocument();

      // Should be in a regular blockquote, not an alert
      const blockquoteElement = quoteElement.closest("blockquote");
      expect(blockquoteElement).toBeInTheDocument();
      expect(blockquoteElement).not.toHaveClass("alert-note");
    });

    it("should include appropriate icons for each alert type", () => {
      const alerts = [
        { content: "> **Note**: Note content", icon: "ℹ️" },
        { content: "> **Tip**: Tip content", icon: "💡" },
        { content: "> **Warning**: Warning content", icon: "⚠️" },
        { content: "> **Danger**: Danger content", icon: "🚨" },
      ];

      alerts.forEach(({ content, icon }) => {
        render(<MarkdownRenderer content={content} />);
        expect(screen.getByText(icon)).toBeInTheDocument();
      });
    });
  });

  describe("Basic Markdown Rendering", () => {
    it("should render headings correctly", () => {
      const markdownWithHeading = "# Main Title\n\n## Subtitle";

      render(<MarkdownRenderer content={markdownWithHeading} />);

      expect(screen.getByText("Main Title")).toBeInTheDocument();
      expect(screen.getByText("Subtitle")).toBeInTheDocument();
    });

    it("should render code blocks with syntax highlighting", () => {
      const codeMarkdown = '```typescript\nconst hello = "world";\n```';

      render(<MarkdownRenderer content={codeMarkdown} />);

      // Code is split across multiple elements due to syntax highlighting
      expect(screen.getByText("const")).toBeInTheDocument();
      expect(screen.getByText('"world"')).toBeInTheDocument();
    });

    it("should render links correctly", () => {
      const linkMarkdown = "[GitHub](https://github.com)";

      render(<MarkdownRenderer content={linkMarkdown} />);

      const linkElement = screen.getByRole("link", { name: "GitHub" });
      expect(linkElement).toBeInTheDocument();
      expect(linkElement).toHaveAttribute("href", "https://github.com");
      expect(linkElement).toHaveAttribute("target", "_blank");
    });
  });
});
