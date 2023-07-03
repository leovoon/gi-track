import { useOwnerStore } from "@/stores/owner";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";

export default function MyIssueOnlySwitcher() {
  const [myIssueOnly, setMyIssueOnly] = useOwnerStore((state) => [
    state.isOwner,
    state.setIsOwner,
  ]);
  return (
    <div className="flex items-center space-x-2 mb-4">
      <Switch
        id="my-issue"
        checked={myIssueOnly}
        onCheckedChange={() => {
          setMyIssueOnly(!myIssueOnly);
        }}
      />
      <Label htmlFor="my-issue">My Issues only</Label>
    </div>
  );
}
