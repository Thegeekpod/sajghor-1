import { PrismaClient } from '@prisma/client';
import path from "path";
import { unlink } from "fs/promises";

const prisma = new PrismaClient();

export async function DELETE(req, { params }) {
  try {
    const { id } = params; // Extract the ID from the route parameters

    // Find the existing product image
    const existingImage = await prisma.productImage.findUnique({
      where: { id: Number(id) },
    });

    if (!existingImage) {
      return new Response(JSON.stringify({ error: 'Product image not found' }), { status: 404 });
    }

    // Delete the image file from the file system
    const filePath = path.join(process.cwd(), "public", existingImage.image_path);
    await unlink(filePath);

    // Delete the image record from the database
    await prisma.productImage.delete({
      where: { id: Number(id) },
    });

    // Get the remaining images for the product
    const remainingImages = await prisma.productImage.findMany({
      where: { product_id: existingImage.product_id },
      orderBy: { id: 'asc' }, // Order by ID or any other criteria
    });

    // Update the product's image column with the first image in the remaining list
    const newPrimaryImage = remainingImages.length > 0 ? remainingImages[0].image_path : '';

    await prisma.product.update({
      where: { id: existingImage.product_id },
      data: { image: newPrimaryImage },
    });

    return new Response(JSON.stringify({ message: 'Product image deleted successfully and primary image updated' }), { status: 200 });
  } catch (error) {
    console.error("Error deleting product image:", error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}
