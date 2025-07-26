export default function Button({ children, onClick }) {
  return (
    <button
  onClick={onClick}
  className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 active:bg-blue-800 active:scale-95 shadow-md hover:shadow-lg active:shadow-sm transition-all duration-150 cursor-pointer"
>
  {children}
</button>

  );
}
