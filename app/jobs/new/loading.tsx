import { Box } from "@radix-ui/themes";
import React from "react";
import Skeleton from "@/app/components/Skeleton";

const LoadingNewJobPage = () => {
  return (
    <Box>
      <Skeleton />
      <Skeleton height="20rem" />
    </Box>
  );
};

export default LoadingNewJobPage;
