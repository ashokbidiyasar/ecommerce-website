import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from './Store/store/store.jsx'
import "./index.css";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home/Home.jsx";
import ProductScreen from "./Screens/ProductScreen.jsx";
import CartScreen from "./Screens/CartScreen.jsx";
import LoginScreen from "./Screens/LoginScreen.jsx";
import RegisterScreen from "./Screens/RegisterScreen.jsx";
import ShippingScreen from "./Screens/ShippingScreen.jsx";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute.jsx";
import PaymentScreen from "./Screens/PaymentScreen.jsx"
import PlaceOrderScreen from './Screens/PaymentScreen.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
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
        element: <PrivateRoute />, //  Wraps the protected routes
        children: [
          { path: "/shipping", element: <ShippingScreen /> },
          // Add more protected routes here
          { path: "/payment", element: <PaymentScreen /> },
          {path : '/placeorder',element: <PaymentScreen />},
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
