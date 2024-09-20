import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import React from "react";

interface Props {
  params: { id: string };
}

const JobDetailPage = async ({ params }: Props) => {
  if (typeof params.id !== "number") notFound();

  const job = await prisma.job.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!job) notFound();

  return (
    <div>
      <p>{job.title}</p>
      <p>{job.description}</p>
      <p>{job.status}</p>
      <p>{job.createdAt.toDateString()}</p>
    </div>
  );
};

export default JobDetailPage;
