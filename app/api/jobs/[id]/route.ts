import { jobSchema, retryJobSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const validation = retryJobSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(
      { error: validation.error.errors },
      { status: 400 }
    );

  const job = await prisma.job.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!job) return NextResponse.json({ error: "Invalid job" }, { status: 404 });

  const updatedJob = await prisma.job.update({
    where: {
      id: job.id,
    },
    data: {
      status: body.status,
    },
  });

  return NextResponse.json(updatedJob);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const job = await prisma.job.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!job) return NextResponse.json({ error: "Invalid job" }, { status: 404 });
  if (job.status === "RUNNING")
    return NextResponse.json({ error: "Cannot delete a running job" });
  if (job.status === "SUCCESS")
    return NextResponse.json({ error: "Cannot delete a finished job" });

  await prisma.job.delete({ where: { id: job.id } });

  return NextResponse.json({});
}
