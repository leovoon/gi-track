import { render } from "@/test/test-utils";
import { IssueComments } from "./issue-comments";

describe("Issue Comments", () => {
  const comments = [
    {
      id: 1,
      user: {
        login: "leovoon",
      },
      body: "This is a comment",
    },
    {
      id: 2,
      user: {
        login: "leovoon2",
      },
      body: "This is a comment2",
    },
  ];

  it("should render a list of comments", () => {
    //@ts-expect-error
    const { getByText } = render(<IssueComments comments={comments} />);
    expect(getByText("leovoon")).toBeInTheDocument();
    expect(getByText("This is a comment")).toBeInTheDocument();
  });

  it("should render a message if there are no comments", () => {
    const { getByText } = render(<IssueComments comments={[]} />);
    expect(getByText(/No comments/i)).toBeInTheDocument();
  });
});
