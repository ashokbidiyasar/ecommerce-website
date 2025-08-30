import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./Rating";

const Product = ({ product }) => {
  return (
    <Card className="my-3 p-3 rounded-lg shadow-md hover:shadow-xl transition duration-300">
      {/* Product Image */}
      <Link to={`/product/${product._id}`}>
        <div className="overflow-hidden rounded-lg">
          <Card.Img
            src={product.image}
            variant="top"
            className="object-cover w-full h-56 hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>

      {/* Card Body */}
      <Card.Body className="flex flex-col gap-2">
        {/* Product Name */}
        <Link to={`/product/${product._id}`}>
          <Card.Title
            as="div"
            className="text-lg font-semibold text-gray-800 hover:text-green-600 transition line-clamp-1"
          >
            {product.name}
          </Card.Title>
        </Link>

        {/* Rating */}
        <Card.Text as="div">
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Card.Text>

        {/* Price */}
        <Card.Text as="h3" className="text-xl font-bold text-green-600">
          ${product.price}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
