import IssuesList from "@/components/issues-list";
import Labels from "@/components/labels";

const AppPage = () => {
  return (
    <div className="p-2 mt-5">
      <div className="flex flex-col md:flex-row gap-x-6 gap-y-4">
        <section className="order-2 md:order-1">
          <h1 className="text-xl mb-5">Issues List</h1>
          <IssuesList />
        </section>
        <aside className="order-1 md:order-2">
          <h1 className="text-xl mb-5">Labels</h1>
          <Labels />
        </aside>
      </div>
    </div>
  );
};

export default AppPage;
