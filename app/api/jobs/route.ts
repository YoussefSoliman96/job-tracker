import { createJobSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

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
