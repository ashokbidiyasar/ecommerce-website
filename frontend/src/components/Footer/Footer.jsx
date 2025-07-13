import React from 'react'
import { Container ,Row,Col} from 'react-bootstrap'
const Footer = () => {
    const currentyear = new Date().getFullYear();
  return (
    <footer>
        <Container>
            <Row>
                <Col>
                <p>Proshop &copy;{currentyear}</p>
                </Col>
            </Row>
        </Container>
    </footer>
  )
}

export default Footer