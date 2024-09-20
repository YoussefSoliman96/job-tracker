import { Box } from "@radix-ui/themes";
import React from "react";
import Skeleton from "@/app/components/Skeleton";

const LoadingNewJobPage = () => {
  return (
    <Box className="max-w-xl">
      <Skeleton width="36rem" height="2rem" />
      <Skeleton height="7rem" />
    </Box>
  );
};

export default LoadingNewJobPage;
