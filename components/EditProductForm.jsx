import { useState } from "react";
import { updateProduct } from "@/app/_lib/product-actions";
import toast from "react-hot-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function EditProductForm({ product, onClose }) {
  const [updatedProduct, setUpdatedProduct] = useState(product);
  const [status, setStatus] = useState({ loading: false, error: null });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setUpdatedProduct((prevProduct) => ({
      ...prevProduct,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, error: null });

    const loadingToast = toast.loading("Updating product...");
    const formData = new FormData();
    Object.keys(updatedProduct).forEach((key) => {
      formData.append(key, updatedProduct[key]);
    });

    try {
      const result = await updateProduct(formData);

      if (!result.success) {
        throw new Error(result.error);
      }

      toast.success("Product updated successfully!", { id: loadingToast });
      onClose();
    } catch (error) {
      toast.error("Failed to update product: " + error.message, {
        id: loadingToast,
      });
      setStatus({ loading: false, error: error.message });
    } finally {
      setStatus({ loading: false, error: null });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Product Name
        </label>
        <Input
          type="text"
          name="name"
          value={updatedProduct.name}
          onChange={handleChange}
          placeholder="Product Name"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          name="description"
          value={updatedProduct.description}
          onChange={handleChange}
          placeholder="Product Description"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Price
        </label>
        <Input
          type="number"
          name="price"
          value={updatedProduct.price}
          onChange={handleChange}
          placeholder="Product Price"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Product Image
        </label>
        <Input
          type="file"
          name="imagePath"
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <Button
        type="submit"
        disabled={status.loading}
        className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors"
      >
        {status.loading ? "Updating Product..." : "Update Product"}
      </Button>
    </form>
  );
}
