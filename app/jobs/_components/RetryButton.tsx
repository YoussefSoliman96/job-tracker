"use client";

import { Spinner } from "@/app/components";
import { Job } from "@prisma/client";
import { AlertDialog, Box, Button } from "@radix-ui/themes";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
  job: Job;
  size: "1" | "2" | "3" | "4";
}

const RetryButton = ({ job, size }: Props) => {
  const currentPath = usePathname();
  const router = useRouter();
  const [error, setError] = useState(false);
  const [isRetrying, setRetrying] = useState(false);

  console.log(currentPath);
  const retryJob = async () => {
    try {
      setRetrying(true);
      await axios.patch("/api/jobs/" + job.id, {
        status: "QUEUED",
      });
      router.push(currentPath);
      router.refresh();
    } catch (error) {
      setRetrying(false);
      setError(true);
    }
  };
  return (
    <>
      <Button
        color="green"
        onClick={retryJob}
        size={size}
        disabled={job.status !== "FAILED"}
      >
        Retry
      </Button>
      <AlertDialog.Root open={error}>
        <AlertDialog.Content>
          <AlertDialog.Title>Error</AlertDialog.Title>
          <AlertDialog.Description>
            Job could not be requeued
          </AlertDialog.Description>
          <Button
            color="gray"
            variant="soft"
            mt="2"
            onClick={() => setError(false)}
          >
            Ok
          </Button>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
};

export default RetryButton;
