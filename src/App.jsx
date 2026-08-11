import { useEffect, useState } from "react";
import ProductPage from "./components/ProductPage";
import Form from "./components/Form";

const App = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [errors, setErrors] = useState(false);
  const [loading, setLoading] = useState(true);

  // fetch function from db.json
  useEffect(() => {
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

  // select item to update

  function selectProduct(selectedProductId) {
    const selectedItem = products.find(
      (product) => product.id === selectedProductId,
    );

    setSelectedProduct({ ...selectedItem });

    console.log("Selected Product is: ", selectedProduct);
  }

  // called after successful product update
  function updateProduct(updateProduct) {
    setProducts(
      products.map((product) =>
        product.id === updateProduct.id ? updateProduct : product,
      ),
    );

    setSelectedProduct(null);
  }

  return (
    <>
      <ProductPage
        products={products}
        errors={errors}
        loading={loading}
        selectProduct={selectProduct}
        deleteProduct={deleteProduct}
      />
      <Form
        addProduct={addProduct}
        selectedProduct={selectedProduct}
        updateProduct={updateProduct}
      />
    </>
  );
};

export default App;
