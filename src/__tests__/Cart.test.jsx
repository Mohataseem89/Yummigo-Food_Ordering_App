import React from "react";
import { render, screen, act, fireEvent } from "@testing-library/react";
import RestoMenu from "../components/RestoMenu";
import MOCK_DATA_NAME from "../utils/mocks/mockresmenu.json";
import Cart from "../components/Cart";
import { Provider } from "../context/Context";
import appStore from "../utils/slice/appStore.";
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(MOCK_DATA_NAME),
  })
);

it("Should load restoraunt menu Component", async () => {
  await act(async () =>
    render(
      <Provider store={appStore}>
        <Header/>
        <RestoMenu />
        <Cart/>
      </Provider>
    )
  );

  const accordionheader = screen.getByText("Bowls (93)");
  fireEvent.click(accordionheader);

  expect(screen.getAllByTestId("menu-item").length).toBe(93)

  expect(screen.getByText("Cart (0)")).toBeInTheDocument();

  const addBtns = screen.getAllByRole("button", { name: "ADD"});
  fireEvent.click(addBtns[0]);
  
  expect(screen.getByText("Cart (2)")).toBeInTheDocument();

expect(screen.getAllByTestId("menu-item").length).toBe(95);

});
