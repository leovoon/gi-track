import { expect } from "vitest";
import { render, userEvent } from "../lib/test-utils";
import Header from "./header";

describe("Header", () => {
  it("should render", () => {
    const { getByText } = render(<Header />);
    expect(getByText("Github Issues Tracker")).toBeInTheDocument();
  });

  it("should navigates to the correct GitHub link when the GitHub logo is clicked", () => {
    const { getByText } = render(<Header />);
    const githubLogo = getByText("GitHub");
    userEvent.click(githubLogo);
    expect(githubLogo.closest("a")).toHaveAttribute(
      "href",
      "https://github.com/leovoon/github-issues"
    );
  });

  it("should render a theme toggle button", () => {
    const { getByText } = render(<Header />);
    expect(getByText("Toggle theme")).toBeInTheDocument();
  });
});
