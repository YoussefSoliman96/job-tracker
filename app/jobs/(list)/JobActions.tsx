import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import JobStatusFilter from "./JobStatusFilter";

const JobActions = () => {
  return (
    <Flex justify="between">
      <JobStatusFilter />
      <Button>
        <Link href="/jobs/new">Add Job</Link>
      </Button>
    </Flex>
  );
};

export default JobActions;
