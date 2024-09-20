"use client";

import { Button, TextArea, TextField } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";

interface JobForm {
  title: string;
  description: string;
}

const NewJobPage = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<JobForm>();
  return (
    <form
      className="max-w-xl space-y-3"
      onSubmit={handleSubmit(async (data) => {
        await axios.post("/api/jobs", data);
        router.push("/jobs");
      })}
    >
      <TextField.Root placeholder="Title" {...register("title")} />
      <TextArea placeholder="Description" {...register("description")} />
      <Button>Submit New Job</Button>
    </form>
  );
};

export default NewJobPage;
