import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToken } from "@/hooks/useAccessToken";
import { useUpdateIssueStatus } from "@/hooks/useUpdateIssueStatus";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import QueryLoader from "./query-loader";

export function IssueStatusUpdate({
  status,
  number,
  owner,
  repoName,
}: {
  status: string;
  number: number;
  owner: string;
  repoName: string;
}) {
  const statusItems = [
    { label: "Open", value: "open" },
    { label: "Closed", value: "closed" },
  ];

  const token = useToken();
  const queryClient = useQueryClient();
  const [state, setState] = useState(status);

  const data = { state, owner, repoName, number, token };

  const updateStatus = useUpdateIssueStatus(data, queryClient);

  useEffect(() => {
    if (state !== status) {
      updateStatus.mutate(state);
    }
  }, [state]);

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <h1>Status</h1>
        <QueryLoader />
      </div>
      <Select
        defaultValue={status}
        onValueChange={(value: string) => {
          setState(value);
        }}
      >
        <SelectTrigger className="w-[220px]">
          <SelectValue placeholder="Update Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Change to</SelectLabel>
            {statusItems.map(({ label, value }) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>{" "}
    </div>
  );
}
