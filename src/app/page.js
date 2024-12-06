"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import animationData from "./assets/Animation - 1733463935753.json";

// Dynamically import Lottie to prevent SSR issues
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

export default function Home() {
  const [orders, setOrders] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    if (!selectedDate) {
      console.error("Please select a date.");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`/api/getData?date=${selectedDate}`);
      const data = await response.json();
      console.log(data);
      if (data.error) {
        console.error(data.error);
      } else {
        setOrders(data);
      }
    } catch (error) {
      console.error("Error fetching data from the API:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-auto p-10 flex flex-col items-center justify-center gap-5">
      <h1 className="text-xl font-extrabold">Orders Data</h1>
      <div className="flex flex-col gap-3 items-center">
        <label htmlFor="date" className="text-lg font-semibold">
          Select a Date:
        </label>
        <input
          type="date"
          id="date"
          className="border border-gray-300 p-2 rounded"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </div>
      <button
        onClick={handleClick}
        className="bg-blue-700 p-3 rounded-lg text-white font-semibold mt-5"
      >
        Get Orders Data
      </button>
      <div className="mt-5 w-full px-10">
        {loading ? (
          <div className="text-center flex flex-col items-center justify-center">
            <Lottie animationData={animationData} loop={true} className="w-48 h-48" />
          </div>
        ) : orders.length > 0 ? (
          <table className="table-auto border-collapse border border-gray-300 w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">Order Name</th>
              <th className="border border-gray-300 px-4 py-2">Customer Name</th> {/* Customer Name */}
              <th className="border border-gray-300 px-4 py-2">Contact No.</th> {/* Customer Contact No. */}
              <th className="border border-gray-300 px-4 py-2">Product Names</th> {/* Product Names */}
              <th className="border border-gray-300 px-4 py-2">Amount</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
              <th className="border border-gray-300 px-4 py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="text-center">
                <td className="border border-gray-300 px-4 py-2">{order.name}</td> {/* Order Name */}
                <td className="border border-gray-300 px-4 py-2">{order.customer.first_name + " " + order.customer.last_name || "N/A"}</td> {/* Customer Name */}
                <td className="border border-gray-300 px-4 py-2">{order.customer.default_address.phone || "N/A"}</td> {/* Customer Contact No. */}
                <td className="border border-gray-300 px-4 py-2">
                  {/* Loop through line_items to display product names */}
                  {order.line_items.map((item) => (
                    <div key={item.id}>{item.name}</div>
                  ))}
                </td>
                <td className="border border-gray-300 px-4 py-2">₹{order.current_total_price}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {order.fulfillment_status || "Unfulfilled"}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {new Date(order.created_at).toLocaleDateString('en-GB')}
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
