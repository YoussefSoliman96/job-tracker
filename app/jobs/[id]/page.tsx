import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import JobDetails from "./JobDetails";
import { Box, Flex, Grid } from "@radix-ui/themes";
import DeleteJobButton from "./DeleteJobButton";
import { Metadata } from "next";
import { cache } from "react";
import StatusSelect from "./StatusSelect";

interface Props {
  params: { id: string };
}
const fetchUser = cache((jobId: number) =>
  prisma.job.findUnique({
    where: { id: jobId },
  })
);

const JobDetailPage = async ({ params }: Props) => {
  const job = await fetchUser(parseInt(params.id));

  if (!job) notFound();

  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="5">
      <Box className="md:col-span-4">
        <JobDetails job={job} />
      </Box>
      <Box>
        <Flex direction="column" gap="4">
          <StatusSelect job={job} />
          <DeleteJobButton jobId={job.id} jobStatus={job.status} size="2" />
        </Flex>
      </Box>
    </Grid>
  );
};

export async function generateMetadata({ params }: Props) {
  const job = await fetchUser(parseInt(params.id));

  return {
    title: job?.title,
    description: "Details of job" + job?.id,
  };
}

export default JobDetailPage;
