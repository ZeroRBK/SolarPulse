export default function Button({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
    >
      {children}
    </button>
  );
}
