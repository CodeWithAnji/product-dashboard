import React, { useState, useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { useMutation } from "@tanstack/react-query";
import { addProduct, updateProduct } from "../api/products.js";
import Button from "../components/Button.jsx";

export default function ProductDialog({
  open,
  onOpenChange,
  product,
  onAfterSave,
}) {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);

  useEffect(() => {
    if (product) {
      setTitle(product.title ?? "");
      setPrice(Number(product.price ?? 0));
      setCategory(product.category ?? "");
      setStock(Number(product.stock ?? 0));
    } else {
      setTitle("");
      setPrice(0);
      setCategory("");
      setStock(0);
    }
  }, [product, open]);

  const mutation = useMutation({
    mutationFn: (data) =>
      product ? updateProduct(product.id, data) : addProduct(data),
    onSuccess: (saved) => {
      onAfterSave?.(saved, product ? "edit" : "add");
      onOpenChange(false);
    },
  });

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-gradient-to-b from-black/40 to-black/60 backdrop-blur-sm data-[state=open]:animate-fadeIn" />
        <Dialog.Content
          className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 
                     w-[92vw] sm:w-[480px] max-w-[92vw]
                     bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl
                     border border-white/70
                     p-4 sm:p-6
                     data-[state=open]:animate-scaleIn"
        >
          <div className="mb-4">
            <Dialog.Title className="font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-fuchsia-600 to-orange-500">
              {product ? "Edit Product" : "Add Product"}
            </Dialog.Title>
            <Dialog.Description className="text-xs text-gray-500">
              Fill out the details below.
            </Dialog.Description>
          </div>

          <form
            className="space-y-3"
            onSubmit={(e) => {
              e.preventDefault();
              const payload = {
                title,
                price: Number(price),
                category,
                stock: Number(stock),
              };
              mutation.mutate(payload);
            }}
          >
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              className="border border-indigo-200/70 bg-white/80 rounded-xl p-2.5 w-full text-sm 
                         focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all"
              required
            />
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Price"
              className="border border-indigo-200/70 bg-white/80 rounded-xl p-2.5 w-full text-sm 
                         focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all"
              min="0"
              step="1"
              required
            />
            <input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Category"
              className="border border-indigo-200/70 bg-white/80 rounded-xl p-2.5 w-full text-sm 
                         focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all"
              required
            />
            <input
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              placeholder="Stock"
              className="border border-indigo-200/70 bg-white/80 rounded-xl p-2.5 w-full text-sm 
                         focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all"
              min="0"
              step="1"
              required
            />

            <div className="flex justify-end gap-2 pt-1">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={mutation.isLoading}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={mutation.isLoading}>
                {mutation.isLoading ? "Saving..." : "Save"}
              </Button>
            </div>
          </form>
          <Dialog.Close asChild>
            <button
              aria-label="Close"
              className="absolute right-3 top-3 h-8 w-8 rounded-full grid place-items-center 
                         text-gray-500 hover:bg-gray-100 transition-colors"
            >
              ✕
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
      <style>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes scaleIn { 
          0% { opacity: 0; transform: translate(-50%, -50%) scale(.96) } 
          100% { opacity: 1; transform: translate(-50%, -50%) scale(1) } 
        }
        [data-state="open"].animate-fadeIn { animation: fadeIn .15s ease-out }
        [data-state="open"].animate-scaleIn { animation: scaleIn .18s ease-out }
      `}</style>
    </Dialog.Root>
  );
}
