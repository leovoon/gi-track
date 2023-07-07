import { render } from "@/test/test-utils";
import IssuesPage from "./IssuesPage";

describe("Issues Page", () => {
  it("should render issues title and filter title", async () => {
    const { getByText } = render(<IssuesPage />);
    const text1 = getByText(/issues list/i);
    const text2 = getByText(/filter by/i);
    expect(text1).toBeInTheDocument();
    expect(text2).toBeInTheDocument();
  });
});
