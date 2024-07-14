import { createBrowserRouter } from "react-router-dom";
import MyLayout from "./layout/MyLayout";
import HomePage from "./page/home/HomePage";
import ProductPage from "./page/product/ProductPage";
import UserPage from "./page/user/UserPage";
import SearchPage from "./page/search/SearchPage";
import LoginForm from "./components/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MyLayout />,
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
