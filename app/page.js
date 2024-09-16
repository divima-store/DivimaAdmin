import { AdminDashboardJsx } from "@/components/admin-dashboard";
import { getOrders, getusers, getProducts } from "@/app/_lib/data-services";
import { auth } from "@/app/_lib/auth";
import { redirect } from "next/navigation";

export default async function AdminDashboardPage() {
  const session = await auth();

  if (!session) {
    redirect("/api/auth/signin");
  }

  const orders = await getOrders();
  const users = await getusers();
  const products = await getProducts();

  const totalOrders = orders.totalCount;

  const dashboardData = {
    summaryCards: [
      {
        title: "Total Revenue",
        value: "$15,231.89",
        change: "+20.1% from last month",
      },
      { title: "Orders", value: `${totalOrders}` },
      { title: "Customers", value: "+249", change: "+30% from last month" },
    ],
    salesData: [
      { category: "Electronics", sales: 300 },
      { category: "Clothing", sales: 200 },
      { category: "Books", sales: 170 },
      { category: "Home", sales: 230 },
      { category: "Sports", sales: 140 },
    ],
    revenueData: [
      { month: "Jan", revenue: 2000 },
      { month: "Feb", revenue: 2200 },
      { month: "Mar", revenue: 2700 },
      { month: "Apr", revenue: 2400 },
      { month: "May", revenue: 2800 },
      { month: "Jun", revenue: 3200 },
    ],
    customerSegments: [
      { name: "New", value: 400 },
      { name: "Returning", value: 300 },
      { name: "Loyal", value: 200 },
    ],
    recentOrders: [
      { id: "3210", status: "Shipped", customer: "John Doe", amount: "239.00" },
      {
        id: "3209",
        status: "Processing",
        customer: "Jane Smith",
        amount: "125.50",
      },
      {
        id: "3208",
        status: "Delivered",
        customer: "Bob Johnson",
        amount: "79.99",
      },
    ],
  };

  return <AdminDashboardJsx dashboardData={dashboardData} />;
}
