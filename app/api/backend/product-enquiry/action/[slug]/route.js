import { PrismaClient } from '@prisma/client';
import { NextResponse } from "next/server";

const prisma = new PrismaClient();



// DELETE: Delete a NewCollection by ID
export async function DELETE(req) {
  try {
    const url = new URL(req.url);
    const id = url.pathname.split('/').pop(); // Extracting the ID from the URL

    const existingCollection = await prisma.productInquiry.findUnique({
      where: { id: Number(id) },
    });

    if (!existingCollection) {
      return new Response(JSON.stringify({ error: 'Collection not found' }), { status: 404 });
    }

    // Delete the collection
    await prisma.productInquiry.delete({
      where: { id: Number(id) },
    });

    return new Response(JSON.stringify({ message: 'Collection deleted successfully' }), { status: 200 });
  } catch (error) {
    console.error("Error deleting collection:", error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}
