import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ProductImageUploader from "../components/ProductImageUploader";
import { AppContext } from "../context/AppContext";
import { getProduct, updateProduct } from "../services/productService";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { userRole } = useContext(AppContext);
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    stock: "",
  });
  const [currentImages, setCurrentImages] = useState([]);
  const [removedImagePublicIds, setRemovedImagePublicIds] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [replaceImages, setReplaceImages] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const { data } = await getProduct(id);
        const product = data.product;

        setForm({
          title: product.title || "",
          description: product.description || "",
          price: product.price ?? "",
          category: product.category || "",
          stock: product.stock ?? "",
        });
        setCurrentImages(product.images || []);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const removeCurrentImage = (publicId) => {
    setRemovedImagePublicIds((current) => [...new Set([...current, publicId])]);
    setCurrentImages((current) => current.filter((image) => image.public_id !== publicId));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setUploadProgress(0);

    try {
      await updateProduct(
        id,
        {
          ...form,
          images: newImages,
          removedImagePublicIds,
          replaceImages,
        },
        (progressEvent) => {
          if (!progressEvent.total) return;
          setUploadProgress(Math.round((progressEvent.loaded * 100) / progressEvent.total));
        }
      );

      toast.success("Product updated successfully");
      navigate(userRole === "manager" ? "/manager/products" : "/admin/products");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update product");
    } finally {
      setSubmitting(false);
      setUploadProgress(0);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-300 border-t-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-4xl rounded-lg bg-white p-8 shadow">
        <h1 className="mb-8 text-3xl font-bold text-slate-800">Edit Product</h1>

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

          <div>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-800">Current Images</h2>
              <label className="flex items-center gap-2 text-sm text-slate-600">
                <input
                  type="checkbox"
                  checked={replaceImages}
                  onChange={(event) => setReplaceImages(event.target.checked)}
                />
                Replace all with new uploads
              </label>
            </div>

            {currentImages.length === 0 ? (
              <div className="rounded-lg border border-dashed p-6 text-center text-sm text-slate-500">
                No current images.
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {currentImages.map((image) => (
                  <div key={image.public_id} className="relative overflow-hidden rounded-lg border">
                    <img
                      src={image.url}
                      alt={form.title}
                      className="h-36 w-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeCurrentImage(image.public_id)}
                      disabled={submitting || replaceImages}
                      className="absolute right-2 top-2 rounded bg-red-600 px-2 py-1 text-xs font-semibold text-white hover:bg-red-700 disabled:opacity-60"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <ProductImageUploader files={newImages} onChange={setNewImages} disabled={submitting} />

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
            {submitting ? "Saving..." : "Save Product"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditProduct;
