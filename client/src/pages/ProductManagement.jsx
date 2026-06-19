import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import ProductImageUploader from "../components/ProductImageUploader";
import { AppContext } from "../context/AppContext";
import {
  createProduct,
  deleteProduct,
  getProducts,
} from "../services/productService";

const emptyForm = {
  title: "",
  description: "",
  price: "",
  category: "",
  stock: "",
};

export default function ProductManagement() {
  const { userRole } = useContext(AppContext);
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const canDeleteProducts = userRole === "admin";

  const loadProducts = async () => {
    try {
      setLoading(true);
      const { data } = await getProducts();
      setProducts(data.products || []);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setUploadProgress(0);

    try {
      await createProduct(
        { ...form, images },
        (progressEvent) => {
          if (!progressEvent.total) return;
          setUploadProgress(Math.round((progressEvent.loaded * 100) / progressEvent.total));
        }
      );

      toast.success("Product created successfully");
      setForm(emptyForm);
      setImages([]);
      await loadProducts();
    } catch (error) {
      toast.error(error.response?.data?.message || "Product upload failed");
    } finally {
      setSubmitting(false);
      setUploadProgress(0);
    }
  };

  const handleDelete = async (id) => {
    if (!canDeleteProducts) {
      toast.error("Only admins can delete products");
      return;
    }

    if (!window.confirm("Delete this product and all Cloudinary images?")) return;

    try {
      await deleteProduct(id);
      toast.success("Product deleted");
      await loadProducts();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete product");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-4xl font-bold text-slate-800">Product Management</h1>
            <p className="mt-2 text-slate-500">
              Create products with Cloudinary images and manage inventory.
            </p>
          </div>
          <Link
            to="/products"
            className="rounded-lg bg-slate-900 px-4 py-2 text-center text-sm font-semibold text-white hover:bg-slate-800"
          >
            View Catalog
          </Link>
        </div>

        <section className="mb-10 rounded-lg bg-white p-6 shadow">
          <h2 className="mb-6 text-2xl font-semibold text-slate-800">Add New Product</h2>

          <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
            <input
              required
              name="title"
              placeholder="Product title"
              value={form.title}
              onChange={handleChange}
              className="rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              required
              name="category"
              placeholder="Category"
              value={form.category}
              onChange={handleChange}
              className="rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              required
              name="price"
              type="number"
              min="0"
              step="0.01"
              placeholder="Price"
              value={form.price}
              onChange={handleChange}
              className="rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              name="stock"
              type="number"
              min="0"
              placeholder="Stock"
              value={form.stock}
              onChange={handleChange}
              className="rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <textarea
              required
              name="description"
              rows="4"
              placeholder="Product description"
              value={form.description}
              onChange={handleChange}
              className="rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 md:col-span-2"
            />

            <div className="md:col-span-2">
              <ProductImageUploader files={images} onChange={setImages} disabled={submitting} />
            </div>

            {submitting && (
              <div className="md:col-span-2">
                <div className="h-2 overflow-hidden rounded bg-slate-200">
                  <div
                    className="h-full bg-blue-600 transition-all"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
                <p className="mt-2 text-sm text-slate-500">Uploading {uploadProgress}%</p>
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60 md:col-span-2"
            >
              {submitting ? "Uploading..." : "Create Product"}
            </button>
          </form>
        </section>

        <section>
          <h2 className="mb-6 text-2xl font-semibold text-slate-800">Products</h2>

          {loading ? (
            <div className="rounded-lg bg-white p-8 text-center text-slate-500 shadow">
              Loading products...
            </div>
          ) : products.length === 0 ? (
            <div className="rounded-lg bg-white p-8 text-center text-slate-500 shadow">
              No products available.
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => {
                const imageUrl = product.images?.[0]?.url || product.image;

                return (
                  <article
                    key={product._id}
                    className="overflow-hidden rounded-lg bg-white shadow transition hover:shadow-lg"
                  >
                    <div className="h-52 bg-slate-200">
                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          alt={product.title}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-slate-500">
                          No image
                        </div>
                      )}
                    </div>

                    <div className="p-5">
                      <h3 className="text-xl font-bold text-slate-800">{product.title}</h3>
                      <p className="mt-2 line-clamp-2 text-sm text-slate-500">
                        {product.description}
                      </p>

                      <div className="mt-4 flex items-center justify-between">
                        <span className="text-lg font-bold text-green-700">
                          Rs. {product.price}
                        </span>
                        <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700">
                          {product.category}
                        </span>
                      </div>

                      <div className="mt-5 flex gap-2">
                        <Link
                          to={`/${userRole === "manager" ? "manager" : "admin"}/products/${product._id}/edit`}
                          className="flex-1 rounded-lg bg-slate-900 px-3 py-2 text-center text-sm font-semibold text-white hover:bg-slate-800"
                        >
                          Edit
                        </Link>

                        {canDeleteProducts && (
                          <button
                            type="button"
                            onClick={() => handleDelete(product._id)}
                            className="flex-1 rounded-lg bg-red-600 px-3 py-2 text-sm font-semibold text-white hover:bg-red-700"
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
