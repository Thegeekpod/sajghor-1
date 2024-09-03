import { PrismaClient } from '@prisma/client';
import nodemailer from 'nodemailer';
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const formData = await req.formData();

    const product_name = formData.get("product_name");
    const full_name = formData.get("full_name");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const message = formData.get("message");

    if (!product_name || !full_name || !email || !phone) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
    }

    // Create the new inquiry with the provided details
    const newInquiry = await prisma.productInquiry.create({
      data: {
        productName: product_name,
        fullName: full_name,
        email,
        phone,
        message,
      },
    });

    // Set up Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'Gmail', // or another email service
      auth: {
        user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_PASS, // Your email password or app-specific password
      },
    });

    // Email options to send to you
    const mailOptionsToAdmin = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL_USER,
      subject: 'New Product Inquiry Received',
      text: `You have a new product inquiry from ${full_name}.
      
Product: ${product_name}
Name: ${full_name}
Email: ${email}
Phone: ${phone}
Message: ${message}`,
    };

    // Email options to send to the user
    const mailOptionsToUser = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Thank you for your inquiry!',
      text: `Dear ${full_name},

Thank you for reaching out to us regarding the ${product_name}. We have received your inquiry and will contact you very soon.

Best regards,
Sajghor`,
    };

    // Send emails
    await transporter.sendMail(mailOptionsToAdmin); // Email to admin
    await transporter.sendMail(mailOptionsToUser); // Confirmation email to user

    return new Response(JSON.stringify(newInquiry), { status: 201 });
  } catch (error) {
    console.error("Error creating product inquiry:", error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}
