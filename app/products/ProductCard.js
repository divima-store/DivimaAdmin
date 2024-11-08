import { useState } from "react";
import Image from "next/image";
import { EditProductForm } from "@/components/EditProductForm";
import { deleteProduct } from "@/app/_lib/product-actions";
import toast from "react-hot-toast";

export default function ProductCard({ product }) {
  const [showEditForm, setShowEditForm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleEdit = () => {
    setShowEditForm(true);
  };

  const handleCloseEditForm = () => {
    setShowEditForm(false);
  };

  const handleDeleteClick = () => {
    setShowDeleteConfirm(true);
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirm(false);
  };

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    const loadingToast = toast.loading("Deleting product...");

    try {
      const result = await deleteProduct(product.id);

      if (!result.success) {
        throw new Error(result.error);
      }

      toast.success("Product successfully removed from catalog!", {
        id: loadingToast,
      });
      setShowDeleteConfirm(false);
    } catch (error) {
      const errorMessage = error.message.includes("foreign key constraint")
        ? "Cannot delete product because it has existing orders. The product has been deactivated instead."
        : "Failed to delete product: " + error.message;

      toast.error(errorMessage, {
        id: loadingToast,
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="bg-white border border-gray-200 text-gray-950 rounded-lg overflow-hidden w-full max-w-sm">
      <div className="aspect-square relative">
        <Image
          src={product.imageUrl}
          alt={product.name}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
        <p className="text-sm text-gray-600 mb-2">
          Quantity: {product.quantity}
        </p>
        <p className="text-sm text-gray-600 mb-4">
          Price: ${product.price.toFixed(2)}
        </p>
      </div>
      <div className="px-4 py-3 bg-gray-100 flex justify-between">
        <button
          className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors"
          onClick={handleEdit}
        >
          Edit
        </button>
        <button
          className="bg-white text-black px-4 py-2 rounded-md border border-black hover:bg-gray-100 transition-colors disabled:opacity-50"
          onClick={handleDeleteClick}
          disabled={isDeleting}
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </button>
      </div>

      {/* Edit Form Modal */}
      {showEditForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto relative">
            <EditProductForm product={product} onClose={handleCloseEditForm} />
            <button
              onClick={handleCloseEditForm}
              className="mt-4 w-full bg-gray-900 text-white py-2 px-4 rounded hover:bg-gray-950"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h3 className="text-xl font-semibold mb-4">Confirm Delete</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete &quot;{product.name}&quot;? This action
              cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={handleCancelDelete}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors disabled:opacity-50"
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
