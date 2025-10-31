import { currencyFormatter } from "./../util/Formatting.js";
import Button from "../ui/Button.jsx";
import CartContext from "../contexts/CartContext.jsx";
import { useContext } from "react";
import { toast } from "react-toastify";

export default function MealItem({ meal }) {
    
  const cartCtx = useContext(CartContext);
  function handleAddMeal() {
    cartCtx.addItem(meal);
    toast.success(`${meal.name} added to cart! `, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
    });
  }

  return (
    <li className="meal-item">
      <article>
        <img src={`http://localhost:3000/${meal.image}`} alt={meal.name} />
        <div>
          <h3>{meal.name}</h3>
          <p className="meal-item-description">{meal.description}</p>
          <p className="meal-item-price">
            {currencyFormatter.format(meal.price)}
          </p>
        </div>
        <p className="meal-item-actions">
          <Button onClick={handleAddMeal}>Add to cart</Button>
        </p>
      </article>
    </li>
  );
}
