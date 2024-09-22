import { Status } from "@prisma/client";
import { Card, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

interface Props {
  queued: number;
  running: number;
  success: number;
  failed: number;
}

const JobSummary = ({ queued, running, success, failed }: Props) => {
  const containers: { label: string; value: number; status: Status }[] = [
    { label: "Queued Jobs", value: queued, status: "QUEUED" },
    { label: "Running Jobs", value: running, status: "RUNNING" },
    { label: "Succeeded Jobs", value: success, status: "SUCCESS" },
    { label: "Failed Jobs", value: failed, status: "FAILED" },
  ];
  return (
    <Flex gap="4">
      {containers.map((container) => (
        <Card key={container.label}>
          <Flex direction="column" gap="1">
            <Link
              className="text-sm font-medium"
              href={`/jobs?status=${container.status}`}
            >
              {container.label}
            </Link>
            <Text size="5" className="font-bold">
              {container.value}
            </Text>
          </Flex>
        </Card>
      ))}
    </Flex>
  );
};

export default JobSummary;
