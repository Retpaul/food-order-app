import { createContext, useReducer } from "react";

export const CartContext = createContext({
  // Creating new context
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
});
//reducer Dispatch function, takes two params," state " which ensures latest current state snapshot
// and action which can be used to handle dispatched action, it basically contains an object which
// contains type of actions and payload (other properties)
function cartReducer(state, action) {
  //handles any dispatched action with type "ADD_ITEM"
  if (action.type === "ADD_ITEM") {
    //this will check index of item, if it exists it will return index or else -1
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.payload.id
    );
    const updatedItems = [...state.items]; //Make copy of original array so changes made will not affect original array
    if (existingCartItemIndex > -1) {
      //if cart item exists just increase quantity
      //Dont use a copy of an array to find the index of items in array use the real array
      const existingItem = state.items[existingCartItemIndex];
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem; //update item in updateditems it will replace the item with with that index in updated items
    } else {
      // if it doesnt exist add new item to cart
      updatedItems.push({ ...action.payload, quantity: 1 });
    }
    return { ...state, items: updatedItems };
  }

  if (action.type === "REMOVE_ITEM") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingItem = state.items[existingCartItemIndex];
    const updatedItems = [...state.items];
    if (existingItem.quantity === 1) {
      updatedItems.splice(existingCartItemIndex, 1);
    } else {
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity - 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    }
    return { ...state, items: updatedItems };
  }

  return state;
}

export default function CartContextProvider({ children }) {
  const [cart, dispatchCartAction] = useReducer(
    cartReducer, //advance state management, 1st arg connects usereducer function
    {
      items: [], //second argument is an initial state
    }
  );

  function addItemToCartHandler(item) {
    dispatchCartAction({ type: "ADD_ITEM", payload: item });
  }
  function removeItemFromCartHandler(id) {
    dispatchCartAction({ type: "REMOVE_ITEM", id });
  }
  const ctxData = {
    items: cart.items,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };


  return (
    <CartContext.Provider value={ctxData}>{children}</CartContext.Provider>
  );
}
