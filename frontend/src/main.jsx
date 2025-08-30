import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from './Store/store/store.jsx'
import "./index.css";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home/Home.jsx";
import { HelmetProvider } from "@dr.pogodin/react-helmet";
import ProductScreen from "./Screens/ProductScreen.jsx";
import CartScreen from "./Screens/CartScreen.jsx";
import LoginScreen from "./Screens/LoginScreen.jsx";
import RegisterScreen from "./Screens/RegisterScreen.jsx";
import ShippingScreen from "./Screens/ShippingScreen.jsx";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute.jsx";
import AdminRoute from "./components/adminRoute/AdminRoute.jsx";
import PaymentScreen from "./Screens/PaymentScreen.jsx"
import PlaceOrderScreen from './Screens/PlaceOrderScreen.jsx';
import OrderScreen from "./Screens/OrderScreen.jsx";
import Profile from './Screens/Profile.jsx'
import OrderlistScreen from './Screens/admin/OrderlistScreen.jsx'
import ProductListScreen from "./Screens/admin/ProductListScreen.jsx";
import ProductEditScreen from "./Screens/admin/ProductEditScreen.jsx";
import UserListScreen from "./Screens/admin/UserListScreen.jsx";
import UserEditScreen from "./Screens/admin/UserEditScreen.jsx";
import HomeScreen from "./Screens/HomeScreen.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomeScreen />,
      },
      {
        path: "/product/:id",
        element: <ProductScreen />,
      },
      {
        path: "/cart",
        element: <CartScreen />,
      },
      {
        path: "/login",
        element: <LoginScreen />,
      },
      {
        path: "/register",
        element: <RegisterScreen />,
      },
      {
        path: "/search/:keyword",
        element: <HomeScreen />,
      },
      {
        path: "/page/:pageNumber",
        element: <HomeScreen />,
      },
      {
        path: "/search/:keyword/page/:pageNumber",
        element: <HomeScreen />,
      },
      {
        element: <PrivateRoute />, //  Wraps the protected routes
        children: [
          { path: "/shipping", element: <ShippingScreen /> },
          // Add more protected routes here
          { path: "/payment", element: <PaymentScreen /> },
          { path: "/placeorder", element: <PlaceOrderScreen /> },
          { path: "/orders/:id", element: <OrderScreen /> },
          { path: "/profile", element: <Profile /> },
        ],
      },
      {
        element: <AdminRoute />, //  Wraps the protected routes
        children: [
          { path: "/admin/orderlist", element: <OrderlistScreen /> },
          { path: "/admin/productlist", element: <ProductListScreen /> },
          { path: "/admin/product/:id/edit", element: <ProductEditScreen /> },
          { path: "/admin/userlist", element: <UserListScreen /> },
          { path: "/admin/user/:id/edit", element: <UserEditScreen /> },
        ],
      },
    ],
  },
]);


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </HelmetProvider>
  </StrictMode>
);
