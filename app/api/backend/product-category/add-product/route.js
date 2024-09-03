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
const generateUniqueSlug = async (baseSlug) => {
  let slug = baseSlug;
  let count = 1;
  
  // Check if the slug exists in the database and modify if necessary
  while (await prisma.productCategory.findUnique({ where: { slug } })) {
    slug = `${baseSlug}-${count}`;
    count += 1;
  }
  
  return slug;
};

export async function POST(req) {
  try {
    const formData = await req.formData();
    
    const imageFile = formData.get("image");
    const category_name = formData.get("category_name");
    const category_description = formData.get("category_description");
    
    if (!imageFile || !category_name) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
    }

    // Convert the file data to a Buffer
    const buffer = Buffer.from(await imageFile.arrayBuffer());

    // Replace spaces in the file name with underscores
    const filename = imageFile.name.replaceAll(" ", "_");
    const filePath = path.join(process.cwd(), "public/categoryimage", filename);

    // Write the file to the specified directory (public/categoryimage)
    await writeFile(filePath, buffer);

    // Generate a slug based on the category name
    const baseSlug = generateSlug(category_name);
    const slug = await generateUniqueSlug(baseSlug);

    // Create the new category with the image path and generated slug
    const newCategory = await prisma.productCategory.create({
      data: {
        image: `/categoryimage/${filename}`, // Store the relative path to the image
        category_name,
        category_description,
        slug,
      },
    });

    return new Response(JSON.stringify(newCategory), { status: 201 });
  } catch (error) {
    console.error("Error creating product category:", error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}
