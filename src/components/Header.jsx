export default function Header({ title, subtitle }) {
  return (
    <header className="mb-8 text-center">
      <h1 className="text-3xl font-bold">{title}</h1>
      {subtitle && <p className="text-gray-600 whitespace-pre-line">{subtitle}</p>}
    </header>
  );
}
