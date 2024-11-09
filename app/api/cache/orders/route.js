import { NextResponse } from 'next/server';

// In-memory cache (you might want to use Redis or another solution in production)
let ordersCache = null;

export async function GET() {
  return NextResponse.json(ordersCache || { orders: [], totalCount: 0 });
}

export async function POST(request) {
  const data = await request.json();
  ordersCache = data;
  return NextResponse.json({ success: true });
} 