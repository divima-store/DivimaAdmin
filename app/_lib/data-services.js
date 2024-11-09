import { supabase } from "./supabase";

export const getProducts = async function () {
    const { data, error } = await supabase.from("products").select("*").eq("isActive", true);
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

  const formattedOrders = data.map((order) => ({
    ...order,
    productName: order.product?.name,
    productPrice: order.product?.price,
    productImageUrl: order.product?.imageUrl,
  }));


  return {
    orders: formattedOrders,
    totalCount: count,
    currentPage: page,
    totalPages: Math.ceil(count / pageSize),
  };
};

export const getAdmins = async function () {
  const { data, error } = await supabase.from("admins").select("*");
  console.log(data)
  if (error) {
    console.error("Error fetching admins:", error);
    return [];
  }
  return data;
};