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
  while (await prisma.product.findUnique({ where: { slug } })) {
    slug = `${baseSlug}-${count}`;
    count += 1;
  }

  return slug;
};

export async function POST(req) {
  try {
    const formData = await req.formData();

    const imageFiles = formData.getAll("images"); // Use getAll to retrieve multiple images
    const name = formData.get("name");
    const category_id = formData.get("category_id");
    const description = formData.get("description");
    const offer = formData.get("offer");
    const status = formData.get("status");
    const price = formData.get("price");

    // Debugging: Log received form data to check what's missing
    console.log("Received form data:");
    console.log("Images:", imageFiles);
    console.log("Name:", name);
    console.log("Category ID:", category_id);
    console.log("Description:", description);
    console.log("Offer:", offer);
    console.log("Status:", status);

    // Validate required fields
    if (!imageFiles.length || !name || !category_id) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
    }

    // Validate file types (only allow images)
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    for (const imageFile of imageFiles) {
      if (!allowedTypes.includes(imageFile.type)) {
        return new Response(JSON.stringify({ error: 'Invalid file type' }), { status: 400 });
      }
    }

    // Generate a slug based on the product name
    const baseSlug = generateSlug(name);
    const slug = await generateUniqueSlug(baseSlug);

    // Create the new product without images initially
    const newProduct = await prisma.product.create({
      data: {
        name,
        category_id: parseInt(category_id, 10),
        image: '', // Placeholder for primary image, will be updated later
        description,
        offer,
        status: status || "ACTIVE", // Default to ACTIVE if not provided
        slug,
        price,
      },
    });

    // Store multiple images for the new product
    const productImages = [];
    for (const imageFile of imageFiles) {
      // Convert the file data to a Buffer
      const buffer = Buffer.from(await imageFile.arrayBuffer());

      // Generate a unique filename using a timestamp and a random number
      const uniqueFilename = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(imageFile.name)}`;
      const filePath = path.join(process.cwd(), "public/productimages", uniqueFilename);

      // Write the file to the specified directory (public/productimages)
      await writeFile(filePath, buffer);

      // Store the relative path to the image in the ProductImage model
      const newImage = await prisma.productImage.create({
        data: {
          product_id: newProduct.id,
          image_path: `/productimages/${uniqueFilename}`,
          alt_text: name, // Optional, can be customized
        },
      });

      productImages.push(newImage);
    }

    // Update the product with the first image as the primary image
    if (productImages.length > 0) {
      await prisma.product.update({
        where: { id: newProduct.id },
        data: { image: productImages[0].image_path },
      });
    }

    return new Response(JSON.stringify({ success: true, message: 'Product added successfully with images' }), { status: 201 });

  } catch (error) {
    console.error("Error creating product with images:", error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}
