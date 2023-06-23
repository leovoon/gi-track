import IssuesList from "@/components/issues-list";

const AppPage = () => {
  return (
    <div className="p-2 mt-5">
      <h1 className="text-xl">Issues List</h1>

      <IssuesList />
    </div>
  );
};

export default AppPage;
