/* eslint-disable import/export */
import { ClerkProvider } from "@clerk/clerk-react";
import { cleanup, render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { afterEach } from "vitest";

afterEach(() => {
  cleanup();
});
const clerkPubKey = import.meta.env.VITE_REACT_APP_CLERK_PUBLISHABLE_KEY;

function customRender(ui: React.ReactElement, options = {}) {
  return render(ui, {
    // wrap provider(s) here if needed
    wrapper: ({ children }) => (
      <BrowserRouter>
        <ClerkProvider publishableKey={clerkPubKey}>{children}</ClerkProvider>
      </BrowserRouter>
    ),
    ...options,
  });
}

export * from "@testing-library/react";
export { default as userEvent } from "@testing-library/user-event";
// override render export
export { customRender as render };
