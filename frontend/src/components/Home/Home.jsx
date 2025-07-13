import React,{useState,useEffect} from "react";
import axios from 'axios';
import { Row, Col } from "react-bootstrap";
import ProductCard from "./ProductCard";
const Home = () => {
  const [products, setproducts] = useState([]);

   useEffect(() => {
     const fetchProducts = async () => {
       try {
         const {data} = await axios.get("/api/products");
         setproducts(data); // No need for .json() axios auto do it for json format
       } catch (error) {
         console.error("Error in Home: No Data fetched", error);
       }
     };

     fetchProducts();
   }, []);

  return (
    <div className="p-3 my-3">
      <Row>
        {products.map((product) => {
          return (
            <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
              <ProductCard product={product} />
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default Home;
