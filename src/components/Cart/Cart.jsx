import { useContext } from "react";
import Modal from "../../UI/Modal";
import { CartContext } from "../../store/CartContext";
import { currencyFormatter } from "../../utils/formatting";
import Button from "../../UI/Button";
import { UserProgressContext } from "../../store/UserProgressContext";
import CartItem from "./CartItem";

export default function Cart() {
  const { items } = useContext(CartContext);
  const { progress, hideCart, showCheckout,hideCheckout } = useContext(UserProgressContext);

  const cartTotal = items.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  return (
    <Modal className="cart" open={progress === "cart"} onClose={progress==='cart' ? ()=> hideCheckout():null}>
      <h2>Your Cart</h2>
      <ul>
        {items.map((item) => {
          return <CartItem item={item} key={item.id} />;
        })}
      </ul>

      <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
      <p className="modal-actions">
        <button className="text-button" onClick={() => hideCart()}>
          Close
        </button>
      {items.length > 0 && <Button onClick={() => showCheckout()}> Go to Checkout</Button>}  
      </p>
    </Modal>
  );
}
