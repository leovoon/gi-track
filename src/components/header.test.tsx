import { expect } from "vitest";
import { render, userEvent } from "@/lib/test-utils";
import Header from "./header";
import { useUser } from "@clerk/clerk-react";

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

describe("Header Logged in", () => {
  it("should render a profile pic if user is logged in", async () => {
    vi.mock("@clerk/clerk-react", async () => {
      const actual = await vi.importActual("@clerk/clerk-react");
      return {
        ...(actual as Record<string, unknown>),
        useUser: () => ({
          isSignedIn: true,
          user: {
            username: "leovoon",
            profileImageUrl:
              "https://avatars.githubusercontent.com/u/10047099?v=4",
          },
        }),
      };
    });

    const { getByTestId } = render(<Header />);
    expect(useUser().isSignedIn).toBeTruthy();
    expect(getByTestId("profile-button")).toBeInTheDocument();
  });
});
