import prisma from "@/prisma/client";
import { Table } from "@radix-ui/themes";
import JobActions from "./JobActions";
import { JobStatusBadge, Link } from "@/app/components";
import { Job, Status } from "@prisma/client";
import NextLink from "next/link";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import { useSearchParams } from "next/navigation";
import Pagination from "@/app/components/Pagination";

const JobsPage = async ({
  searchParams,
}: {
  searchParams: { status: Status; orderBy: keyof Job; page: string };
}) => {
  const columns: { label: string; value: keyof Job; className?: string }[] = [
    { label: "Job", value: "title" },
    { label: "Status", value: "status", className: "hidden md:table-cell" },
    { label: "Created", value: "createdAt", className: "hidden md:table-cell" },
  ];
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const where = { status };

  const orderBy = columns
    .map((column) => column.value)
    .includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "asc" }
    : undefined;

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;
  const jobs = await prisma.job.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const jobCount = await prisma.job.count({ where });

  return (
    <div>
      <JobActions />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map((column) => (
              <Table.ColumnHeaderCell
                key={column.label}
                className={column.className}
              >
                <NextLink
                  href={{
                    query: { ...searchParams, orderBy: column.value },
                  }}
                >
                  {column.label}
                  {column.value === searchParams.orderBy && (
                    <ArrowUpIcon className="inline" />
                  )}
                </NextLink>
              </Table.ColumnHeaderCell>
            ))}
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
      <Pagination pageSize={pageSize} currentPage={page} itemCount={jobCount} />
    </div>
  );
};

export const dynamic = "force-dynamic";

export default JobsPage;
