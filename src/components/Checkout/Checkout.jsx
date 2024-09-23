import React, { useContext } from "react";
import Input from "../../UI/Input";
import Modal from "../../UI/Modal";
import { currencyFormatter } from "../../utils/formatting";
import { CartContext } from "../../store/CartContext";
import { UserProgressContext } from "../../store/UserProgressContext";
import Button from "../../UI/Button";
import useHttp from "../../hooks/useHttp";
import Error from "../Error";

const reqConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

export default function Checkout() {
  const { items } = useContext(CartContext);
  const { progress, hideCheckout } = useContext(UserProgressContext);

  const {
    data,
    isLoading: isSending,
    error,
    sendRequest,
  } = useHttp("http://localhost:3000/order",reqConfig);
  const cartTotal = items.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  function handleFormSubmit(e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    // fd.get('full-name') Get data of input with name prop ful-name
    const customerData = Object.fromEntries(fd.entries()); //Get data object with name as key and value entered as value

    sendRequest(
      JSON.stringify({
        order: { items, customer: customerData },
      })
    );
  }

  let actions = (
    <>
      <Button textOnly type="button" onClick={() => hideCheckout()}>
        Close
      </Button>
      <Button>Submit Order</Button>
    </>
  );
  if (isSending) {
    actions = <span>Sending order data ...</span>;
  }

  return (
    <Modal open={progress === "checkout"} onClose={() => hideCheckout()}>
      <form onSubmit={handleFormSubmit}>
        <h2>Checkout</h2>
        <p>Total Amount:{currencyFormatter.format(cartTotal)}</p>
        <Input id="name" label="Full Name" type="text" />
        <Input id="email" label="E-Mail Address" type="email" />
        <Input id="street" label="Street" type="text" />
        <div className="row-control">
          <Input id="postal-code" label="Postal Code" type="text" />
          <Input id="city" label="City" type="text" />
        </div>

        {error && <Error title='Failed to Submit order' message={error}/>}
        <p className="modal-actions">
            {actions}
        </p>
      </form>
    </Modal>
  );
}
