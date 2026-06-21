import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getProducts } from "../services/productService";
import { motion } from "framer-motion";
import ContactToBuyModal from "../components/ContactToBuyModal";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);


  const staggerContainer = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.08 },
    },
  };

  const cardItem = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  const loadProducts = async () => {
    setLoading(true);
    setError(false);
    try {
      const { data } = await getProducts();
      setProducts(data.products || []);
    } catch (err) {
      setError(true);
      toast.error(err.response?.data?.message || "Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const formatPrice = (price) =>
    new Intl.NumberFormat('en-IN').format(price ?? 0);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-300 border-t-blue-600" />
      </div>
    );
  }

  return (
    <div className="px-0 py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-slate-800">Products</h1>
          <p className="mt-2 text-slate-500">Browse the latest catalog.</p>
        </div>

        {error ? (
          <div className="rounded-lg bg-white p-10 text-center shadow">
            <h2 className="text-xl font-semibold text-slate-700 mb-2">
              Couldn't load products
            </h2>
            <p className="text-slate-500 mb-6">
              Something went wrong while fetching the catalog. Please try again.
            </p>
            <button
              onClick={loadProducts}
              className="px-5 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors"
            >
              Retry
            </button>
          </div>
        ) : products.length === 0 ? (
          <div className="rounded-lg bg-white p-10 text-center shadow">
            <h2 className="text-xl font-semibold text-slate-600">No products available</h2>
            <p className="text-slate-500 mt-2">Check back soon — new items are added regularly.</p>
          </div>
        ) : (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {products.map((product) => {
              const imageUrl = product.images?.[0]?.url || product.image;

              return (
                <motion.article
                  key={product._id}
                  variants={cardItem}
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden rounded-lg bg-white shadow transition-shadow hover:shadow-lg"
                >
                  <div className="aspect-[4/3] bg-slate-200 overflow-hidden">
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={product.title}
                        className="h-full w-full object-cover hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-slate-500">
                        No image
                      </div>
                    )}
                  </div>

                  <div className="p-5">
                    <h3 className="text-lg font-bold text-slate-800">
                      {product.title}
                    </h3>

                    <p className="mt-2 line-clamp-2 text-sm text-slate-500">
                      {product.description}
                    </p>

                    <div className="mt-4 flex items-center justify-between gap-3">
                      <span className="text-xl font-bold text-green-700">
                        Rs. {formatPrice(product.price)}
                      </span>

                      <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                        {product.category}
                      </span>
                    </div>

                    <button
                      onClick={() => {
                        console.log("Button clicked");
                        setSelectedProduct(product);
                        setShowModal(true);
                      }}
                      className="mt-4 w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                    >
                      Contact To Buy
                    </button>
                  </div>
                </motion.article>
              );
            })}
          </motion.div>
        )}
        {showModal && selectedProduct && (
          <ContactToBuyModal
            product={selectedProduct}
            onClose={() => {
              setShowModal(false);
              setSelectedProduct(null);
            }}
          />
        )}
      </div>
    </div>
  );
}

export default ProductList;