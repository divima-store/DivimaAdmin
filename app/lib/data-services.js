import { supabase } from "./supabase";

export const getProducts = async function () {
    const { data, error } = await supabase.from("products").select("*");
    if (error) {
        console.error("Error fetching products:", error.message);
        return [];
    }
    return data;
};
export const getusers = async function () {
  const { data, error } = await supabase.from("users").select("*");
  if (error) {
    console.error("Error fetching users:", error);
    return [];
  }
  return data;
};
export const getOrders = async function (
  status = "all",
  page = 1,
  pageSize = 10
) {
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize - 1;

  let query = supabase.from("orders").select(
    `
      *,
      product:productId (
        id,
        name,
        price,
        imageUrl
      )
    `,
    { count: "exact" }
  );

  if (status !== "all") {
    query = query.eq("status", status);
  }

  const { data, error, count } = await query
    .range(startIndex, endIndex)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching orders:", error);
    throw new Error(`Failed to fetch orders: ${error.message}`);
  }

  // Format the data to include product details directly in the order object
  const formattedOrders = data.map((order) => ({
    ...order,
    productName: order.product?.name,
    productPrice: order.product?.price,
    productImageUrl: order.product?.imageUrl,
  }));

  console.log("Formatted Orders:", formattedOrders); // For debugging

  return {
    orders: formattedOrders,
    totalCount: count,
    currentPage: page,
    totalPages: Math.ceil(count / pageSize),
  };
};