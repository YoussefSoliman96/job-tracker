import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const createJobSchema = z.object({
  title: z.string().min(1, "Title is required").max(255),
  description: z.string().min(1, "Description is required"),
});

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = createJobSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(
      { error: validation.error.errors },
      { status: 400 }
    );

  const newJob = await prisma.job.create({
    data: {
      title: body.title,
      description: body.description,
    },
  });

  return NextResponse.json(newJob, { status: 201 });
}
