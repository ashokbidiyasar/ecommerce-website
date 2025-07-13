import React from "react";
import { Card } from "react-bootstrap";
import Rating from './Rating';
const ProductCard = ({ product }) => {
  return (
    <Card className="my-3 p-3 rounded-md">
      <a href={`/product/${product.image}`}>
        <Card.Img src={product.image} variant="top" />
      </a>

      <Card.Body>
        <a href={`product/${product._id}`}>
          <Card.Title as="div" className="truncate w-full">
            <strong>{product.name}</strong>
          </Card.Title>
        </a>

        <Card.Text as="div">
          <Rating rating={product.rating} reviews={product.numReviews} />
        </Card.Text>
        <Card.Text as="h3">${product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
