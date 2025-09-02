const BASE = "https://dummyjson.com";

async function handleJson(res, fallbackMsg) {
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`${fallbackMsg} (${res.status}) ${text || res.statusText}`);
  }
  return res.json();
}

export async function fetchProducts({ limit = 10, skip = 0, q = "" }) {
  const url = q
    ? `${BASE}/products/search?q=${encodeURIComponent(
        q
      )}&limit=${limit}&skip=${skip}`
    : `${BASE}/products?limit=${limit}&skip=${skip}`;

  const data = await handleJson(await fetch(url), "Error fetching products");
  return { items: data.products, total: data.total };
}

export async function addProduct(product) {
  const res = await fetch(`${BASE}/products/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  return handleJson(res, "Error adding product");
}

export async function updateProduct(id, product) {
  const res = await fetch(`${BASE}/products/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  return handleJson(res, "Error updating product");
}

export async function deleteProduct(id) {
  const res = await fetch(`${BASE}/products/${id}`, { method: "DELETE" });
  return handleJson(res, "Error deleting product");
}
