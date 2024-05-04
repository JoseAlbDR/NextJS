import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  console.log({ method: request.method });
  return NextResponse.json({ count: 100 });
}
