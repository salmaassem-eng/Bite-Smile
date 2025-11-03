import Header from "./Components/Header";
import Meals from "./Components/Meals";
import { CartContextProvider } from "./contexts/CartContext";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify"; 
import  { UserProgressProvider } from "./contexts/UserProgressContext.jsx";
import Cart from "./Components/Cart";
import Checkout from "./Components/checkout.jsx";



function App() {
  return (
    <UserProgressProvider>
    <CartContextProvider>
        <ToastContainer position="top-right" autoClose={2000} />
      <Header/>
      <Meals/>
      <Cart/>
      <Checkout/>
    </CartContextProvider>
    </UserProgressProvider>
  );
}

export default App;
