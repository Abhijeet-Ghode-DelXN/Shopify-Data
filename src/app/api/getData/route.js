import axios from 'axios';
import { NextResponse } from 'next/server';

export async function GET(req) {
  const SHOPIFY_SHOP_NAME = '71c29e-3'; // Your Shopify store name
  const SHOPIFY_ACCESS_TOKEN = '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'; // Hardcoded access token

  // Extract the date from the query parameters
  const { searchParams } = new URL(req.url);
  const specificDate = searchParams.get('date'); // Example: "2024-07-14"

  if (!specificDate) {
    return NextResponse.json({ error: "Date parameter is required" }, { status: 400 });
  }

  try {
    // Parse the specific date (assumed to be in the store's local time)
    const date = new Date(specificDate);

    // Manually adjust to the store's local time zone (assuming IST, UTC+5:30 here)
    const storeOffsetInMinutes = 5 * 60 + 30; // Offset for IST (UTC +5:30)

    // Set the start and end of the day in local time (store time zone)
    const startOfDayLocal = new Date(date);
    const endOfDayLocal = new Date(date);

    startOfDayLocal.setHours(0, 0, 0, 0); // Start at 00:00:00
    endOfDayLocal.setHours(23, 59, 59, 999); // End at 23:59:59

    // Convert start and end of the day to UTC by subtracting the store offset
    const startOfDayUTC = new Date(startOfDayLocal.getTime() - storeOffsetInMinutes * 60000);
    const endOfDayUTC = new Date(endOfDayLocal.getTime() - storeOffsetInMinutes * 60000);

    // Convert to ISO format in UTC for Shopify API
    const createdAtMin = startOfDayUTC.toISOString();
    const createdAtMax = endOfDayUTC.toISOString();

    // Construct the Shopify API URL with the filtered date range in UTC
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
