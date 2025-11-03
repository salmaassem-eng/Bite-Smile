import { useState } from "react";
import { currencyFormatter } from "../util/Formatting";
import Modal from "../ui/OrderModal";
import Button from "../ui/Button";

export default function CartItem({
  name,
  quantity,
  price,
  onIncrease,
  onDecrease,
}) {
  const [confirmOpen, setConfirmOpen] = useState(false);

  function handleDecrease() {
    if (quantity === 1) {
      setConfirmOpen(true);
    } else {
      onDecrease();
    }
  }

  function confirmRemove() {
    onDecrease(); 
    setConfirmOpen(false);
  }

  function cancelRemove() {
    setConfirmOpen(false);
  }

  return (
    <>
      <li className="cart-item">
        <p>
          {name} - {quantity} X   {currencyFormatter.format(price)}

        </p>
  
        <p className="cart-item-actions">
          <button onClick={handleDecrease}>-</button>
          <span>{quantity}</span>
          <button onClick={onIncrease}>+</button>
        </p>
      </li>

      {confirmOpen && (
        <Modal open={confirmOpen} onClose={cancelRemove}>
          <h3>Remove item?</h3>
          <p>
            Are you sure you want to remove <b>{name}</b> from your cart?
          </p>
          <div className="modal-actions">
            <Button textOnly onClick={cancelRemove}>
              Cancel
            </Button>
            <Button onClick={confirmRemove}>Remove</Button>
          </div>
        </Modal>
      )}
    </>
  );
}
