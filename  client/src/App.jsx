import React from "react";
import Navbar from "./component/navbar/Navbar"
import Footer from "./pages/footer/Footer"
import  Home  from "./pages/home/Home";
import Gigs from "./pages/gigs/Gigs";
import Orders from "./pages/orders/Orders";
import Gig from "./pages/gig/Gig";
import Add from "./pages/add/Add";
import Messages from "./pages/messages/Messages";
import Message from "./pages/message/Message";
import MyGigs from "./pages/myGigs/MyGigs";
import Login from "./pages/login/Login";
import OtpSend from "./pages/login/OtpSend";
import "./App.scss";
import OtpVerify from "./pages/login/OtpVerify";
import Register from "./pages/register/Register";
import Pay from "./pages/pay/Pay";
import Success from "./pages/success/Success";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";

import { createBrowserRouter, RouterProvider,Outlet } from "react-router-dom";
function App() {
  const queryClient = new QueryClient();
  const Layout = ()=>

  {
    return (
      <div className="app">
        <QueryClientProvider client={queryClient}>
          <Navbar />
          <Outlet />
          {Location.pathname !== "/message/:id" && <Footer />}
        </QueryClientProvider>
      </div>
    );
  }
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/OtpSend",
          element: <OtpSend />,
        },
        {
          path: "/OtpVerify",
          element: <OtpVerify/>,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/myGigs",
          element: <MyGigs />,
        },
        {
          path: "/gig/:id",
          element: <Gig/>,
        },
        {
          path: "/orders",
          element: <Orders />,
        },
        {
          path: "/gigs",
          element: <Gigs/>,
        },
        {
          path: "/add",
          element: <Add />,
        },
        {
          path: "/messages",
          element: <Messages />,
        },
        {
          path: "/message/:id",
          element: <Message />,
        },
        {
          path: "/pay/:id",
          element: <Pay />,
        },
        {
          path: "/success",
          element: <Success />,
        },
      ],
    },
  ]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App
