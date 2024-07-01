import { createBrowserRouter } from "react-router-dom";
import Layout from "./layout/";
import HomePage from "./page/home-page";
import ProductPage from "./page/product-page";
import UserPage from "./page/user-page";
import SearchPage from "./page/search-page";
import LoginForm from "./components/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage></HomePage>,
      },
      {
        path: "/cameras",
        element: <ProductPage />,
      },
      { path: "/users", element: <UserPage /> },
      { path: "/search", element: <SearchPage /> },
    ],
  },
  {
    path: "/auth/login",
    element: <LoginForm />,
  },
]);

export default router;
