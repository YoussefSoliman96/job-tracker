import prisma from "@/prisma/client";
import JobSummary from "./JobSummary";
import JobChart from "./JobChart";
import { Flex, Grid } from "@radix-ui/themes";
import LatestJobs from "./LatestJobs";
import { Metadata } from "next";

export default async function Home() {
  const queued = await prisma.job.count({ where: { status: "QUEUED" } });
  const running = await prisma.job.count({ where: { status: "RUNNING" } });
  const success = await prisma.job.count({ where: { status: "SUCCESS" } });
  const failed = await prisma.job.count({ where: { status: "FAILED" } });
  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Flex direction="column" gap="5">
        <JobSummary
          queued={queued}
          running={running}
          success={success}
          failed={failed}
        />
        <JobChart
          queued={queued}
          running={running}
          success={success}
          failed={failed}
        />
      </Flex>
      <LatestJobs />
    </Grid>
  );
}

export const metadata: Metadata = {
  title: "Job Tracker - Dashboard",
  description: "View a summary of jobs",
};
