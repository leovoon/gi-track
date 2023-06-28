import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { statusContext, statusType } from "@/contexts/statusContext";
import { useContext } from "react";

export default function Status() {
  const statusItems = [
    { label: "Open", value: "open" },
    { label: "Closed", value: "closed" },
    { label: "All", value: "" },
  ];
  const { setStatus } = useContext(statusContext);

  return (
    <Select
      onValueChange={(value: statusType) => {
        setStatus(value);
      }}
    >
      <SelectTrigger className="w-[220px]">
        <SelectValue placeholder="Select a status to filter" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Status</SelectLabel>
          {statusItems.map(({ label, value }) => (
            <SelectItem key={value} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
