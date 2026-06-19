import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ProductImageUploader from "../components/ProductImageUploader";
import { createProduct } from "../services/productService";

const emptyForm = {
  title: "",
  description: "",
  price: "",
  category: "",
  stock: "",
};

function AddProduct() {
  const navigate = useNavigate();
  const [form, setForm] = useState(emptyForm);
  const [images, setImages] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

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

      toast.success("Product added successfully");
      setForm(emptyForm);
      setImages([]);
      navigate("/admin/products");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add product");
    } finally {
      setSubmitting(false);
      setUploadProgress(0);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 p-6">
      <div className="w-full max-w-2xl rounded-lg bg-white p-8 shadow">
        <h2 className="mb-8 text-center text-3xl font-bold text-slate-800">
          Add New Product
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            required
            name="title"
            placeholder="Product title"
            value={form.title}
            onChange={handleChange}
            className="w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <textarea
            required
            name="description"
            rows="4"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            className="w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="grid gap-4 sm:grid-cols-3">
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
              required
              name="category"
              placeholder="Category"
              value={form.category}
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
          </div>

          <ProductImageUploader files={images} onChange={setImages} disabled={submitting} />

          {submitting && (
            <div>
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
            className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? "Uploading..." : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;
