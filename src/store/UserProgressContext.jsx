import { createContext, useReducer, useState } from "react";

export const UserProgressContext = createContext({
  progress: "", // can be later set to 'cart' or 'checkout' to display different Modals
  showCart: () => {},
  hideCart: () => {},
  showCheckout: () => {},
  hideCheckout: () => {},
});

export default function UserProgressContextProvider({ children }) {
  const [Userprogress, setUserProgress] = useState("");
  function showCart() {
    setUserProgress("cart");
  }
  function hideCart() {
    setUserProgress("");
  }
  function showCheckout() {
    setUserProgress("checkout");
  }
  function hideCheckout() {
    setUserProgress("");
  }
  const CtxData = {
    progress: Userprogress,
    showCart,
    hideCart,
    showCheckout,
    hideCheckout,
  };
  return (
    <UserProgressContext.Provider value={CtxData}>
      {children}
    </UserProgressContext.Provider>
  );
}
