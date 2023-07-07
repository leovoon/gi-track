import { RenderResult, render } from "@/test/test-utils";
import IssuePage from "./IssuePage";

describe("Issue Page", () => {
  let renderResult: RenderResult;

  vi.mock("react-router-dom", async () => {
    const actual = (await vi.importActual("react-router-dom")) as object;
    return {
      ...actual,
      useParams: () => ({
        repoUsername: "123",
        repoName: "abc",
        issueId: "12345",
      }),
    };
  });

  beforeEach(() => {
    renderResult = render(<IssuePage />);
  });

  it("should render back to issues list button", () => {
    const { getByText } = renderResult;
    const text = getByText(/back to issues list/i);
    expect(text).toBeInTheDocument();
  });

  it("should go to the correct link when back to issues list button is clicked", () => {
    const { getByText } = renderResult;

    const text = getByText(/back to issues list/i);
    expect(text.closest("a")).toHaveAttribute("href", "/");
  });
});
