import { useState } from "react";

const Form = ({ addProduct }) => {
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    year: "",
    price: "",
    stockCount: "",
    rating: "",
    description: "",
  });

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

    addProduct(formData);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input onChange={handleChange} type="text" name="name" />
      <input onChange={handleChange} type="text" name="brand" />
      <input onChange={handleChange} type="text" name="year" />
      <input onChange={handleChange} type="text" name="price" />
      <input onChange={handleChange} type="text" name="stockCount" />
      <input onChange={handleChange} type="text" name="rating" />
      <textarea onChange={handleChange} name="description"></textarea>
    </form>
  );
};

export default Form;
