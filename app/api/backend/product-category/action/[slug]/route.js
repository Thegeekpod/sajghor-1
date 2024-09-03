import { PrismaClient } from '@prisma/client';
import { NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";

const prisma = new PrismaClient();

// Utility function to generate a slug from a string
const generateSlug = (str) => {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')  // Replace non-alphanumeric characters with hyphens
    .replace(/^-+|-+$/g, '');     // Trim leading and trailing hyphens
};

// Utility function to generate a unique slug
const generateUniqueSlug = async (baseSlug, excludeId) => {
  let slug = baseSlug;
  let count = 1;
  
  // Check if the slug exists in the database and modify if necessary
  while (await prisma.productCategory.findFirst({ where: { slug, NOT: { id: excludeId } } })) {
    slug = `${baseSlug}-${count}`;
    count += 1;
  }
  
  return slug;
};

// GET: Fetch a product category by ID
export async function GET(req) {
  try {
    const url = new URL(req.url);
    const id = url.pathname.split('/').pop();

    const category = await prisma.productCategory.findUnique({
      where: { id: Number(id) },
    });

    if (!category) {
      return new Response(JSON.stringify({ error: 'Category not found' }), { status: 404 });
    }

    return new Response(JSON.stringify(category), { status: 200 });
  } catch (error) {
    console.error("Error fetching product category:", error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}

// PUT: Update a product category by ID
export async function PUT(req) {
  try {
    const formData = await req.formData();

    // Extract the ID from the URL
    const url = new URL(req.url);
    const id = url.pathname.split('/').pop(); // Assumes ID is the last part of the URL

    const imageFile = formData.get("image");
    const category_name = formData.get("category_name");
    const category_description = formData.get("category_description");

    if (!id) {
      return new Response(JSON.stringify({ error: 'Missing category ID' }), { status: 400 });
    }

    // Find the existing category
    const existingCategory = await prisma.productCategory.findUnique({
      where: { id: Number(id) },
    });

    if (!existingCategory) {
      return new Response(JSON.stringify({ error: 'Category not found' }), { status: 404 });
    }

    // Prepare update data
    const updateData = {};
    
    // Update only the provided fields
    if (category_name) {
      updateData.category_name = category_name;
      const baseSlug = generateSlug(category_name);
      updateData.slug = await generateUniqueSlug(baseSlug, existingCategory.id);
    }
    
    if (category_description) {
      updateData.category_description = category_description;
    }
    
    if (imageFile) {
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      const filename = imageFile.name.replaceAll(" ", "_");
      const filePath = path.join(process.cwd(), "public/categoryimage", filename);
      await writeFile(filePath, buffer);
      updateData.image = `/categoryimage/${filename}`;
    } else {
      updateData.image = existingCategory.image; // Retain old image if no new image is provided
    }

    // Update the category with new data
    const updatedCategory = await prisma.productCategory.update({
      where: { id: Number(id) },
      data: updateData,
    });

    return new Response(JSON.stringify({ message: 'Category updated successfully', category: updatedCategory }), { status: 200 });
  } catch (error) {
    console.error("Error updating product category:", error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}

// DELETE: Delete a product category by ID
export async function DELETE(req) {
  try {
    const url = new URL(req.url);
    const id = url.pathname.split('/').pop();

    const existingCategory = await prisma.productCategory.findUnique({
      where: { id: Number(id) },
    });

    if (!existingCategory) {
      return new Response(JSON.stringify({ error: 'Category not found' }), { status: 404 });
    }

    await prisma.productCategory.delete({
      where: { id: Number(id) },
    });

    return new Response(JSON.stringify({ message: 'Category deleted successfully' }), { status: 200 });
  } catch (error) {
    console.error("Error deleting product category:", error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}
