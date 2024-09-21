import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const job = await prisma.job.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!job) return NextResponse.json({ error: "Invalid job" }, { status: 404 });

  await prisma.job.delete({ where: { id: job.id } });

  return NextResponse.json({});
}
