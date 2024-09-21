import prisma from "@/prisma/client";
import { Table } from "@radix-ui/themes";
import JobActions from "./JobActions";
import { JobStatusBadge, Link } from "@/app/components";
import { Status } from "@prisma/client";

const JobsPage = async ({
  searchParams,
}: {
  searchParams: { status: Status };
}) => {
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;
  const jobs = await prisma.job.findMany({
    where: {
      status,
    },
  });

  return (
    <div>
      <JobActions />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Job</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Created
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {jobs.map((job) => (
            <Table.Row key={job.id}>
              <Table.Cell>
                <Link href={`/jobs/${job.id}`}>{job.title}</Link>
                <div className="block md:hidden">
                  <JobStatusBadge status={job.status} />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <JobStatusBadge status={job.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {job.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export const dynamic = "force-dynamic";

export default JobsPage;
