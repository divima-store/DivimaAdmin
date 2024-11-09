"use client";

import OrderCard from "./OrderCard";
import { useState } from "react";

export default function OrdersList({ orders: initialOrders }) {
  const [orders, setOrders] = useState(initialOrders);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("inProcess");

  // Function to handle order status updates
  const handleOrderStatusUpdate = (orderId, newStatus) => {
    setOrders(prevOrders => 
      prevOrders.map(order => 
        order.id === orderId 
          ? { ...order, orderStatus: newStatus }
          : order
      )
    );
  };

  // Filter orders based on search term and status
  const filteredOrders = orders?.filter(order => {
    const matchesSearch = 
      order.productName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerAddress?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id?.toString().includes(searchTerm);
    
    const matchesStatus = order.orderStatus === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-4">
      <div className="mb-6 space-y-4">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search orders..."
          className="w-full p-2 border rounded-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Status Toggle Buttons */}
        <div className="flex w-full bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setStatusFilter("inProcess")}
            className={`flex-1 py-2 rounded-md transition-colors duration-200 ${
              statusFilter === "inProcess" ? "bg-gray-200" : "bg-transparent"
            }`}
          >
            In Process
          </button>
          <button
            onClick={() => setStatusFilter("onDelivery")}
            className={`flex-1 py-2 rounded-md transition-colors duration-200 ${
              statusFilter === "onDelivery" ? "bg-gray-200" : "bg-transparent"
            }`}
          >
            On Delivery
          </button>
          <button
            onClick={() => setStatusFilter("done")}
            className={`flex-1 py-2 rounded-md transition-colors duration-200 ${
              statusFilter === "done" ? "bg-gray-200" : "bg-transparent"
            }`}
          >
            Done
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredOrders?.map((order) => (
          <OrderCard 
            key={order.id} 
            order={order}
            onStatusUpdate={handleOrderStatusUpdate}
          />
        ))}
      </div>

      {filteredOrders?.length === 0 && (
        <div className="text-center text-gray-500 mt-8">
          No orders found matching your criteria
        </div>
      )}
    </div>
  );
}
