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
  const statusItems = ["Open", "Closed"];
  const { setStatus } = useContext(statusContext);

  return (
    <Select
      onValueChange={(value: statusType) => {
        setStatus(value);
      }}
    >
      <SelectTrigger className="w-1/2">
        <SelectValue placeholder="Select a status to filter" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Status</SelectLabel>
          {statusItems.map((item) => (
            <SelectItem key={item} value={item}>
              {item}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
