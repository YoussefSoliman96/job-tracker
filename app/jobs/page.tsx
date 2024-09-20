import prisma from "@/prisma/client";
import { Button, Table } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const JobsPage = async () => {
  const jobs = await prisma.job.findMany();
  return (
    <div>
      <div className="mb-5">
        <Button>
          <Link href="/jobs/new">Add Job</Link>
        </Button>
      </div>
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
                {job.title}
                <div className="block md:hidden">{job.status}</div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {job.status}
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

export default JobsPage;
