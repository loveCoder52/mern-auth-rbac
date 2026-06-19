import { useEffect, useState } from "react";
import {
  getProducts,
  createProduct,
  deleteProduct,
} from "../services/productService";

export default function ProductManagement() {
  const [products, setProducts] = useState([]);

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    stock: "",
  });

  const loadProducts = async () => {
    const res = await getProducts();
    setProducts(res.data.products);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await createProduct(form);

    loadProducts();
  };

  const handleDelete = async (id) => {
    await deleteProduct(id);

    loadProducts();
  };

  return (
    <div>
      <h1>Products</h1>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Title"
          onChange={(e) =>
            setForm({
              ...form,
              title: e.target.value,
            })
          }
        />

        <input
          placeholder="Price"
          onChange={(e) =>
            setForm({
              ...form,
              price: e.target.value,
            })
          }
        />

        <button>Add Product</button>
      </form>

      {products.map((product) => (
        <div key={product._id}>
          <h3>{product.title}</h3>

          <button
            onClick={() =>
              handleDelete(product._id)
            }
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}