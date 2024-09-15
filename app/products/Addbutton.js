export default function AddButton({ children, onClick }) {
  return (
    <button
      className="text-center text-white px-5 py-2 rounded-md bg-gray-950 hover:bg-gray-800 transition-colors"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
