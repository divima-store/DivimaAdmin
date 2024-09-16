import { getOrders } from "../_lib/data-services";
import OrderCard from "./OrderCard";

export default async function OrdersPage() {
  let orders = [];
  let totalCount = 0;
  let error = null;

  try {
    const result = await getOrders();
    const filteredOrders = result.orders.filter((order) => !order.isCanceled);
    orders = filteredOrders;
    totalCount = filteredOrders.length;
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
      <p className="mb-4">Total Orders: {totalCount}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {orders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
      {orders.length === 0 && (
        <p className="text-center text-gray-500 mt-4">No orders found.</p>
      )}
    </div>
  );
}
