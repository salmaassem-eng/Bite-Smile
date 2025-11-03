import { useContext } from "react";
import logoImg from "../assets/logo.jpg";
import Button from "../ui/Button";
import CartContext from "../contexts/CartContext";
import UserProgressContext from "../contexts/UserProgressContext";

export default function Header() {
  const cartCtx = useContext(CartContext);
  const userCtx = useContext(UserProgressContext);

  // reduce method ==> it return number of array length .
  const TotalItems = cartCtx.items.reduce((totalNumOfItems, item) => {
    return totalNumOfItems + item.quantity;
  }, 0); // 0 ==> start value

  function handleShowCart() {
    userCtx.showCart();
  }

  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImg} alt="A restaurant logo" />
        <h1>Bite & Smile</h1>
      </div>
      <nav>
        <Button textOnly onClick={handleShowCart}>
          Cart({TotalItems})
        </Button>
      </nav>
    </header>
  );
}
