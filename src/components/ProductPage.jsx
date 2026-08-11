const ProductPage = ({
  products,
  errors,
  loading,
  selectProduct,
  deleteProduct,
}) => {
  function handleDelete(productId) {
    fetch(`http://localhost:3000/products/${productId}`, {
      method: "DELETE",
    }).then(() => deleteProduct(productId));
  }

  if (loading) {
    return <div>Loading Products</div>;
  }

  if (errors) {
    return <div>Error fetching products</div>;
  }

  if (products.length <= 0) {
    return <div>Products not available</div>;
  }

  return (
    <div>
      {products.map((product) => (
        <div key={product.id}>
          <p>{product.name}</p>
          <p>{product.brand}</p>
          <p>{product.year}</p>
          <p>{product.price}</p>
          <p>{product.inStock}</p>
          <p>{product.stockCount}</p>
          <p>{product.rating}</p>
          <p>{product.description}</p>
          <img className="w-[500px] h-[500px]" src={product.image} alt="" />
          {/* {product.specs.map((spec) => (
            <div>
              <p>{spec}</p>
            </div>
          ))} */}

          <button
            className="cursor-pointer bg-green-500 p-8 mt-4"
            onClick={() => selectProduct(product.id)}
          >
            Edit Product
          </button>

          <button
            className="cursor-pointer bg-red-500 p-8 mt-4"
            onClick={() => handleDelete(product.id)}
          >
            Delete Product
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductPage;
