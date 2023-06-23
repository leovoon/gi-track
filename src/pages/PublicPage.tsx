import { SignIn } from "@clerk/clerk-react";

const PublicPage = () => {
  return (
    <>
      <div className="grid place-items-center h-1/2 mt-12">
        <SignIn />
      </div>
    </>
  );
};

export default PublicPage;
