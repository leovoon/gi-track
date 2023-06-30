import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-react";
import {
  Route,
  Routes,
  BrowserRouter,
  useNavigate,
  Link,
  Outlet,
} from "react-router-dom";
import PublicPage from "./pages/PublicPage";
import IssuesPage from "./pages/IssuesPage";
import Header from "./components/header";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import IssuePage from "./pages/IssuePage";

if (!import.meta.env.VITE_REACT_APP_CLERK_PUBLISHABLE_KEY) {
  throw new Error("Missing Clerk Publishable Key");
}
const clerkPubKey = import.meta.env.VITE_REACT_APP_CLERK_PUBLISHABLE_KEY;

const ClerkProviderWithRoutes = () => {
  const navigate = useNavigate();
  return (
    <ClerkProvider publishableKey={clerkPubKey} navigate={(to) => navigate(to)}>
      <Routes>
        <Route
          element={
            <>
              <Header />
              <Outlet />
            </>
          }
        >
          <Route
            path="/"
            element={
              <>
                <SignedIn>
                  <IssuesPage />
                </SignedIn>
                <SignedOut>
                  <PublicPage />
                </SignedOut>
              </>
            }
          />
          <Route path="/sign-in/*" element={<SignInPage />} />
          <Route path="/sign-up/*" element={<SignUpPage />} />
          <Route
            path="/issue/:repoUsername/:repoName/:issueId"
            element={
              <>
                <SignedIn>
                  <IssuePage />
                </SignedIn>
                <SignedOut>
                  <PublicPage />
                </SignedOut>
              </>
            }
          />
          <Route
            path="*"
            element={
              <div className="text-center my-40">
                <h1>404 Page Not Found 😅</h1>
                <Link to="/" className="underline p-2 mt-4">
                  back to home
                </Link>
              </div>
            }
          />
        </Route>
      </Routes>
    </ClerkProvider>
  );
};

function App() {
  return (
    <BrowserRouter>
      <ClerkProviderWithRoutes />
    </BrowserRouter>
  );
}

export default App;
