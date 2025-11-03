import { useContext } from "react";
import CartContext from "../contexts/CartContext";
import Modal from "../ui/OrderModal";
import { currencyFormatter } from "../util/Formatting";
import Input from "../ui/Input";
import UserProgressContext from "../contexts/UserProgressContext";
import Button from "./../ui/Button";
import useHttp from "../util/useHttp";
import { useActionState } from "react";

const requestConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

export default function Checkout() {
  const cartCtx = useContext(CartContext);
  const userCtx = useContext(UserProgressContext);

  const { data, error, sendRequest, clearData } = useHttp(
    "http://localhost:3000/orders",
    requestConfig
  );

  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => (totalPrice = item.quantity * item.price),
    0
  );

  function handleClose() {
    // userCtx.hideCheckout();
    userCtx.showCart();
  }

  function handleFinish() {
    userCtx.hideCheckout();
    cartCtx.clearCart();
    clearData();
  }

  async function checkoutAction(prevState, fd) {
    const userData = Object.fromEntries(fd.entries());

    await sendRequest(
      JSON.stringify({
        order: {
          items: cartCtx.items,
          customer: userData,
        },
      })
    );
  }

  const [formState, formAction, pending] = useActionState(checkoutAction, null);

  let actions = (
    <>
      <Button type="button" textOnly onClick={handleClose}>
        Return
      </Button>
      <Button>Submit Order</Button>
    </>
  );

  if (pending) {
    actions = <span>Sending order data ... </span>;
  }

  if (data && !error) {
    return (
      <Modal open={userCtx.progress === "checkout"} onClose={handleFinish}>
        <h2>Success!</h2>
        <p>Your order was submitted successfully</p>
        <p>We will get back to you more details via email !</p>
        <p className="modal-actions">
          <Button onClick={handleFinish}>Okay</Button>
        </p>
      </Modal>
    );
  }

  return (
    <Modal open={userCtx.progress === "checkout"} onClose={handleClose}>
      <form  action={formAction}>
        <h2 className="center">Checkout </h2>
        
        <Input label="Full Name" type="text" id="name" />
        <Input label="Email" type="email" id="email" />
        <Input label="Address" type="text" id="street" />
        <Input label="Phone Number" type="number" id="phone" />
        <div className="control-row">
          <Input label="Postal Code" type="text" id="postal-code" />
          <Input label="City" type="text" id="city" />
        </div>

<p className="right">
        <p className="meal-item-price">
          Total Amount:{currencyFormatter.format(cartTotal)}
        </p></p>

        {error && (
          <div className="error">
            <h2>failed to send request</h2>
            <p>{error}</p>
          </div>
        )}

        <p className="modal-actions">{actions}</p>
      </form>
    </Modal>
  );
}
