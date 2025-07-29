// This is the Header component that displays the main title and an optional subtitle for the application.

export default function Header({ title, subtitle }) {
  return (
    <header className="mb-8 text-center">
      <h1 className="text-3xl font-bold">{title}</h1>
      {subtitle && <p className="text-gray-600 whitespace-pre-line">{subtitle}</p>}
    </header>
  );
}
