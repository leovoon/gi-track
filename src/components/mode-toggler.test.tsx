import { render, userEvent, waitFor } from "@/test/test-utils";
import { ModeToggle } from "./mode-toggler";

describe("Mode Toggler", () => {
  const html = document.documentElement;

  it("should render", () => {
    const { getByText } = render(<ModeToggle />);
    expect(getByText("Toggle theme")).toBeInTheDocument();
  });

  it("should toggle dark theme", async () => {
    const { getByText, findByRole } = render(<ModeToggle />);
    const toggleButton = getByText("Toggle theme");
    userEvent.click(toggleButton);
    const dark = await findByRole("menuitem", { name: "Dark" });
    userEvent.click(dark);
    await waitFor(() => {
      expect(html).toHaveClass("dark");
      expect(dark).not.toBeInTheDocument();
    });
  });

  it("should toggle light theme", async () => {
    const { getByText, findByRole } = render(<ModeToggle />);
    const toggleButton = getByText("Toggle theme");
    userEvent.click(toggleButton);
    const light = await findByRole("menuitem", { name: "Light" });
    userEvent.click(light);
    await waitFor(() => {
      expect(html).not.toHaveClass("dark");
      expect(light).not.toBeInTheDocument();
    });
  });
});
