import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addItem, removeItem, clearCart, setCart } from "../utils/Slice/cartSlice";
import ItemCard from "./ItemCard";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((store) => store.cart.items);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    const savedCart = localStorage.getItem("cartItems");
    if (savedCart) {
      dispatch(setCart(JSON.parse(savedCart)));
    }
  }, [dispatch]);

  const totalPrice = cartItems.reduce((total, item) => {
    const price = (item.card.info.price ?? item.card.info.defaultPrice ?? 0) / 100;
    return total + item.quantity * price;
  }, 0);

  const handleRemove = (id, name) => {
    dispatch(removeItem(id));
    setToastMessage(`Removed ${name}`);
    setTimeout(() => setToastMessage(""), 2000);
  };

  const handleAdd = (item, name) => {
    dispatch(addItem(item));
    setToastMessage(`Added ${name}`);
    setTimeout(() => setToastMessage(""), 2000);
  };

  return (
    <div className="text-center m-4 p-4 relative">
      <h1 className="text-2xl font-bold mb-4">Cart Items</h1>

      {toastMessage && (
        <div className="absolute top-2 right-2 bg-black text-white px-4 py-2 rounded shadow-lg z-50">
          {toastMessage}
        </div>
      )}

      {cartItems.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">Your cart is empty.</p>
      ) : (
        <>
          <button
            onClick={() => dispatch(clearCart())}
            disabled={cartItems.length === 0}
            className={`mb-4 font-bold py-2 px-4 rounded shadow text-white ${
              cartItems.length === 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-red-500 hover:bg-red-600"
            }`}
          >
            Clear Cart
          </button>

          <div className="space-y-4 max-w-xl mx-auto">
            {cartItems.map((item, index) => {
              const itemInfo = item?.card?.info;
              return (
                <div
                  key={itemInfo?.id || index}
                  className="flex justify-between items-center bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border border-gray-200 dark:border-gray-700"
                >
                  <div className="text-left">
                    <h4 className="font-semibold text-gray-800 dark:text-white">
                      {itemInfo.name}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      ₹{((itemInfo.price ?? itemInfo.defaultPrice ?? 0) / 100).toFixed(2)} × {item.quantity}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleAdd(item, itemInfo.name)}
                      className="bg-green-500 hover:bg-green-600 text-white font-bold px-3 py-1 rounded"
                    >
                      +
                    </button>
                    <button
                      onClick={() => handleRemove(itemInfo.id, itemInfo.name)}
                      className="bg-red-500 hover:bg-red-600 text-white font-bold px-3 py-1 rounded"
                    >
                      -
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 text-xl font-bold text-gray-800 dark:text-white">
            Total: ₹{totalPrice.toFixed(2)}
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
