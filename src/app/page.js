"use client"
import { useState } from 'react';

export default function Home() {
  const [products, setProducts] = useState([]);

  const handleClick = async () => {
    try {
      const response = await fetch('/api/getData');
      const data = await response.json();
      console.log(data)
      if (data.error) {
        console.error(data.error);
      } else {
        setProducts(data);
        console.log(data); // Log the fetched products
      }
    } catch (error) {
      console.error('Error fetching data from the API:', error);
    }
  };

  return (
    <div className='w-full h-screen flex flex-col items-center justify-center gap-5'>
      <h1 className='text-xl font-extrabold '>Orders Data Of Dec 04 2024</h1>
      <button onClick={handleClick} className='bg-blue-700 p-3 rounded-lg text-white font-semibold'>Get orders Data Data</button>
      <div>
        {products.length > 0 ? (
          <div className='flex flex-col items-center gap-5'>
            <h1 className='text-red-500 text-lg '>Please Check your console to get Whole Data</h1>
          <ul>
            {products.map((product) => (
              <li key={product.id}>{product.id}</li>
            ))}
          </ul>
          </div>
        ) : (
          <p></p>
        )}
      </div>
    </div>
  );
}
