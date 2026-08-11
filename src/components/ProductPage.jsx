import React from "react";

const ProductPage = ({ products, errors, loading }) => {
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
        </div>
      ))}
    </div>
  );
};

export default ProductPage;
