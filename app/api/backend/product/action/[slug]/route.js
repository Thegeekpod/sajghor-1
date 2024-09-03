import { PrismaClient } from '@prisma/client';
import { NextResponse } from "next/server";
import path from "path";
import { writeFile,mkdir  } from "fs/promises";

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
  while (await prisma.product.findFirst({ where: { slug, NOT: { id: excludeId } } })) {
    slug = `${baseSlug}-${count}`;
    count += 1;
  }

  return slug;
};

// GET: Fetch a product by ID
export async function GET(req) {
  try {
    const url = new URL(req.url);
    const id = url.pathname.split('/').pop();

    const product = await prisma.product.findUnique({
      where: { id: Number(id) },
      include: {
        category: true,
        images:true // Include related category data
      }
    });

    if (!product) {
      return new Response(JSON.stringify({ error: 'Product not found' }), { status: 404 });
    }

    return new Response(JSON.stringify(product), { status: 200 });
  } catch (error) {
    console.error("Error fetching product:", error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}

// PUT: Update a product by ID
export async function PUT(req) {
  try {
    const formData = await req.formData();
    const url = new URL(req.url);
    const id = url.pathname.split('/').pop();

    const imageFiles = formData.getAll("images"); // Use getAll to retrieve multiple images
    const name = formData.get("name");
    const category_id = formData.get("category_id");
    const description = formData.get("description");
    const offer = formData.get("offer");
    const status = formData.get("status");
    const price = formData.get("price");

    if (!id) {
      return new Response(JSON.stringify({ error: 'Missing product ID' }), { status: 400 });
    }

    // Find the existing product
    const existingProduct = await prisma.product.findUnique({
      where: { id: Number(id) },
    });

    if (!existingProduct) {
      return new Response(JSON.stringify({ error: 'Product not found' }), { status: 404 });
    }

    // Prepare update data
    const updateData = {};

    if (name) {
      updateData.name = name;
      const baseSlug = generateSlug(name);
      updateData.slug = await generateUniqueSlug(baseSlug);
    }

    if (description) {
      updateData.description = description;
    }

    if (offer) {
      updateData.offer = offer;
    }
    if (price) {
      updateData.price = price;
    }
    if (status) {
      updateData.status = status;
    }

    if (category_id) {
      updateData.category_id = Number(category_id);
    }

    // Handle new image files if provided
    if (imageFiles.length > 0) {
      const productImages = [];
      for (const imageFile of imageFiles) {
        const buffer = Buffer.from(await imageFile.arrayBuffer());
        const uniqueFilename = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(imageFile.name)}`;
        const filePath = path.join(process.cwd(), "public/productimages", uniqueFilename);
        await writeFile(filePath, buffer);

        const newImage = await prisma.productImage.create({
          data: {
            product_id: existingProduct.id,
            image_path: `/productimages/${uniqueFilename}`,
            alt_text: name, // Optional, can be customized
          },
        });

        productImages.push(newImage);
      }

      // Update the primary image if new images were added
      if (productImages.length > 0) {
        updateData.image = productImages[0].image_path;
      }
    }

    // Update the product with new data
    const updatedProduct = await prisma.product.update({
      where: { id: Number(id) },
      data: updateData,
    });

    return new Response(JSON.stringify({ message: 'Product updated successfully', product: updatedProduct }), { status: 200 });
  } catch (error) {
    console.error("Error updating product:", error);
    return new Response(JSON.stringify({ error: 'Internal Server Error', details: error.message }), { status: 500 });
  }
}



// DELETE: Delete a product by ID
export async function DELETE(req) {
  try {
    const url = new URL(req.url);
    const id = url.pathname.split('/').pop();

    const existingProduct = await prisma.product.findUnique({
      where: { id: Number(id) },
    });

    if (!existingProduct) {
      return new Response(JSON.stringify({ error: 'Product not found' }), { status: 404 });
    }

    // Delete associated images from the file system and database
    const productImages = await prisma.productImage.findMany({
      where: { product_id: Number(id) },
    });

    for (const image of productImages) {
      const filePath = path.join(process.cwd(), "public", image.image_path);
      try {
        await unlink(filePath); // Delete the image file from the file system
      } catch (err) {
        console.error("Error deleting image file:", err);
      }

      await prisma.productImage.delete({
        where: { id: image.id },
      });
    }

    // Delete the product
    await prisma.product.delete({
      where: { id: Number(id) },
    });

    return new Response(JSON.stringify({ message: 'Product and associated images deleted successfully' }), { status: 200 });
  } catch (error) {
    console.error("Error deleting product:", error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}

