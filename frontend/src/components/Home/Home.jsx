import { Row, Col } from "react-bootstrap";
import ProductCard from "./ProductCard";
import {useGetProductsQuery } from '../../Store/features/product_slice.jsx'
import NewSpinner from "./Spinner";

const Home = () => {
  const { data: products, isLoading, isError } = useGetProductsQuery();
  return (
    <>
      {isLoading ? 
        <NewSpinner/>
       : isError ? (
        <div>
          <h2>Could not find products</h2>
        </div>
      ) : (
        <div className="p-3 my-3">
          <Row>
            {products?.map((product) => (
              <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>
        </div>
      )}
    </>
  );
};

export default Home;
