"use client";

import { Button, Callout, TextArea, TextField } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

interface JobForm {
  title: string;
  description: string;
}

const NewJobPage = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<JobForm>();
  const [error, setError] = useState("");
  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        className="space-y-3"
        onSubmit={handleSubmit(async (data) => {
          try {
            await axios.post("/api/jobs", data);
            router.push("/jobs");
          } catch (error) {
            setError("An unexpected error occurred");
          }
        })}
      >
        <TextField.Root placeholder="Title" {...register("title")} />
        <TextArea placeholder="Description" {...register("description")} />
        <Button>Submit New Job</Button>
      </form>
    </div>
  );
};

export default NewJobPage;
