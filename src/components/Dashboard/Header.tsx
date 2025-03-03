export function Header() {
    return (
      <header className="flex h-16 items-center gap-4 px-6">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-semibold">Dashboard</h1>
        </div>
        <div className="ml-auto flex items-center gap-4">
          {/* Add any header actions or buttons here */}
        </div>
      </header>
    );
  }