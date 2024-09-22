import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import JobDetails from "./JobDetails";
import { Box, Flex, Grid } from "@radix-ui/themes";
import DeleteJobButton from "./DeleteJobButton";
import { Metadata } from "next";

interface Props {
  params: { id: string };
}

const JobDetailPage = async ({ params }: Props) => {
  const job = await prisma.job.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!job) notFound();

  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="5">
      <Box className="md:col-span-4">
        <JobDetails job={job} />
      </Box>
      <Box>
        <Flex direction="column" gap="4">
          <DeleteJobButton jobId={job.id} />
        </Flex>
      </Box>
    </Grid>
  );
};

export async function generateMetadata({ params }: Props) {
  const job = await prisma.job.findUnique({
    where: { id: parseInt(params.id) },
  });
  return {
    title: job?.title,
    description: "Details of job" + job?.id,
  };
}

export default JobDetailPage;
