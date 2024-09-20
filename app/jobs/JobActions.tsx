import { Button } from "@radix-ui/themes";
import Link from "next/link";

const JobActions = () => {
  return (
    <div className="mb-5">
      <Button>
        <Link href="/jobs/new">Add Job</Link>
      </Button>
    </div>
  );
};

export default JobActions;
