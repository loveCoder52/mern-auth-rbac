import { useEffect, useState } from "react";
import API from "../api/productApi";

function ProductList() {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    const res = await API.get("/");
    setProducts(res.data.products);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div>
      {products.map((p) => (
        <div key={p._id}>
          <h3>{p.name}</h3>
          <p>{p.price}</p>
        </div>
      ))}
    </div>
  );
}

export default ProductList;