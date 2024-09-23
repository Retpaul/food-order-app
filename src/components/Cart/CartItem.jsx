import React, { useContext } from "react";
import { currencyFormatter } from "../../utils/formatting";
import { CartContext } from "../../store/CartContext";

export default function CartItem({ item }) {
  const { addItem, removeItem } = useContext(CartContext);
  return (
    <li className="cart-item">
      <p>
        {item.name}- {item.quantity}x {currencyFormatter.format(item.price)}
      </p>
      <p className="cart-item-actions">
        <button onClick={() => removeItem(item.id)}>-</button>
        <span>{item.quantity}</span>
        <button onClick={() => addItem(item)}>+</button>
      </p>
    </li>
  );
}
