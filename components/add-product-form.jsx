"use client";
import { useState } from "react";
import { createProduct } from "@/app/_lib/product-actions";
import toast from "react-hot-toast";

export function AddProductFormJsx({onClose}) {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    imagePath: "",
  });
  const [status, setStatus] = useState({ loading: false, error: null });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "imagePath" && files) {
      const file = files[0];
      if (!file.type.startsWith("image/")) {
        toast.error("Please upload a valid image file.");
        return;
      }
    }
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, error: null });

    const loadingToast = toast.loading("Adding product...");
    const formData = new FormData(e.target);

    try {
      const result = await createProduct(formData);

      if (!result.success) {
        throw new Error(result.error);
      }

      toast.success("Product added successfully!", { id: loadingToast });
      setProduct({ name: "", description: "", price: "", imagePath: "" });
      onClose();
    } catch (error) {
      toast.error("Failed to add product: " + error.message, {
        id: loadingToast,
      });
      setStatus({ loading: false, error: error.message });
    } finally {
      setStatus({ loading: false, error: null });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-[90vh] overflow-y-auto relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none"
          aria-label="Close"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>

        <form onSubmit={handleSubmit} className="space-y-6">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
            Add New Product
          </h2>

          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Product Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={product.name}
              onChange={handleChange}
              required
              placeholder="Enter product name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={product.description}
              onChange={handleChange}
              required
              placeholder="Enter product description"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
              rows="4"
            />
          </div>

          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              step="0.01"
              value={product.price}
              onChange={handleChange}
              required
              placeholder="Enter price"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
            />
          </div>

          <div>
            <label
              htmlFor="imagePath"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Upload Image
            </label>
            <input
              type="file"
              id="imagePath"
              name="imagePath"
              onChange={handleChange}
              accept="image/*"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
            />
          </div>

          {status.error && (
            <div className="text-red-500 text-sm mt-2">
              Error: {status.error}
            </div>
          )}

          <button
            type="submit"
            disabled={status.loading}
            className="w-full bg-gray-950 text-white font-semibold py-3 px-4 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75 transition-colors duration-200 disabled:bg-gray-400"
          >
            {status.loading ? "Adding Product..." : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
}
