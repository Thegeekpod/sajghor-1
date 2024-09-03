import { PrismaClient } from '@prisma/client';
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req) {
  try {
    const categories = await prisma.productCategory.findMany(
     { orderBy: {
        id: 'desc',
      },}
    );
    return new Response(JSON.stringify(categories), { status: 200 });
  } catch (error) {
    console.error("Error retrieving product categories:", error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}
