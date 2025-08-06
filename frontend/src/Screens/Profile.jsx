import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useProfileUpdateMutation } from "../Store/features/user_slice";
import { useNavigate ,Link} from "react-router-dom";
import { toast } from "react-toastify";
import { setCredentials } from "../Store/features/authSlice";
import {Row,Col,Form,Button,Table} from 'react-bootstrap';
import { useGetOrdersQuery } from "../Store/features/order_slice.jsx";
import Loader from "../components/Loader.jsx";
import Message from '../components/Message.jsx'
import { FaTimes } from "react-icons/fa";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const UserInfo = useSelector((state) => state.auth);
  const [name, setName] = useState(UserInfo?.user?.name || "");
  const [email, setEmail] = useState(UserInfo?.email?.email || "");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");

  const [profileUpdate, { isLoading : ProfileUpdateLoading, error :ErrorInProfileUpdate }] = useProfileUpdateMutation();
  const { data: orders, isLoading, error } = useGetOrdersQuery();

  useEffect(() => {
    setName(UserInfo?.user?.name || "");
    setEmail(UserInfo?.email?.email || "");
    //THis is when profile is updated
  }, [UserInfo, name, email]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmpassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      const data = { name, email, password };
      const res = await profileUpdate(data).unwrap();
      dispatch(setCredentials(res));
      toast.success("Profile updated successfully");
      navigate("/profile");
    } catch (error) {
      toast.error(error?.data?.message || "Failed to update profile");
    }
  };

return (
  <Row>
    <Col md={3}>
      <h2>User Profile</h2>

      <Form onSubmit={submitHandler}>
        <Form.Group className="my-2" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm password"
            value={confirmpassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary">
          Update
        </Button>
        {ProfileUpdateLoading && <Loader />}
      </Form>
    </Col>
    <Col md={9}>
      <h2>My Orders</h2>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error?.data?.message || error.error}</Message>
      ) : (
        <Table striped hover responsive className="table-sm ">
          <thead>
            <tr>
              <th>ID</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>{order.totalPrice}</td>
                <td>
                  {order.isPaid ? (
                    order.paidAt.substring(0, 10)
                  ) : (
                    <div className="flex mt-1.5">
                      <FaTimes style={{ color: "red" }} />
                    </div>
                  )}
                </td>
                <td>
                  {order.isDelivered ? (
                    order.deliveredAt.substring(0, 10)
                  ) : (
                    <div className="flex mt-1.5">
                      <FaTimes style={{ color: "red" }} />
                    </div>
                  )}
                </td>
                <td>
                  <Button as={Link} to={`/orders/${order._id}`} className="btn-sm" variant="light">
                    Details
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Col>
  </Row>
);

};

export default Profile;
