// pages/api/getData/route.js
import axios from 'axios';
import { NextResponse } from 'next/server';

export async function GET(req) {
  const SHOPIFY_SHOP_NAME = '71c29e-3'; // Your Shopify store name
  const SHOPIFY_ACCESS_TOKEN = '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'; // Hardcoded access token

  const specificDate = "2024-12-04";
//   const specificDate = "2024-12-01"; // Example date
// const specificDate = "2024-12-01"; // Example date
const url = `https://${SHOPIFY_SHOP_NAME}.myshopify.com/admin/api/2023-01/orders.json?created_at_min=${specificDate}T00:00:00&created_at_max=${specificDate}T23:59:59&status=any`;
    
  try {
    const response = await axios.get(url, {
      headers: {
        'X-Shopify-Access-Token': SHOPIFY_ACCESS_TOKEN,
      },
    });

    // Send the response in the correct format using NextResponse.json
    return NextResponse.json(response.data.orders, { status: 200 });
  } catch (error) {
    // Handle errors and return an appropriate error message
    return NextResponse.json({ error: "Error fetching data from Shopify" }, { status: 500 });
  }
}
