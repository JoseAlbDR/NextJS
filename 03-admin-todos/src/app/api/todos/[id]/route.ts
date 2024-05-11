import prisma from '@/app/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  segments: { params: { id: string } }
) {
  const { id } = segments.params;

  const todo = await prisma.todo.findUnique({ where: { id } });

  if (!todo)
    return NextResponse.json({ message: 'Todo not found', status: 404 });

  return NextResponse.json({ todo });
}
