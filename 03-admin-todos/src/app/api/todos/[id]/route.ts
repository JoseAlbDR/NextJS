import prisma from '@/app/lib/prisma';
import { NextResponse } from 'next/server';
import * as yup from 'yup';

export async function GET(
  request: Request,
  segments: { params: { id: string } }
) {
  const { id } = segments.params;

  const todo = await prisma.todo.findUnique({ where: { id } });

  if (!todo)
    return NextResponse.json({ message: 'Todo not found' }, { status: 404 });

  return NextResponse.json(todo);
}

const putSchema = yup.object({
  description: yup.string().optional(),
  complete: yup.boolean().optional().default(false),
});

export async function PUT(
  request: Request,
  segments: { params: { id: string } }
) {
  const body = await request.json();
  console.log({ body });
  const { id } = segments.params;

  const todo = await prisma.todo.findUnique({ where: { id } });

  if (!todo)
    return NextResponse.json({ message: 'Todo not found' }, { status: 404 });

  try {
    const { description, complete } = await putSchema.validate(body);

    console.log({ description, complete });

    await prisma.todo.update({
      where: { id },
      data: { description, complete },
    });

    return NextResponse.json({ message: `Todo with id: ${id} updated.` });
  } catch (error) {
    console.log(error);
    return NextResponse.json(error, { status: 400 });
  }
}
