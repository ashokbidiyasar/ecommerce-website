import React, { useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button, Row, Col, ListGroup, Card, Image } from "react-bootstrap";
import {
  useGetOrderDetailQuery,
  useCreateStripeSessionMutation,
  usePayOrderMutation,
  useDeliverOrderMutation,
} from "../Store/features/order_slice";

const OrderScreen = () => {
  const { id: orderId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const { UserInfo } = useSelector((state) => state.auth);

  const { data: order, isLoading, error, refetch } = useGetOrderDetailQuery(orderId);
  const [payOrder, { isLoading: loadingPay, error: payError }] = usePayOrderMutation();
  const [createStripeSession, { isLoading: isPaying }] = useCreateStripeSessionMutation();
  const [deliverOrder, { isLoading: loadingDeliver }] = useDeliverOrderMutation();

  const query = new URLSearchParams(location.search);
  const isSuccess = query.get("success") === "true";
  const isCanceled = query.get("canceled") === "true";

  useEffect(() => {
    const handleStripeSuccess = async () => {
      if (isSuccess && order && !order.isPaid) {
        try {
          await payOrder(orderId).unwrap();
          refetch();
        } catch (err) {
          console.error("Failed to mark order as paid:", err);
        } finally {
          navigate(`/orders/${orderId}`, { replace: true });
        }
      }

      if (isCanceled) {
        navigate(`/orders/${orderId}`, { replace: true });
      }
    };

    if ((isSuccess || isCanceled) && order) {
      handleStripeSuccess();
    }
  }, [location.search, order, orderId, payOrder, refetch, isSuccess, isCanceled, navigate]);

  const handlePayment = async () => {
    try {
      const response = await createStripeSession({
        orderItems: order.orderItems,
        orderId: order._id,
        totalPrice: order.totalPrice,
      }).unwrap();

      window.location.href = response.url;
    } catch (err) {
      console.error("Payment error:", err);
      alert("Failed to initiate payment session");
    }
  };

  const deliverHandler = async () => {
    await deliverOrder(orderId);
    refetch();
  };

  return (
    <>
      <h1>Order Summary</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error?.data?.message || error.error}</p>
      ) : (
        <>
          {isSuccess && <p style={{ color: "green" }}>✅ Payment successful!</p>}
          {isCanceled && <p style={{ color: "red" }}>❌ Payment was canceled.</p>}

          <Row>
            <Col md={8}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h2>Shipping</h2>
                  <p>
                    <strong>Name:</strong> {order.user.name}
                  </p>
                  <p>
                    <strong>Email:</strong> {order.user.email}
                  </p>
                  <p>
                    <strong>Address:</strong>{" "}
                    {order.shippingAddress.address}, {order.shippingAddress.city},{" "}
                    {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                  </p>
                </ListGroup.Item>

                <ListGroup.Item>
                  <h2>Payment Method</h2>
                  <p>{order.paymentMethod}</p>
                </ListGroup.Item>

                <ListGroup.Item>
                  <h2>Order Items</h2>
                  {order.orderItems.length === 0 ? (
                    <p>Order is empty</p>
                  ) : (
                    <ListGroup variant="flush">
                      {order.orderItems.map((item, index) => (
                        <ListGroup.Item key={index}>
                          <Row>
                            <Col md={1}>
                              <Image src={item.image} alt={item.name} fluid rounded />
                            </Col>
                            <Col>{item.name}</Col>
                            <Col>
                              {item.qty} x ${item.price} = ${item.qty * item.price}
                            </Col>
                          </Row>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>

            <Col md={4}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h2>Order Summary</h2>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Items:</Col>
                      <Col>${order.itemsPrice}</Col>
                    </Row>
                    <Row>
                      <Col>Shipping:</Col>
                      <Col>${order.shippingPrice}</Col>
                    </Row>
                    <Row>
                      <Col>Tax:</Col>
                      <Col>${order.taxPrice}</Col>
                    </Row>
                    <Row>
                      <Col>Total:</Col>
                      <Col>${order.totalPrice}</Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    {loadingPay && <p>Updating payment...</p>}
                    {payError && <p style={{ color: "red" }}>{payError?.data?.message || payError.error}</p>}
                    {!order.isPaid && (
                      <Button
                        type="button"
                        className="btn-block"
                        onClick={handlePayment}
                        disabled={isPaying || order.isPaid}
                      >
                        {isPaying ? "Processing..." : "Pay Now"}
                      </Button>
                    )}
                    {order.isPaid && <p style={{ color: "green", fontWeight: "bold" }}>Order Paid ✅</p>}
                  </ListGroup.Item>

                  {/* Admin Deliver Button */}
                  {UserInfo && UserInfo.isAdmin && order.isPaid && !order.isDelivered && (
                    <ListGroup.Item>
                      {loadingDeliver && <p>Marking as delivered...</p>}
                      <Button
                        type="button"
                        className="btn-block btn-success"
                        onClick={deliverHandler}
                      >
                        Mark as Delivered
                      </Button>
                    </ListGroup.Item>
                  )}

                  {order.isDelivered && (
                    <ListGroup.Item>
                      <p style={{ color: "green", fontWeight: "bold" }}>Order Delivered ✅</p>
                    </ListGroup.Item>
                  )}
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default OrderScreen;
