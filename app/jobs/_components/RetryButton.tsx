"use client";

import { Job } from "@prisma/client";
import { Button } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const RetryButton = ({ jobId }: { jobId: number }) => {
  const router = useRouter();
  const [error, setError] = useState(false);
  const retryJob = async () => {
    try {
      await axios.patch("/api/jobs/" + jobId, {
        status: "QUEUED",
      });
      router.refresh();
    } catch (error) {
      setError(true);
    }
  };
  return (
    <Button color="green" onClick={retryJob}>
      Retry
    </Button>
  );
};

export default RetryButton;
