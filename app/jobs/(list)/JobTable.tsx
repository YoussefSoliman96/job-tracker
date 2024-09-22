import { Table } from "@radix-ui/themes";
import React from "react";
import NextLink from "next/link";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import { JobStatusBadge, Link } from "@/app/components";

import { Job, Status } from "@prisma/client";
import StatusSelect from "../[id]/StatusSelect";

export interface JobQuery {
  status: Status;
  orderBy: keyof Job;
  page: string;
}

interface Props {
  searchParams: JobQuery;
  jobs: Job[];
}

const JobTable = ({ searchParams, jobs }: Props) => {
  return (
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
          {/* <Table.ColumnHeaderCell>Actions</Table.ColumnHeaderCell> */}
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
            {/* <Table.Cell className="hidden md:table-cell">
              <StatusSelect job={job} />
            </Table.Cell> */}
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

const columns: { label: string; value: keyof Job; className?: string }[] = [
  { label: "Job", value: "title" },
  { label: "Status", value: "status", className: "hidden md:table-cell" },
  { label: "Created", value: "createdAt", className: "hidden md:table-cell" },
];

export const columnNames = columns.map((column) => column.value);

export default JobTable;
