import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Logout from "./pages/Logout.jsx";
import Home from "./pages/Home.jsx";
import { store } from "../Redux/store/store.js";
import { Provider } from "react-redux";
import Application from "./pages/Application.jsx";
import Slip from "./pages/Slip.jsx";

const router = createBrowserRouter([
  {
    path: "",
    element: <App />,
    children: [
      {
        path: "/Register",
        element: <Register />,
      },
      {
        path: "/Home",
        element: <Home />,
      },
      {
        path: "/Login",
        element: <Login />,
      },
      {
        path: "/application",
        element: <Application />,
      },
      {
        path: "/slip",
        element: <Slip />,
      },
      {
        path: "/Logout",
        element: <Logout />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
    <Provider store={store}>
  <RouterProvider router={router}>
    <App />
  </RouterProvider>
    </Provider>
);
