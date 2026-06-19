import { useState } from "react";
import API from "../api/productApi";

function AddProduct() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    await API.post("/", form);

    alert("Product Added");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Name"
        onChange={(e) =>
          setForm({ ...form, name: e.target.value })
        }
      />

      <button type="submit">
        Add Product
      </button>
    </form>
  );
}

export default AddProduct;