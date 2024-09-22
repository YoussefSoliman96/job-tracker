"use client";
import { Job, Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, useTransition } from "react";
import toast from "react-hot-toast";

interface Props {
  job: Job;
}

const StatusSelect = ({ job }: Props) => {
  const [status, setStatus] = useState<Status>(job.status);
  const [isTransitionStarted, startTransition] = useTransition();
  const router = useRouter();

  const changeStatus = (issueStatus: Status) => {
    axios
      .patch("/api/jobs/" + job.id, {
        status: issueStatus,
      })
      .catch(() => {
        toast.error("Changes could not be saved");
      });
    setStatus(issueStatus);
    startTransition(router.refresh);
  };
  useEffect(() => {
    const fetchStatus = async () => {
      const { data } = await axios.get(`/api/jobs/${job.id}`);
      setStatus(data.status);
    };
    fetchStatus();
  }, [status]);
  return (
    <Select.Root defaultValue={job.status} onValueChange={changeStatus}>
      <Select.Trigger placeholder="Status"></Select.Trigger>
      <Select.Content>
        <Select.Item value="QUEUED">Queued</Select.Item>
        <Select.Item value="RUNNING">Running</Select.Item>
        <Select.Item value="SUCCESS">Success</Select.Item>
        <Select.Item value="FAILED">Failed</Select.Item>
      </Select.Content>
    </Select.Root>
  );
};

export default StatusSelect;
