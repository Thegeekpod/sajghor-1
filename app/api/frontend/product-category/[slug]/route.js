import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(req) {
    try {
        const url = new URL(req.url);
        const slug = url.pathname.split('/').pop();

        const category = await prisma.productCategory.findUnique({
            where: { slug },
            include: {
                products: {
                    where: {
                        status: 'ACTIVE'  // Filter by status for products
                    },
                    orderBy: {
                        id: 'desc',
                      },
                }
            }
        });

        if (!category) {
            return new Response(JSON.stringify({ error: 'Category not found' }), { status: 404 });
        }

        return new Response(JSON.stringify(category), { status: 200 });
    } catch (error) {
        console.error('Error fetching product category:', error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
}
