import prisma from "@/prisma/client";
import Pagination from "./components/Pagination";
import JobSummary from "./JobSummary";
import LatestJobs from "./LatestJobs";

export default async function Home() {
  const queued = await prisma.job.count({ where: { status: "QUEUED" } });
  const running = await prisma.job.count({ where: { status: "RUNNING" } });
  const success = await prisma.job.count({ where: { status: "SUCCESS" } });
  const failed = await prisma.job.count({ where: { status: "FAILED" } });
  return (
    <JobSummary
      queued={queued}
      running={running}
      success={success}
      failed={failed}
    />
  );
}
