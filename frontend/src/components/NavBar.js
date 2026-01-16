export default function NavBar() {
  return (
    <header className="w-full border-b bg-white">
      <nav className="mx-auto max-w-5xl flex items-center justify-between p-4">
        <a className="text-lg font-semibold">UQ Lost & Found</a>
        <div className="flex gap-3">
          <a className="text-sm text-gray-700 hover:text-black" href="/home">Home</a>
          <a className="text-sm text-gray-700 hover:text-black" href="/addItem">Add Item</a>
        </div>
      </nav>
    </header>
  );
}
