import { useContext } from "react"
import logoImg from "../assets/logo.jpg"
import Button from "../ui/Button"
import CartContext from "../contexts/CartContext"

export default function Header(){
   const cartCtx =  useContext(CartContext);
   // reduce method ==> it return number of array length .
   const TotalItems = cartCtx.items.reduce((totalNumOfItems , item) => {
    return totalNumOfItems +item.quantity ;
   } , 0) // 0 ==> start value
    return(
        <header id="main-header">
            <div id="title">
                <img src={logoImg} alt="A restaurant logo" />
                <h1>Bite & Smile</h1>
            </div>
            <nav>
                <Button  textOnly>Cart({TotalItems})</Button>
            </nav>
        </header>
    )
}