import React, { lazy, Suspense, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import About from "./components/About";
import Contact from "./components/Contact";
import Error from "./components/Error";
import Cart from "./components/Cart";
import RestoMneu from "./components/RestoMenu";
import Shimmer from "./components/shimmer";
import userContext from "./utils/UserContext";
import { Provider } from "react-redux";
// import { useState } from "react";
// import Grocery from "./components/Grocery";
// import appStore from "./utils/appStore";
import appStore from "./utils/Slice/appStore"; // Importing the Redux store

const Grocery = lazy(() => import("./components/Grocery")); // Lazy loading Grocery component
const AppLayout = () => {
  const [userName, setUserName] = useState();

  // authentication
  useEffect(() => {
    // make an api call and send username and password
    const data = {
      name: "Mohataseem",
      location: "Mumbai",
      loggedInuser: "Mohataseem Khan",
    };
    setUserName(data.name);
  }, []);

  return (
    <Provider store={appStore}>
    <userContext.Provider value={{ loggedInuser: userName, setUserName }}>
      <div className="app">
        {/* <userContext.Provider value={{ loggedInuser: "elon" }}> */}
        <Header />
        {/* </userContext.Provider> */}
        <Outlet />
      </div>
    </userContext.Provider>
    </Provider>
  );
};
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        // element: <AppLayout />,
        element: <Body />,
      },
      {
        path: "/home",

        element: <Body />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/grocery",
        element: (
          <Suspense fallback={<Shimmer />}>
            <Grocery />
          </Suspense>
        ),
      },
      {
        path: "/restaurants/:id",
        element: <RestoMneu />,
      },
    ],
    errorElement: <Error />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(<AppLayout />);
root.render(<RouterProvider router={appRouter} />);
