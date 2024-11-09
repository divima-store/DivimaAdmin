"use client";

import { AddProductFormJsx } from "@/components/add-product-form";
import { useEffect, useState } from "react";
import { getProducts } from "../_lib/data-services";
import AddButton from "./Addbutton";
import ProductCard from "./ProductCard";

export default function ProductsList() {
  const [showForm, setShowForm] = useState(false);
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  function handleShowForm() {
    setShowForm(!showForm);
  }

  useEffect(() => {
    async function fetchProducts() {
      const fetchedProducts = await getProducts();
      setProducts(fetchedProducts);
    }
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    const trimmedQuery = searchQuery.trim().toLowerCase();
    return (
      product.name.toLowerCase().includes(trimmedQuery) ||
      product.id.toString().includes(trimmedQuery)
    );
  });

  return (
    <div className="container mx-auto p-4 text-gray-950">
      <div className="flex gap-5 items-center mb-4">
        <input
          type="text"
          placeholder="Search products by name or ID"
          className="p-2 border rounded flex-grow"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <AddButton onClick={handleShowForm}>Add</AddButton>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} onEdit={handleShowForm}/>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No products found.
          </p>
        )}
      </div>
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <AddProductFormJsx onClose={handleShowForm}/>
            <button
              onClick={handleShowForm}
              className="mt-4 w-full bg-gray-900 text-white py-2 px-4 rounded hover:bg-gray-950"
            >
              close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
