import prisma from '@/lib/prisma';
import { NextResponse, NextRequest } from 'next/server';
import bcrypt from 'bcryptjs';

export async function GET(request: Request) {
  await prisma.todo.deleteMany();
  await prisma.user.deleteMany();

  const user = await prisma.user.create({
    data: {
      email: 'elsa@prisma.io',
      password: bcrypt.hashSync('password', 10),
      roles: ['admin', 'client'],
      todos: {
        create: [
          {
            description: 'Piedra del alma',
            complete: true,
          },
          {
            description: 'Piedra del poder',
          },
          {
            description: 'Piedra del espacio',
          },
          {
            description: 'Piedra del tiempo',
          },
          {
            description: 'Piedra del realidad',
          },
        ],
      },
    },
  });

  // await prisma.todo.createMany({
  //   data: [
  //     {
  //       description: 'Piedra del alma',
  //       complete: true,
  //       createdBy: user.id,
  //     },
  //     {
  //       description: 'Piedra del poder',
  //       createdBy: user.id,
  //     },
  //     {
  //       description: 'Piedra del espacio',
  //       createdBy: user.id,
  //     },
  //     {
  //       description: 'Piedra del tiempo',
  //       createdBy: user.id,
  //     },
  //     {
  //       description: 'Piedra del realidad',
  //       createdBy: user.id,
  //     },
  //   ],
  // });

  return NextResponse.json({ message: 'Seed executed' });
}
