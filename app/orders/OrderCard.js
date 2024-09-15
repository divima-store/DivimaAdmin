import Image from "next/image";

export default function OrderCard({ order }) {
  const formatCurrency = (value) => {
    return typeof value === "number" ? `$${value.toFixed(2)}` : "N/A";
  };

  return (
    <div className="bg-white  shadow-md rounded-lg overflow-hidden w-full max-w-sm">
      <div className="p-4">
        <div className="aspect-square relative mb-4">
          {order.productImageUrl ? (
            <Image
              src={order.productImageUrl}
              alt={order.productName || "Product image"}
              layout="fill"
              objectFit="cover"
              className="rounded-md"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500">No image available</span>
            </div>
          )}
        </div>
        <h3 className="text-lg font-semibold mb-2">
          {order.productName || "Unnamed Product"}
        </h3>
        <p className="text-sm text-gray-500 mb-2">
          Price: {formatCurrency(order.productPrice)}
        </p>
        <p className="text-sm text-gray-500 mb-4">
          {order.customerAddress || "No address provided"}
        </p>
        <p className="text-sm text-gray-500 mb-2">
          Product ID: {order.productId}
        </p>
      </div>
      <div className="px-4 py-3 bg-gray-100">
        <button
          className={`w-full py-2 px-4 rounded-md ${
            order.status === "pending"
              ? "bg-blue-500 text-white"
              : "bg-gray-300"
          }`}
        >
          {order.status === "pending" ? "Mark as Done" : "Done"}
        </button>
      </div>
    </div>
  );
}
