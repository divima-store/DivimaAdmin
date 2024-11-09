'use server'

import { updateOrderStatus } from "@/app/_lib/data-services";

export async function updateOrder(orderId, currentStatus, newStatus) {
  try {
    // Validate the status transition
    const validTransitions = {
      'inProcess': ['onDelivery'],
      'onDelivery': ['inProcess', 'done'],
      'done': ['onDelivery']
    };

    if (!validTransitions[currentStatus]?.includes(newStatus)) {
      return {
        success: false,
        message: 'Invalid status transition'
      };
    }

    // Update the order status in the database
    await updateOrderStatus(orderId, newStatus);

    return {
      success: true,
      message: 'Order status updated successfully',
      newStatus
    };
  } catch (error) {
    console.error('Error updating order status:', error);
    return {
      success: false,
      message: 'Failed to update order status'
    };
  }
} 