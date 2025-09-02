import { useState } from "react";
import ProductDialog from "./components/ProductDialog";
import Button from "./components/Button";
import ProductTable from "./components/ProductTable";

function App() {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-sky-50 via-white to-fuchsia-50">
      <header className="sticky top-0 z-30 h-14 border-b border-white/60 bg-white/70 backdrop-blur-md flex items-center justify-between px-3 sm:px-6 font-semibold text-base sm:text-lg shadow-sm">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-fuchsia-600 to-orange-500">
          Product Dashboard
        </span>
        <Button
          className="block md:hidden"
          onClick={() => setDialogOpen(true)}
          size="sm"
        >
          Add
        </Button>
      </header>
      <main className="flex-1 p-3 sm:p-6 max-w-6xl w-full mx-auto">
        <div className="rounded-2xl border border-white/70 bg-white/70 backdrop-blur-xl shadow-lg transition-all duration-300 hover:shadow-xl">
          <ProductTable />
        </div>
        <ProductDialog open={dialogOpen} onOpenChange={setDialogOpen} />
      </main>
    </div>
  );
}

export default App;
