"use client";

import { useState, useEffect } from "react";
import { getusers } from "../_lib/data-services";
import CustomerCard from "./CustomerCard";

export default function CustomersList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      const data = await getusers();
      setCustomers(data);
    };

    fetchCustomers();
  }, []);

  const filteredCustomers = customers.filter((customer) =>
    customer.id.toString().includes(searchTerm) || customer.email.includes(searchTerm)
  );

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search customers by ID or email..."
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 text-black focus:ring-gray-950"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCustomers.map((customer) => (
          <CustomerCard key={customer.id} customer={customer} />
        ))}
      </div>
    </div>
  );
}
