import {
  ClerkProvider,
  RedirectToSignIn,
  SignedIn,
  SignedOut,
} from "@clerk/clerk-react";
import {
  Route,
  Routes,
  BrowserRouter,
  useNavigate,
  Link,
} from "react-router-dom";
import PublicPage from "./pages/PublicPage";
import AppPage from "./pages/AppPage";
import Header from "./components/header";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";

if (!import.meta.env.VITE_REACT_APP_CLERK_PUBLISHABLE_KEY) {
  throw new Error("Missing Clerk Publishable Key");
}
const clerkPubKey = import.meta.env.VITE_REACT_APP_CLERK_PUBLISHABLE_KEY;

const ClerkProviderWithRoutes = () => {
  const navigate = useNavigate();
  return (
    <ClerkProvider publishableKey={clerkPubKey} navigate={(to) => navigate(to)}>
      <Header />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <SignedIn>
                <AppPage />
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
          path="/app"
          element={
            <>
              <SignedIn>
                <AppPage />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />
        <Route
          path="*"
          element={
            <div className="text-center my-40">
              <h1>404 Page Not Found 😅</h1>
              <Link to="/app" className="underline p-2 mt-4">
                back to app
              </Link>
            </div>
          }
        />
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
