import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(req) {
    try {
        const url = new URL(req.url);
        const slug = url.pathname.split('/').pop();

        const product = await prisma.product.findFirst({
            where: {
                slug: slug,
                status: 'ACTIVE' // Filter by both slug and status
            },
            include: {
                images: true, // Include the related category data
              },
        });

        if (!product) {
            return new Response(JSON.stringify({ error: 'Product not found' }), { status: 404 });
        }

        return new Response(JSON.stringify(product), { status: 200 });
    } catch (error) {
        console.error('Error fetching product:', error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
}
