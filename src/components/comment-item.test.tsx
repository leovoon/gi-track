import { render } from "@/test/test-utils";
import CommentItem from "./comment-item";

describe("Comment Item", () => {
  const comment = {
    user: {
      login: "leovoon",
    },
    id: "1",
    created_at: "2021-08-01T00:00:00Z",
    body: "This is a comment",
  };

  it("should render a of comment", () => {
    //@ts-expect-error
    const { getByText, debug } = render(<CommentItem {...comment} />);
    expect(getByText("leovoon")).toBeInTheDocument();
    debug();
    expect(getByText(/1 year ago/i)).toBeInTheDocument();
    expect(getByText("This is a comment")).toBeInTheDocument();
  });
});
