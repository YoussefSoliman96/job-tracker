import prisma from "@/prisma/client";
import { Card, Flex, Heading, Table } from "@radix-ui/themes";
import Link from "next/link";
import { JobStatusBadge } from "./components";
import DeleteJobButton from "./jobs/[id]/DeleteJobButton";
import ModalButton from "./jobs/_components/ModalButton";
import RetryButton from "./jobs/_components/RetryButton";

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
                <Flex justify="between">
                  <Flex direction="column" align="start" gap="2">
                    <Link href={`/jobs/${job.id}`}>{job.title}</Link>
                    <JobStatusBadge status={job.status} />
                  </Flex>
                  <Flex gap="3" className="items-center">
                    <ModalButton job={job} />

                    <DeleteJobButton
                      jobId={job.id}
                      size="1"
                      jobStatus={job.status}
                    />

                    <RetryButton job={job} size="1" />
                  </Flex>
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
