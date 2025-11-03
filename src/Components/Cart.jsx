import { useContext } from "react";
import CartContext from "../contexts/CartContext";
import Modal from "../ui/OrderModal";
import { currencyFormatter } from "./../util/Formatting";
import Button from "./../ui/Button";
import UserProgressContext from "../contexts/UserProgressContext";
import CartItem from "./CartItem";

export default function Cart() {
  const cartCtx = useContext(CartContext);
  const userCtx = useContext(UserProgressContext);

  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => (totalPrice = item.quantity * item.price),
    0
  );

  function handleClose() {
    userCtx.hideCart();
  }

  function handleCheckout() {
    userCtx.showCheckout();
  }

  return (
    <Modal
      className="cart"
      open={userCtx.progress === "cart"}
      onClose={userCtx.progress === "cart" ? handleClose : null}
    >
      <h2 className="center">Your Cart</h2>
      <ul>
        {cartCtx.items.map((item) => (
          <CartItem
            key={item.id}
            name={item.name}
            quantity={item.quantity}
            price={item.price}
            onIncrease={() => cartCtx.addItem(item)}
            onDecrease={() => cartCtx.removeItem(item.id)}
          />
        ))}
      </ul>
      <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
      <p className="modal-actions">
        <Button textOnly onClick={handleClose}>
          Close
        </Button>
        {cartCtx.items.length > 0 && (
          <Button onClick={handleCheckout}>Complete Checkout</Button>
        )}
      </p>
    </Modal>
  );
}
