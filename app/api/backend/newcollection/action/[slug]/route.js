import { PrismaClient } from '@prisma/client';
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// GET: Fetch a NewCollection by ID
export async function GET(req) {
  try {
    const url = new URL(req.url);
    const id = url.pathname.split('/').pop(); // Extracting the ID from the URL

    const collection = await prisma.newCollection.findUnique({
      where: { id: Number(id) },
    });

    if (!collection) {
      return new Response(JSON.stringify({ error: 'Collection not found' }), { status: 404 });
    }

    return new Response(JSON.stringify(collection), { status: 200 });
  } catch (error) {
    console.error("Error fetching collection:", error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}

// PUT: Update a NewCollection by ID
export async function PUT(req) {
  try {
    const formData = await req.formData(); // Read JSON data from the request
    const url = new URL(req.url);
    const id = url.pathname.split('/').pop(); // Extracting the ID from the URL

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

    // Prepare the data object for update
    const data = {
      youtube_link: youtubeLink || null,
      facebook_link: facebookLink || null,
    };

    // Update the collection in the database
    const updatedCollection = await prisma.newCollection.update({
      where: { id: Number(id) },
      data,
    });

    return new Response(JSON.stringify({ message: 'Collection updated successfully', collection: updatedCollection }), { status: 200 });
  } catch (error) {
    console.error("Error updating collection:", error);
    return new Response(JSON.stringify({ error: 'Internal Server Error', details: error.message }), { status: 500 });
  }
}

// DELETE: Delete a NewCollection by ID
export async function DELETE(req) {
  try {
    const url = new URL(req.url);
    const id = url.pathname.split('/').pop(); // Extracting the ID from the URL

    const existingCollection = await prisma.newCollection.findUnique({
      where: { id: Number(id) },
    });

    if (!existingCollection) {
      return new Response(JSON.stringify({ error: 'Collection not found' }), { status: 404 });
    }

    // Delete the collection
    await prisma.newCollection.delete({
      where: { id: Number(id) },
    });

    return new Response(JSON.stringify({ message: 'Collection deleted successfully' }), { status: 200 });
  } catch (error) {
    console.error("Error deleting collection:", error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}
