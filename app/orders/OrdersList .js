import OrderCard from "./OrderCard";

const OrdersList = ({ orders }) => {
  return (
    <div className="container mx-auto p-4 text-gray-900">
      <div className="mb-4">
        <select
          className="border rounded-md p-2"
        >
          <option value="all">All Orders</option>
          <option value="in-process">In Process</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {orders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
};

export default OrdersList;
