import { connectDB } from '@/lib/db';
import Product from '@/models/product';

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();

    // Validate required fields (optional)
    if (
      !body.price ||
      !body.expenses ||
      !body.category ||
      !body.images ||
      body.images.length === 0
    ) {
      return new Response(
        JSON.stringify({ success: false, error: "Missing required fields" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const productData = {
      ...body,
       
      colors: Array.isArray(body.colors) ? body.colors.join(",") : body.colors,
      sizes: Array.isArray(body.sizes) ? body.sizes.join(",") : body.sizes,
      expenses: parseFloat(body.expenses),
      price: parseFloat(body.price),
      images: body.images.filter((url) => url !== ""),
    };

    const product = await Product.create(productData);

    return new Response(JSON.stringify({ success: true, data: product }), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
        errors: error.errors
          ? Object.values(error.errors).map((e) => e.message)
          : [],
      }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
