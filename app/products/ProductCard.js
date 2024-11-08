import Image from "next/image";

export default function ProductCard({ product }) {
  
  return (
    <div className="bg-white border border-gray-200 text-gray-950 rounded-lg overflow-hidden w-full max-w-sm">
      <div className="aspect-square relative">
        <Image
          src={product.imageUrl}
          alt={product.name}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
        <p className="text-sm text-gray-600 mb-2">
          Quantity: {product.quantity}
        </p>
        <p className="text-sm text-gray-600 mb-4">
          Price: ${product.price.toFixed(2)}
        </p>
      </div>
      <div className="px-4 py-3 bg-gray-100 flex justify-between">
        <button className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors">
          Edit
        </button>
        <button className="bg-white text-black px-4 py-2 rounded-md border border-black hover:bg-gray-100 transition-colors">
          Delete
        </button>
      </div>
    </div>
  );
}
