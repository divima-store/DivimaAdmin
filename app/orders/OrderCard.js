'use client'

import Image from "next/image";
import { updateOrder } from "../actions/orderActions";
import { useState } from "react";
import { useRouter } from 'next/navigation'

export default function OrderCard({ order, onStatusUpdate }) {
  const [status, setStatus] = useState(order.orderStatus);
  const [isUpdating, setIsUpdating] = useState(false);
  const router = useRouter()

  const formatCurrency = (value) => {
    return typeof value === "number" ? `$${value.toFixed(2)}` : "N/A";
  };

  const handleStatusUpdate = async (targetStatus) => {
    if (status === 'done') return;
    
    setIsUpdating(true);
    try {
      const result = await updateOrder(order.id, status, targetStatus);
      if (result.success) {
        setStatus(result.newStatus);
        onStatusUpdate(order.id, result.newStatus);
        router.refresh()
      } else {
        console.error(result.message);
      }
    } catch (error) {
      console.error('Failed to update order:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleRollback = async (targetStatus) => {
    setIsUpdating(true);
    try {
      const result = await updateOrder(order.id, status, targetStatus);
      if (result.success) {
        setStatus(result.newStatus);
        onStatusUpdate(order.id, result.newStatus);
        router.refresh()
      } else {
        console.error(result.message);
      }
    } catch (error) {
      console.error('Failed to rollback order:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const renderButtons = () => {
    if (isUpdating) {
      return (
        <button disabled className="w-full py-2 px-4 rounded-md bg-gray-400 text-white">
          Updating...
        </button>
      );
    }

    switch (status) {
      case 'inProcess':
        return (
          <button
            onClick={() => handleStatusUpdate('onDelivery')}
            className="w-full py-2 px-4 rounded-md bg-blue-500 hover:bg-blue-600 text-white transition-colors"
          >
            Mark as On Delivery
          </button>
        );
      case 'onDelivery':
        return (
          <div className="flex flex-col gap-2">
            <button
              onClick={() => handleStatusUpdate('done')}
              className="w-full py-2 px-4 rounded-md bg-blue-500 hover:bg-blue-600 text-white transition-colors"
            >
              Mark as Done
            </button>
            <button
              onClick={() => handleRollback('inProcess')}
              className="w-full py-2 px-4 rounded-md bg-gray-500 hover:bg-gray-600 text-white transition-colors"
            >
              Back to Process
            </button>
          </div>
        );
      case 'done':
        return (
          <button
            onClick={() => handleRollback('onDelivery')}
            className="w-full py-2 px-4 rounded-md bg-green-500 hover:bg-green-600 text-white transition-colors"
          >
            Back to Delivery
          </button>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden w-full max-w-sm">
      <div className="p-4">
        <div className="aspect-square relative mb-4">
          {order.productImageUrl ? (
            <Image
              src={order.productImageUrl}
              alt={order.productName || "Product image"}
              fill={true}
              className="rounded-md object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500">No image available</span>
            </div>
          )}
        </div>
        <h3 className="text-lg font-semibold mb-2">
          {order.productName || "Unnamed Product"}
        </h3>
        <p className="text-sm text-gray-500 mb-2">
          Price: {formatCurrency(order.productPrice)}
        </p>
        <p className="text-sm text-gray-500 mb-4">
          {order.customerAddress || "No address provided"}
        </p>
        <p className="text-sm text-gray-500 mb-2">
          Product ID: {order.productId}
        </p>
        <p className="text-sm text-gray-500 mb-2">
          Order ID: {order.id}
        </p>
      </div>
      <div className="px-4 py-3 bg-gray-100">
        {renderButtons()}
      </div>
    </div>
  );
}
