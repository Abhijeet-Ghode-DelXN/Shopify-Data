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
    <div>
      <button onClick={handleClick}>Get Data</button>
      <div>
        {products.length > 0 ? (
          <ul>
            {products.map((product) => (
              <li key={product.id}>{product.id}</li>
            ))}
          </ul>
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
}
