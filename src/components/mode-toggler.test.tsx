import { render, userEvent, waitFor } from "@/lib/test-utils";
import { ModeToggle } from "./mode-toggler";
describe("Mode Toggler", () => {
  it("should render", () => {
    const { getByText } = render(<ModeToggle />);
    expect(getByText("Toggle theme")).toBeInTheDocument();
  });

  it("should be able to toggle theme to dark", async () => {
    const { getByText, findByRole, debug } = render(<ModeToggle />);
    const toggleButton = getByText("Toggle theme");
    userEvent.click(toggleButton);
    const dark = await findByRole("menuitem", { name: "Dark" });
    userEvent.click(dark);
    const html = document.documentElement;
    await waitFor(() => {
      expect(html.classList.contains("dark")).toBeTruthy();
      expect(dark).not.toBeInTheDocument();
    });
  });

  it("should be able to toggle theme to light", async () => {
    const { getByText, findByRole } = render(<ModeToggle />);
    const toggleButton = getByText("Toggle theme");
    userEvent.click(toggleButton);
    const light = await findByRole("menuitem", { name: "Light" });
    userEvent.click(light);
    const html = document.documentElement;
    await waitFor(() => {
      expect(html.classList.contains("dark")).toBeFalsy();
      expect(light).not.toBeInTheDocument();
    });
  });
});
