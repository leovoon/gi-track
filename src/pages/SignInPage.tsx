import { SignIn, useAuth } from "@clerk/clerk-react";

export default function SignInPage() {
  const { isLoaded } = useAuth();
  if (!isLoaded) {
    return (
      <div className="grid place-items-center h-[300px] mt-1/2">
        <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-900"></div>
      </div>
    );
  }

  return (
    <div className="grid place-items-center h-1/2 mt-12">
      <SignIn />
    </div>
  );
}
