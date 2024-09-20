import { JobStatusBadge } from "@/app/components";
import { Job } from "@prisma/client";
import { Box, Heading, Flex, Card, Text } from "@radix-ui/themes";

const JobDetails = ({ job }: { job: Job }) => {
  return (
    <Box>
      <Heading>{job.title}</Heading>
      <Flex gap="3" my="2" className="items-center">
        <JobStatusBadge status={job.status} />
        <Text>{job.createdAt.toDateString()}</Text>
      </Flex>
      <Card mt="4" className="max-w-md">
        <p>{job.description}</p>
      </Card>
    </Box>
  );
};

export default JobDetails;
