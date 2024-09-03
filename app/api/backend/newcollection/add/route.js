import { PrismaClient } from '@prisma/client';
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const formData = await req.formData();
    const youtubeLink = formData.get("youtube_link");
    const facebookLink = formData.get("facebook_link");

    // Validate that exactly one of the links is provided
    if (!youtubeLink && !facebookLink) {
      return new Response(JSON.stringify({ error: 'Either YouTube or Facebook link is required' }), { status: 400 });
    }
    if (youtubeLink && facebookLink) {
      return new Response(JSON.stringify({ error: 'Provide only one link at a time: either YouTube or Facebook' }), { status: 400 });
    }

    // Validate that the provided link is a valid URL
    const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    if ((youtubeLink && !urlPattern.test(youtubeLink)) || (facebookLink && !urlPattern.test(facebookLink))) {
      return new Response(JSON.stringify({ error: 'Invalid URL format' }), { status: 400 });
    }

    // Prepare the data object for creation
    const data = {
      youtube_link: youtubeLink || null,
      facebook_link: facebookLink || null,
      created_at: new Date(), // Optional if @default(now()) is set in the Prisma schema
    };

    // Create the new collection in the database
    const newCollection = await prisma.newCollection.create({
      data,
    });

    return new Response(JSON.stringify({ success: true, message: 'New collection added successfully', data: newCollection }), { status: 201 });

  } catch (error) {
    console.error("Error creating new collection:", error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}
