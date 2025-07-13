import React,{useState,useEffect} from "react";
import { useParams } from "react-router-dom";
import { Row, Col, Image, ListGroup, Card } from "react-bootstrap";
import Rating from "../components/Home/Rating";
import axios from "axios";



const ProductScreen = () => {
   const {id} = useParams();
   const [product, setproduct] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const {data} = await axios.get(`/api/products/${id}`);
        setproduct(data); // Axios auto-parses JSON
      } catch (error) {
        console.error("Error in ProductScreen", error);
      }
    };

    fetchProduct();
  }, [id]);
  return (
    <>
      <Row>
        <Col md={6}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>

        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3 className="truncate w-full">{product.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating rating={product.rating} reviews={product.numReviews} />
            </ListGroup.Item>
            <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
            <ListGroup.Item>Description: {product.description}</ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>${product.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>{product.countInStock > 0 ? "In Stock" : "Out Of Stock"}</Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ProductScreen;
