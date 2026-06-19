import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getProducts } from "../services/productService";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const { data } = await getProducts();
        setProducts(data.products || []);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-300 border-t-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-slate-800">Products</h1>
          <p className="mt-2 text-slate-500">Browse the latest catalog.</p>
        </div>

        {products.length === 0 ? (
          <div className="rounded-lg bg-white p-10 text-center shadow">
            <h2 className="text-xl font-semibold text-slate-600">No products available</h2>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => {
              const imageUrl = product.images?.[0]?.url || product.image;

              return (
                <article
                  key={product._id}
                  className="overflow-hidden rounded-lg bg-white shadow transition hover:shadow-lg"
                >
                  <div className="aspect-[4/3] bg-slate-200">
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={product.title}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-slate-500">
                        No image
                      </div>
                    )}
                  </div>

                  <div className="p-5">
                    <h3 className="text-lg font-bold text-slate-800">{product.title}</h3>
                    <p className="mt-2 line-clamp-2 text-sm text-slate-500">
                      {product.description}
                    </p>

                    <div className="mt-4 flex items-center justify-between gap-3">
                      <span className="text-xl font-bold text-green-700">
                        Rs. {product.price}
                      </span>
                      <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                        {product.category}
                      </span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductList;
