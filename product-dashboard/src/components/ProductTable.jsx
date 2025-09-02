// src/components/ProductTable.jsx
import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchProducts, deleteProduct } from "../api/products.js";
import Button from "../components/Button.jsx";
import ProductDialog from "../components/ProductDialog.jsx";

export default function ProductTable() {
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState(null); // null = add mode, object = edit mode

  const queryClient = useQueryClient();
  const limit = 10;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["products", { page, search }],
    queryFn: () => fetchProducts({ limit, skip: page * limit, q: search }),
    keepPreviousData: true,
  });

  const updateAllProductLists = (updater) => {
    queryClient.setQueriesData({ queryKey: ["products"] }, (old) => {
      if (!old) return old;
      return updater(old);
    });
  };

  const deleteMutation = useMutation({
    mutationFn: (id) => deleteProduct(id),
    onSuccess: (_res, id) => {
      updateAllProductLists((old) => ({
        ...old,
        items: old.items.filter((p) => p.id !== id),
        total: Math.max(0, (old.total ?? 0) - 1),
      }));
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16 animate-pulse">
        <div className="h-3 w-3 rounded-full bg-indigo-400 mr-2" />
        <div className="h-3 w-3 rounded-full bg-fuchsia-400 mr-2" />
        <div className="h-3 w-3 rounded-full bg-orange-400" />
        <span className="ml-3 text-sm text-gray-600">Loading…</span>
      </div>
    );
  }

  if (isError)
    return <div className="p-4 text-rose-600">Error loading products</div>;

  return (
    <div className="space-y-4 p-3 sm:p-5">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 sm:items-center">
        <input
          value={search}
          onChange={(e) => {
            setPage(0);
            setSearch(e.target.value);
          }}
          placeholder="Search products"
          className="w-full sm:flex-1 border border-indigo-200/70 bg-white/80 backdrop-blur rounded-xl p-2.5 text-sm
                     focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-200"
        />
        <Button
          onClick={() => {
            setEditing(null); // add mode
            setDialogOpen(true);
          }}
          className="w-full sm:w-auto"
        >
          Add Product
        </Button>
      </div>

      {/* Mobile Card List */}
      <ul className="grid sm:hidden grid-cols-1 gap-3">
        {data.items.map((p) => (
          <li
            key={p.id}
            className="rounded-2xl border border-white/80 bg-white/80 backdrop-blur p-3 shadow-sm
                       transition-all duration-300 hover:shadow-md"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-semibold text-gray-900">{p.title}</h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  {p.category} • Stock: {p.stock}
                </p>
              </div>
              <span className="text-sm font-semibold bg-gradient-to-r from-indigo-600 to-fuchsia-600 bg-clip-text text-transparent">
                ${p.price}
              </span>
            </div>

            <div className="mt-3 flex gap-2">
              <Button
                size="sm"
                onClick={() => {
                  setEditing(p);
                  setDialogOpen(true);
                }}
              >
                Edit
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => deleteMutation.mutate(p.id)}
              >
                Delete
              </Button>
            </div>
          </li>
        ))}
      </ul>

      {/* Desktop Table */}
      <div className="hidden sm:block overflow-x-auto rounded-xl">
        <table className="w-full text-left border-separate border-spacing-0">
          <thead>
            <tr className="bg-gradient-to-r from-indigo-50 via-fuchsia-50 to-orange-50">
              <th className="p-3 text-sm font-semibold text-gray-700 sticky top-0">
                Title
              </th>
              <th className="p-3 text-sm font-semibold text-gray-700 sticky top-0">
                Price
              </th>
              <th className="p-3 text-sm font-semibold text-gray-700 sticky top-0">
                Category
              </th>
              <th className="p-3 text-sm font-semibold text-gray-700 sticky top-0">
                Stock
              </th>
              <th className="p-3 text-sm font-semibold text-gray-700 sticky top-0">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {data.items.map((p, idx) => (
              <tr
                key={p.id}
                className={cnRow(
                  "transition-colors",
                  idx % 2 === 0 ? "bg-white/70" : "bg-white/90",
                  "hover:bg-indigo-50/70"
                )}
              >
                <td className="p-3 align-top">{p.title}</td>
                <td className="p-3 align-top font-semibold">${p.price}</td>
                <td className="p-3 align-top">{p.category}</td>
                <td className="p-3 align-top">{p.stock}</td>
                <td className="p-3 align-top">
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => {
                        setEditing(p); // edit mode
                        setDialogOpen(true);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => deleteMutation.mutate(p.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-0 sm:items-center justify-between pt-1">
        <Button
          variant="outline"
          disabled={page === 0}
          onClick={() => setPage((p) => Math.max(p - 1, 0))}
          className="w-full sm:w-auto"
        >
          Previous
        </Button>
        <span className="text-xs text-gray-500 text-center">
          Page {page + 1}
        </span>
        <Button
          variant="outline"
          disabled={data.items.length < limit}
          onClick={() => setPage((p) => p + 1)}
          className="w-full sm:w-auto"
        >
          Next
        </Button>
      </div>

      {/* Dialog for Add/Edit from table actions */}
      <ProductDialog
        open={dialogOpen}
        onOpenChange={(open) => setDialogOpen(open)}
        product={editing}
        onAfterSave={(saved, mode) => {
          updateAllProductLists((old) => {
            if (!old) return old;
            if (mode === "edit") {
              return {
                ...old,
                items: old.items.map((it) =>
                  it.id === saved.id ? { ...it, ...saved } : it
                ),
              };
            }
            return {
              ...old,
              items: [saved, ...old.items].slice(0, old.items.length),
              total: (old.total ?? 0) + 1,
            };
          });
          queryClient.invalidateQueries({ queryKey: ["products"] });
        }}
      />
    </div>
  );
}

/** tiny util to concat row classes without bringing in extra deps */
function cnRow(...classes) {
  return classes.filter(Boolean).join(" ");
}
