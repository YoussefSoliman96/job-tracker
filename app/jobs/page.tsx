import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const JobsPage = () => {
  return (
    <Button>
      <Link href="/jobs/new">Add Job</Link>
    </Button>
  );
};

export default JobsPage;
