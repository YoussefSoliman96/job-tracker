"use client";
import { Job } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

interface Props {
  job: Job;
}

const StatusSelect = ({ job }: Props) => {
  const router = useRouter();

  const changeStatus = (status: string) => {
    axios
      .patch("/api/jobs/" + job.id, {
        status,
      })
      .catch(() => {
        toast.error("Changes could not be saved");
      });
    router.push("/jobs/" + job.id);
    router.refresh();
  };

  return (
    <>
      <Select.Root
        defaultValue={job.status}
        onValueChange={(status) => changeStatus(status)}
      >
        <Select.Trigger placeholder="Status"></Select.Trigger>
        <Select.Content>
          <Select.Item value="QUEUED">Queued</Select.Item>
          <Select.Item value="RUNNING">Running</Select.Item>
          <Select.Item value="SUCCESS">Success</Select.Item>
          <Select.Item value="FAILED">Failed</Select.Item>
        </Select.Content>
      </Select.Root>
      <Toaster></Toaster>
    </>
  );
};

export default StatusSelect;
