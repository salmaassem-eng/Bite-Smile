import Header from "./Components/Header";
import Meals from "./Components/Meals";
import { CartContextProvider } from "./contexts/CartContext";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify"; 



function App() {
  return (
    <CartContextProvider>
        <ToastContainer position="top-right" autoClose={2000} />
      <Header/>
      <Meals/>
    </CartContextProvider>
  );
}

export default App;
