import axios from 'axios';
import { NextResponse } from 'next/server';

export async function GET(req) {
  const SHOPIFY_SHOP_NAME = '71c29e-3'; // Your Shopify store name
  const SHOPIFY_ACCESS_TOKEN = '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'; // Hardcoded access token

  // Extract the date from the query parameters
  const { searchParams } = new URL(req.url);
  const specificDate = searchParams.get('date'); // Example: "2024-08-06"

  if (!specificDate) {
    return NextResponse.json({ error: "Date parameter is required" }, { status: 400 });
  }

  try {
    // Parse the specific date to handle timezone correctly
    const startOfDay = new Date(specificDate);
    const endOfDay = new Date(specificDate);

    // Set the time for the start and end of the day in local time
    startOfDay.setHours(0, 0, 0, 0);
    endOfDay.setHours(23, 59, 59, 999);

    // Convert to ISO format, considering the timezone offset (Shopify's default format includes offset)
    const createdAtMin = startOfDay.toISOString();
    const createdAtMax = endOfDay.toISOString();

    // Construct the Shopify API URL with the filtered date range
    const url = `https://${SHOPIFY_SHOP_NAME}.myshopify.com/admin/api/2023-01/orders.json?created_at_min=${createdAtMin}&created_at_max=${createdAtMax}&status=any`;

    const response = await axios.get(url, {
      headers: {
        'X-Shopify-Access-Token': SHOPIFY_ACCESS_TOKEN,
      },
    });

    // Send the response in the correct format using NextResponse.json
    return NextResponse.json(response.data.orders, { status: 200 });
  } catch (error) {
    console.error("Error fetching data from Shopify:", error);
    return NextResponse.json({ error: "Error fetching data from Shopify" }, { status: 500 });
  }
}
