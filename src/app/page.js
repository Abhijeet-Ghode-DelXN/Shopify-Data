"use client";
import { useState } from "react";

export default function Home() {
  const [orders, setOrders] = useState([]);

  const handleClick = async () => {
    try {
      const response = await fetch("/api/getData");
      const data = await response.json();
      console.log(data);
      if (data.error) {
        console.error(data.error);
      } else {
        setOrders(data);
      }
    } catch (error) {
      console.error("Error fetching data from the API:", error);
    }
  };

  return (
    <div className="w-full h-auto p-10 flex flex-col items-center justify-center gap-5">
      <h1 className="text-xl font-extrabold">Orders Data Of Aug 08 2024</h1>
      <button
        onClick={handleClick}
        className="bg-blue-700 p-3 rounded-lg text-white font-semibold"
      >
        Get Orders Data
      </button>
      <div className="mt-5 w-full px-10">
        {orders.length > 0 ? (
          <table className="table-auto border-collapse border border-gray-300 w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2">Order Name</th>
                <th className="border border-gray-300 px-4 py-2">Amount</th>
                <th className="border border-gray-300 px-4 py-2">Status</th>
                <th className="border border-gray-300 px-4 py-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="text-center">
                  <td className="border border-gray-300 px-4 py-2">
                    {order.name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    ₹{order.current_total_price}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {order.fulfillment_status ? order.fulfillment_status : "Unfulfilled" }
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {new Date(order.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-600">No orders data available.</p>
        )}
      </div>
    </div>
  );
}
