import { useEffect, useState } from "react";

const emptyForm = {
  name: "",
  brand: "",
  year: "",
  price: "",
  stockCount: "",
  rating: "",
  description: "",
};

const Form = ({ addProduct, selectedProduct, updateProduct }) => {
  const [formData, setFormData] = useState(emptyForm);
  const [formErrors, setFormErrors] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  // adding selected item value to form

  useEffect(() => {
    if (selectedProduct) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData({
        name: selectedProduct.name || "",
        brand: selectedProduct.brand || "",
        year: selectedProduct.year || "",
        price: selectedProduct.price || "",
        stockCount: selectedProduct.stockCount || "",
        rating: selectedProduct.rating || "",
        description: selectedProduct.description || "",
      });
    } else {
      setFormData(emptyForm);
    }
  }, [selectedProduct]);

  // handle change
  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  // handle submit
  function handleSubmit(event) {
    event.preventDefault();

    setFormErrors(false);
    setFormLoading(true);

    selectedProduct && selectedProduct.id
      ? fetch(`http://localhost:3000/products/${selectedProduct.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...formData }),
        })
          .then((res) => {
            if (!res.ok) {
              setFormErrors(true);
              throw new Error(`HTTP error ${res.status}`);
            }
            return res.json();
          })
          .then((responseData) => {
            updateProduct(responseData);
            console.log("Response Data is: updateProduct", responseData);

            setFormData({
              name: "",
              brand: "",
              year: "",
              price: "",
              stockCount: "",
              rating: "",
              description: "",
            });
          })
          .catch((err) => {
            // console log

            console.log("Fetch error", err);

            // set errors
            setFormErrors(true);
          })
          .finally(() => {
            console.log("Fetch finished");

            // set loading false
            setFormLoading(false);
          })
      : fetch("http://localhost:3000/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...formData }),
        })
          .then((res) => {
            if (!res.ok) {
              setFormErrors(true);
              throw new Error(`HTTP error ${res.status}`);
            }
            return res.json();
          })
          .then((responseData) => {
            addProduct(responseData);
            console.log("Response Data is: addProduct", responseData);
            setFormData({
              name: "",
              brand: "",
              year: "",
              price: "",
              stockCount: "",
              rating: "",
              description: "",
            });
          })
          .catch((err) => {
            // console log

            console.log("Fetch error", err);

            // set errors
            setFormErrors(true);
          })
          .finally(() => {
            console.log("Fetch finished");

            // set loading false
            setFormLoading(false);
          });
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        onChange={handleChange}
        value={formData.name}
        type="text"
        name="name"
        placeholder="Product Name"
      />
      <input
        onChange={handleChange}
        value={formData.brand}
        type="text"
        name="brand"
        placeholder="Product brand"
      />
      <input
        onChange={handleChange}
        value={formData.year}
        type="text"
        name="year"
        placeholder="Product Year"
      />
      <input
        onChange={handleChange}
        value={formData.price}
        type="text"
        name="price"
        placeholder="Product Price"
      />
      <input
        onChange={handleChange}
        value={formData.stockCount}
        type="text"
        name="stockCount"
        placeholder="Product Stock Number"
      />
      <input
        onChange={handleChange}
        value={formData.rating}
        type="text"
        name="rating"
        placeholder="Product Rating"
      />
      <textarea
        onChange={handleChange}
        value={formData.description}
        name="description"
        placeholder="Product Description"
      ></textarea>
      <div>{formErrors && <div>Unable to submit data</div>}</div>
      <button type="submit">
        {formLoading
          ? "Adding ..."
          : selectedProduct?.id
            ? "Updating Product"
            : "Add Product"}
      </button>
    </form>
  );
};

export default Form;
