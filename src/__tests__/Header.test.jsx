import React from "react";
import {fireEvent, render, screen } from "@testing-library/react";
import Header from "../components/Header";
import { Provider } from "react-redux";
import appStore from "../utils/Slice/appStore";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";


it("Should check Header component renders without crashing", () => {
  render(
    <BrowserRouter>
    <Provider store={appStore}>
        <Header />);
    </Provider>     
    </BrowserRouter>
    ) 
    // const loginButton = screen.getAllByRole("button", { name: /login/i });
    // const loginButton = screen.getByText("Login");




    // expect(loginButton).toBeInTheDocument();
    // expect(loginButton[0]).toBeInTheDocument();
});


it("Should render Header component with a cart items 0", () => {
  render(
    <BrowserRouter>
    <Provider store={appStore}>
        <Header />);
    </Provider>     
    </BrowserRouter>
    ) 
   const cartItems = screen.getByText("Cart (0)");
    expect(cartItems).toBeInTheDocument();
    // expect(cartItems[0]).toBeInTheDocument(); 

    
});


it("Should render Header component with a cart items", () => {
  render(
    <BrowserRouter>
    <Provider store={appStore}>
        <Header />);
    </Provider>     
    </BrowserRouter>
    ) 
   const cartItems = screen.getByText(/Cart/);
    expect(cartItems).toBeInTheDocument();
    // expect(cartItems[0]).toBeInTheDocument(); 

    
});

it("Should change Login Button TO logout when click", () => {
  render(
    <BrowserRouter>
    <Provider store={appStore}>
        <Header />);
    </Provider>     
    </BrowserRouter>
    ) 
   const loginButton = screen.getByRole("button", { name: /login/i });
   fireEvent.click(loginButton);
   const logoutButton = screen.getByRole("button", { name: /logout/i });
  //  expect(loginButton).toBeInTheDocument();
   expect(logoutButton).toBeInTheDocument();

    
});
