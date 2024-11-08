import React from "react";

export default function CustomerCard({ customer }) {
  return (
    <div className="bg-white text-gray-950 shadow-md rounded-lg overflow-hidden w-full max-w-sm">
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{customer.name}</h3>
        <h3 className="text-lg font-semibold mb-2">customer id : {customer.id}</h3>
        <p className="text-sm text-gray-500 mb-4">{customer.email}</p>
        <div className="bg-gray-100 p-3 rounded-md">
          <h4 className="font-medium mb-2">Address:</h4>
          <p className="text-sm text-gray-700">{customer.adress}</p>
        </div>
      </div>
    </div>
  );
}
