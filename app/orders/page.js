export const dynamic = 'force-dynamic'
export const revalidate = 0

import { getOrders } from "../_lib/data-services";
import OrdersList from "./OrdersList";

export default async function OrdersPage() {
  let orders = [];
  let error = null;
  
  try {
    const result = await getOrders();
    orders = result.orders.filter((order) => !order.isCanceled);
  } catch (err) {
    error = err.message;
    console.error("Error fetching orders:", err);
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4 text-gray-950">
      <h1 className="text-2xl font-bold mb-4">Orders</h1>
      <p className="mb-4">Total Orders: {orders.length}</p>
      <OrdersList orders={orders} />
      {orders.length === 0 && (
        <p className="text-center text-gray-500 mt-4">No orders found.</p>
      )}
    </div>
  );
}
