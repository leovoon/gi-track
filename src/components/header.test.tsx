import { expect } from "vitest";
import { render, userEvent } from "@/test/test-utils";
import Header from "./header";
import { useUser } from "@clerk/clerk-react";

describe("Header", () => {
  it("should render", () => {
    const { getByText } = render(<Header />);
    expect(getByText("git-track")).toBeInTheDocument();
  });

  it("should navigates to the correct GitHub link when the GitHub logo is clicked", () => {
    const { getByText } = render(<Header />);
    const githubLogo = getByText("GitHub");
    userEvent.click(githubLogo);
    expect(githubLogo.closest("a")).toHaveAttribute(
      "href",
      "https://github.com/leovoon/gi-track"
    );
  });

  it("should render a theme toggle button", () => {
    const { getByText } = render(<Header />);
    expect(getByText("Toggle theme")).toBeInTheDocument();
  });
});

describe("Header Logged in", () => {
  it("should render a profile pic if user is logged in", async () => {
    const { getByTestId } = render(<Header />);
    expect(useUser().isSignedIn).toBeTruthy();
    expect(getByTestId("profile-button")).toBeInTheDocument();
  });
});
