import React from "react";
import { Link } from "react-router-dom";
import ReactStars  from 'react-rating-star-with-type';
import { useTheme } from "../../utils/context/ThemeContext";
const Product = ({ product }) => {
  const theme=useTheme()
  const options = {
  color:"rgba(20,20,20,0.1)",
    isEdit:false,
    activeColor:theme.color,
    value:product.rating,
    size:window.innerWidth<600?20:25
  };
  return (
    <Link className="productCard" to={`/product/${product._id}`}>
      <img src={product.images[0].url} alt={product.name} />
      <p>{product.name}</p>
      <div>
        <ReactStars {...options} />{" "}
        <span className="productCardSpan">
          {product.reviews.length}
        </span>
      </div>
      <span>{`₹${product.price}`}</span>
    </Link>
  );
};

export default Product;
