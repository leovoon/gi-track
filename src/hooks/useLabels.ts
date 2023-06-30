import { useQuery } from "@tanstack/react-query";

const labels = [
  {
    id: 2284037145,
    name: "bug",
    color: "d73a4a",
    default: true,
    description: "Something isn't working",
  },
  {
    id: 2284037146,
    name: "documentation",
    color: "0075ca",
    default: true,
    description: "Improvements or additions to documentation",
  },
  {
    id: 2284037147,
    name: "duplicate",
    color: "cfd3d7",
    default: true,
    description: "This issue or pull request already exists",
  },
  {
    id: 2284037148,
    name: "enhancement",
    color: "a2eeef",
    default: true,
    description: "New feature or request",
  },
  {
    id: 2284037150,
    name: "good first issue",
    color: "7057ff",
    default: true,
    description: "Good for newcomers",
  },
  {
    id: 2284037149,
    name: "help wanted",
    color: "008672",
    default: true,
    description: "Extra attention is needed",
  },
  {
    id: 2284037151,
    name: "invalid",
    color: "e4e669",
    default: true,
    description: "This doesn't seem right",
  },
  {
    id: 2284037152,
    name: "question",
    color: "d876e3",
    default: true,
    description: "Further information is requested",
  },
  {
    id: 2284037153,
    name: "wontfix",
    color: "ffffff",
    default: true,
    description: "This will not be worked on",
  },
];

const fetchLabels = () => {
  return labels;
};

export default function useLabels() {
  const labels = useQuery(["labels"], fetchLabels);

  return labels;
}
