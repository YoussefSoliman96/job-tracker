import Pagination from "@/app/components/Pagination";
import prisma from "@/prisma/client";
import { Status } from "@prisma/client";
import JobActions from "./JobActions";
import JobTable, { columnNames, JobQuery } from "./JobTable";
import { Flex } from "@radix-ui/themes";
import { Metadata } from "next";

interface Props {
  searchParams: JobQuery;
}

const JobsPage = async ({ searchParams }: Props) => {
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const where = { status };

  const orderBy = columnNames.includes(searchParams.orderBy)
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
    <Flex direction="column" gap="3">
      <JobActions />
      <JobTable searchParams={searchParams} jobs={jobs} />
      <Pagination pageSize={pageSize} currentPage={page} itemCount={jobCount} />
    </Flex>
  );
};

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Job Tracker - Job list",
  description: "View all jobs",
};

export default JobsPage;
