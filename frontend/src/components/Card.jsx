
export default function Card({ title, children, className = "" }) {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 ${className}`}>
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">{title}</h2>
      <div>{children}</div>
    </div>
  );
}