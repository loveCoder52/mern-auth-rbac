import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { AnimatePresence, motion } from "framer-motion";
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

const fieldClass =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-[15px] text-ink placeholder:text-slate-400 transition-all duration-150 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20";

const cardVariants = {
  hidden: { opacity: 0, y: 14 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: Math.min(i * 0.04, 0.3), duration: 0.35, ease: "easeOut" },
  }),
  exit: { opacity: 0, scale: 0.96, transition: { duration: 0.2 } },
};

export default function ProductManagement() {
  const { userRole } = useContext(AppContext);
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [justCreated, setJustCreated] = useState(false);

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
    setJustCreated(false);

    try {
      await createProduct(
        { ...form, images },
        (progressEvent) => {
          if (!progressEvent.total) return;
          setUploadProgress(Math.round((progressEvent.loaded * 100) / progressEvent.total));
        }
      );

      toast.success("Product created successfully");
      setJustCreated(true);
      setForm(emptyForm);
      setImages([]);
      await loadProducts();
      setTimeout(() => setJustCreated(false), 1800);
    } catch (error) {
      toast.error(error.response?.data?.message || "Product upload failed");
    } finally {
      setSubmitting(false);
      setTimeout(() => setUploadProgress(0), 600);
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
    <div className="min-h-screen bg-canvas">
      <div className="mx-auto max-w-7xl px-6 py-10">
        {/* Header */}
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
              Inventory
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              Product Management
            </h1>
            <p className="mt-2 text-[15px] text-slate-500">
              Create products with Cloudinary images and manage inventory.
            </p>
          </div>
          <Link
            to="/products"
            className="inline-flex items-center justify-center rounded-xl bg-ink px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
          >
            View Catalog
          </Link>
        </div>

        {/* Create form */}
        <section className="mb-12 rounded-2xl border border-slate-200/70 bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-ink">Add New Product</h2>
            <AnimatePresence>
              {justCreated && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700"
                >
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  Added
                </motion.span>
              )}
            </AnimatePresence>
          </div>

          <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
            <input
              required
              name="title"
              placeholder="Product title"
              value={form.title}
              onChange={handleChange}
              className={fieldClass}
            />

            <input
              required
              name="category"
              placeholder="Category"
              value={form.category}
              onChange={handleChange}
              className={fieldClass}
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
              className={fieldClass}
            />

            <input
              name="stock"
              type="number"
              min="0"
              placeholder="Stock"
              value={form.stock}
              onChange={handleChange}
              className={fieldClass}
            />

            <textarea
              required
              name="description"
              rows="4"
              placeholder="Product description"
              value={form.description}
              onChange={handleChange}
              className={`${fieldClass} resize-none md:col-span-2`}
            />

            <div className="md:col-span-2">
              <ProductImageUploader files={images} onChange={setImages} disabled={submitting} />
            </div>

            <AnimatePresence>
              {submitting && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="md:col-span-2"
                >
                  <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
                    <motion.div
                      className="h-full rounded-full bg-accent"
                      initial={{ width: 0 }}
                      animate={{ width: `${uploadProgress}%` }}
                      transition={{ ease: "easeOut", duration: 0.2 }}
                    />
                  </div>
                  <p className="mt-2 text-sm text-slate-500">Uploading {uploadProgress}%</p>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              type="submit"
              disabled={submitting}
              whileTap={{ scale: 0.985 }}
              className="rounded-xl bg-accent py-3 font-semibold text-white transition-colors hover:bg-accent-dark disabled:cursor-not-allowed disabled:opacity-60 md:col-span-2"
            >
              {submitting ? "Uploading..." : "Create Product"}
            </motion.button>
          </form>
        </section>

        {/* Catalog */}
        <section>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-ink">Products</h2>
            {!loading && products.length > 0 && (
              <span className="text-sm text-slate-400">
                {products.length} item{products.length !== 1 ? "s" : ""}
              </span>
            )}
          </div>

          {loading ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="overflow-hidden rounded-2xl border border-slate-200/70 bg-white shadow-sm"
                >
                  <div className="h-48 animate-pulse bg-slate-100" />
                  <div className="space-y-3 p-5">
                    <div className="h-4 w-2/3 animate-pulse rounded bg-slate-100" />
                    <div className="h-3 w-full animate-pulse rounded bg-slate-100" />
                    <div className="h-3 w-4/5 animate-pulse rounded bg-slate-100" />
                  </div>
                </div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white/60 p-12 text-center">
              <p className="text-base font-medium text-ink">No products yet</p>
              <p className="mt-1 text-sm text-slate-500">
                Add your first product using the form above.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence mode="popLayout">
                {products.map((product, i) => {
                  const imageUrl = product.images?.[0]?.url || product.image;

                  return (
                    <motion.article
                      key={product._id}
                      custom={i}
                      variants={cardVariants}
                      initial="hidden"
                      animate="show"
                      exit="exit"
                      layout
                      className="group overflow-hidden rounded-2xl border border-slate-200/70 bg-white shadow-sm transition-shadow hover:shadow-md"
                    >
                      <div className="h-48 overflow-hidden bg-slate-100">
                        {imageUrl ? (
                          <img
                            src={imageUrl}
                            alt={product.title}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center text-sm text-slate-400">
                            No image
                          </div>
                        )}
                      </div>

                      <div className="p-5">
                        <h3 className="truncate text-lg font-semibold text-ink">
                          {product.title}
                        </h3>
                        <p className="mt-1.5 line-clamp-2 text-sm text-slate-500">
                          {product.description}
                        </p>

                        <div className="mt-4 flex items-center justify-between">
                          <span className="text-lg font-bold text-emerald-700">
                            Rs. {product.price}
                          </span>
                          <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
                            {product.category}
                          </span>
                        </div>

                        <div className="mt-5 flex gap-2">
                          <Link
                            to={`/${userRole === "manager" ? "manager" : "admin"}/products/${product._id}/edit`}
                            className="flex-1 rounded-lg bg-ink px-3 py-2 text-center text-sm font-semibold text-white transition-colors hover:bg-slate-800"
                          >
                            Edit
                          </Link>

                          {canDeleteProducts && (
                            <button
                              type="button"
                              onClick={() => handleDelete(product._id)}
                              className="flex-1 rounded-lg bg-red-50 px-3 py-2 text-sm font-semibold text-red-600 transition-colors hover:bg-red-600 hover:text-white"
                            >
                              Delete
                            </button>
                          )}
                        </div>
                      </div>
                    </motion.article>
                  );
                })}
              </AnimatePresence>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}