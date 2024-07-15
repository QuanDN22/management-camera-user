import { createBrowserRouter } from "react-router-dom";
import AdminLayout from "./layout/AdminLayout";
import HomePage from "./page/home/HomePage";
import UserPage from "./page/user/UserPage";
import SearchPage from "./page/search/SearchPage";
import LoginForm from "./components/Login";
import CameraPage from "./page/camera/CameraPage";
import UserSearchPage from "./page/search/UserSearchPage";
import UserLayout from "./layout/UserLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <HomePage></HomePage>,
      },
      {
        path: "/cameras",
        element: <CameraPage />,
      },
      { path: "/users", element: <UserPage /> },
      { path: "/search", element: <SearchPage /> },
    ],
  },
  {
    path: "/auth/login",
    element: <LoginForm />,
  },
  {
    path: "/u",
    element: <UserLayout />,
    children: [
      {
        index: true,
        element: <UserSearchPage />
      }
    ]
  }
]);

export default router;
