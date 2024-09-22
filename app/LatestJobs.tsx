import prisma from "@/prisma/client";
import { Card, Flex, Heading, Table } from "@radix-ui/themes";
import React from "react";
import { JobStatusBadge } from "./components";
import Link from "next/link";

const LatestJobs = async () => {
  const jobs = await prisma.job.findMany({
    orderBy: { createdAt: "desc" },
    take: 10,
  });
  return (
    <Card>
      <Heading size="4" mb="5">
        Lates Jobs
      </Heading>
      <Table.Root>
        <Table.Body>
          {jobs.map((job) => (
            <Table.Row key={job.id}>
              <Table.Cell>
                <Flex direction="column" align="start" gap="2">
                  <Link href={`/jobs/${job.id}`}>{job.title}</Link>
                  <JobStatusBadge status={job.status} />
                </Flex>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Card>
  );
};

export default LatestJobs;
