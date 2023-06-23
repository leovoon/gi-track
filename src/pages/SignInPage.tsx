import { SignIn } from "@clerk/clerk-react";

export default function SignInPage() {
  return (
    <div className="grid place-items-center h-1/2 mt-12">
      <SignIn />
    </div>
  );
}
