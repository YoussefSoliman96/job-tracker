"use client";

import { createJobSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Callout, Text, TextArea, TextField } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type JobForm = z.infer<typeof createJobSchema>;

const NewJobPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<JobForm>({
    resolver: zodResolver(createJobSchema),
  });
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
        {errors.title && (
          <Text color="red" as="p">
            {errors.title.message}
          </Text>
        )}
        <TextArea placeholder="Description" {...register("description")} />
        {errors.description && (
          <Text color="red" as="p">
            {errors.description.message}
          </Text>
        )}
        <Button>Submit New Job</Button>
      </form>
    </div>
  );
};

export default NewJobPage;
