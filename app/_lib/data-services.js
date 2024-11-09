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
export const getOrders = async function (page = 1, pageSize = 10) {
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
    timestamp: Date.now()
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

export async function updateOrderStatus(orderId, newStatus) {
  const { data, error } = await supabase
    .from('orders')
    .update({
      orderStatus: newStatus,
      dilevered: newStatus === 'done'
    })
    .eq('id', orderId)
    .select()
    .single();

  if (error) {
    console.error('Error updating order status:', error);
    throw new Error('Failed to update order status');
  }

  return {
    success: true,
    data
  };
}