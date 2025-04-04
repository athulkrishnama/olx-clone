import React from "react";

/**
 * ?  =====Import Components=====
 */
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Create from "./Pages/Create";
import View from "./Pages/ViewPost";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AuthContext, PostContextProvider } from "./context";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/create",
      element: <Create />,
    },
    {
      path: "/view",
      element: <View />,
    },
  ]);
  return (
    <PostContextProvider>
      <AuthContext>
        <RouterProvider router={router} />
      </AuthContext>
    </PostContextProvider>
  );
}

export default App;
