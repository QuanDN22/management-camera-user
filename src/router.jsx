import { createBrowserRouter } from "react-router-dom";
import MyLayout from "./layout/MyLayout";
import HomePage from "./page/home/HomePage";
import UserPage from "./page/user/UserPage";
import SearchPage from "./page/search/SearchPage";
import LoginForm from "./components/Login";
import CameraPage from "./page/camera/CameraPage";
import UserSearchPage from "./page/search/UserSearchPage";

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
    element: <UserSearchPage />
  }
]);

export default router;
