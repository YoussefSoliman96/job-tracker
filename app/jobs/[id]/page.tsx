import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import JobDetails from "./JobDetails";

interface Props {
  params: { id: string };
}

const JobDetailPage = async ({ params }: Props) => {
  const job = await prisma.job.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!job) notFound();

  return <JobDetails job={job} />;
};

export default JobDetailPage;
