"use client";

import { Card } from "@radix-ui/themes";
import {
  ResponsiveContainer,
  BarChart,
  Tooltip,
  XAxis,
  YAxis,
  Bar,
} from "recharts";

interface Props {
  queued: number;
  running: number;
  success: number;
  failed: number;
}

const JobChart = ({ queued, running, success, failed }: Props) => {
  const data = [
    { label: "Queued", value: queued },
    { label: "running", value: running },
    { label: "success", value: success },
    { label: "failed", value: failed },
  ];
  return (
    <Card>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="label" />
          <YAxis />
          <Bar
            dataKey="value"
            barSize={60}
            style={{ fill: "var(--accent-9)" }}
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default JobChart;
