import { Status } from "@prisma/client";
import { Badge } from "@radix-ui/themes";
import React from "react";

interface Props {
  status: Status;
}

const statusMap: Record<
  Status,
  { label: string; color: "red" | "violet" | "blue" | "green" }
> = {
  QUEUED: { label: "Queued", color: "violet" },
  FAILED: { label: "Failed", color: "red" },
  RUNNING: { label: "Running", color: "blue" },
  SUCCESS: { label: "Success", color: "green" },
};

const JobStatusBadge = ({ status }: Props) => {
  return (
    <Badge color={statusMap[status].color}>{statusMap[status].label}</Badge>
  );
};

export default JobStatusBadge;
