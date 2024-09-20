import { Button, TextArea, TextField } from "@radix-ui/themes";
import React from "react";

const NewJobPage = () => {
  return (
    <div className="max-w-xl space-y-3">
      <TextField.Root placeholder="Title"></TextField.Root>
      <TextArea placeholder="Description" />
      <Button>Submit New Job</Button>
    </div>
  );
};

export default NewJobPage;
