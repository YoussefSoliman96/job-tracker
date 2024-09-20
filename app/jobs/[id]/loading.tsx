import Skeleton from "@/app/components/Skeleton";
import { Box, Card, Flex } from "@radix-ui/themes";

const LoadingJobDetailPage = () => {
  return (
    <Box className="max-w-xl">
      <Skeleton />

      <Flex gap="3" my="2" className="items-center">
        <Skeleton width="5rem" />
        <Skeleton width="8rem" />
      </Flex>
      <Card mt="4" className="max-w-md">
        <Skeleton count={3} />
      </Card>
    </Box>
  );
};

export default LoadingJobDetailPage;
