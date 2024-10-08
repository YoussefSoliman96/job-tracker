import { Box, Flex, Table } from "@radix-ui/themes";
import Skeleton from "../../components/Skeleton";
import JobActions from "./JobActions";

const LoadingJobsPage = () => {
  const jobs = [1, 2, 3, 4, 5, 6, 7];
  return (
    <Flex direction="column" gap="3">
      <JobActions />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Job</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Created
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {jobs.map((job) => (
            <Table.Row key={job}>
              <Table.Cell>
                <Skeleton />
                <Box className="block md:hidden">
                  <Skeleton />
                </Box>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <Skeleton />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <Skeleton />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Flex>
  );
};

export default LoadingJobsPage;
