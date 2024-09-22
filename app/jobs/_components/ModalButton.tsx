"use client";

import React, { startTransition, useEffect, useState } from "react";
import { ExternalLinkIcon } from "@radix-ui/react-icons";
import { AlertDialog, Button, Spinner, Flex, Box } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import prisma from "@/prisma/client";
import { Job, Status } from "@prisma/client";
import { get } from "http";

const ModalButton = ({ job }: { job: Job }) => {
  const router = useRouter();
  const [error, setError] = useState(false);
  const [isDeleting, setDeleting] = useState(false);
  const deleteJob = async () => {
    try {
      await axios.delete("/api/jobs/" + job.id);
      router.refresh();
    } catch (error) {
      setDeleting(false);
      setError(true);
    }
  };
  const retryJob = async () => {
    try {
      await axios.patch("/api/jobs/" + job.id, {
        status: "QUEUED",
      });
      router.refresh();
    } catch (error) {
      setError(true);
    }
  };

  return (
    <Box>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button variant="ghost" disabled={isDeleting}>
            <ExternalLinkIcon />
            {isDeleting && <Spinner />}
          </Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content>
          <AlertDialog.Title>{job.title}</AlertDialog.Title>
          <AlertDialog.Description>{job.description}</AlertDialog.Description>
          <Flex mt="4" gap="3" justify="between">
            <AlertDialog.Cancel>
              <Button color="gray" variant="soft">
                Cancel
              </Button>
            </AlertDialog.Cancel>
            {job.status === "FAILED" && (
              <Flex gap="2">
                <Box>
                  <AlertDialog.Action>
                    <Button color="red" onClick={deleteJob}>
                      Delete Job
                    </Button>
                  </AlertDialog.Action>
                </Box>
                <Box>
                  <Button color="green" onClick={retryJob}>
                    Retry
                  </Button>
                </Box>
              </Flex>
            )}
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
      <AlertDialog.Root open={error}>
        <AlertDialog.Content>
          <AlertDialog.Title>Error</AlertDialog.Title>
          <AlertDialog.Description>
            Process could not be completed
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
    </Box>
  );
};

export default ModalButton;
