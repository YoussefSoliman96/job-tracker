import JobStatusBadge from "@/app/components/JobStatusBadge";
import prisma from "@/prisma/client";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import React from "react";

interface Props {
  params: { id: string };
}

const JobDetailPage = async ({ params }: Props) => {
  const job = await prisma.job.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!job) notFound();

  return (
    <div>
      <Heading>{job.title}</Heading>
      <Flex gap="3" my="2">
        <JobStatusBadge status={job.status} />
        <Text>{job.createdAt.toDateString()}</Text>
      </Flex>
      <Card>
        <p>{job.description}</p>
      </Card>
    </div>
  );
};

export default JobDetailPage;
