import React, { useEffect, useState } from "react";
import ProductPage from "./components/ProductPage";
import Form from "./components/Form";

const App = () => {
  const [products, setProducts] = useState([]);
  const [errors, setErrors] = useState(false);
  const [loading, setLoading] = useState(true);

  // fetch function from db.json
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setErrors(false);
    setLoading(true);

    fetch("http://localhost:3000/products")
      .then((res) => {
        if (!res.ok) {
          setErrors(true);
          throw new Error(`HTTP error ${res.status}`);
        }
        return res.json();
      })
      .then((productData) => setProducts(productData))
      .catch((err) => {
        // console log

        console.log("Fetch error", err);

        // set errors
        setErrors(true);
      })
      .finally(() => {
        console.log("Fetch finished");

        // set loading false
        setLoading(false);
      });
  }, []);

  // crud functions

  // called after successful product added
  function addProduct(newProduct) {
    setProducts([...products, newProduct]);
  }

  // called after successful product deletion
  function deleteProduct(id) {
    setProducts(products.filter((product) => product.id !== id));
  }

  // called after successful product update
  function updateProduct(updateProduct) {
    setProducts(
      products.map((product) =>
        product.id === updateProduct.id ? updateProduct : product,
      ),
    );
  }

  return (
    <>
      <ProductPage products={products} errors={errors} loading={loading} />
      <Form addProduct={addProduct} />
    </>
  );
};

export default App;
