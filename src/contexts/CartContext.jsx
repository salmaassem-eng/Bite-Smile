import { createContext, useReducer } from "react";
const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
});

function cartReducer(state, action) {
  if (action.type === "add_Item") {
    const CartItemIndx = state.items.findIndex(
      (item) => item.id === action.item.id
    );

// to save the old items so when I count the same recipe, it will not add one more item but only increase quantity
const updatedItems= [...state.items];  

    if (CartItemIndx > -1) { // which mean you add this item
        const  existingItem = state.items[CartItemIndx]
        const UpdatedItem={
            ...existingItem,
            quantity: state.items[CartItemIndx].quantity+1
        }
        updatedItems[CartItemIndx] =UpdatedItem;
    }  
    else{
            updatedItems.push({...action.item , quantity :1})
        }

        return {...state, items :updatedItems}
    }
  

  if (action.type === "remove_Item") {
     const CartItemIndx = state.items.findIndex(
      (item) => item.id === action.id 
    );
    const existingCartItem = state.items[CartItemIndx];

    if(existingCartItem.quantity ===1){
        const updatedItems =[...state.items];
        updatedItems.splice(CartItemIndx ,1);
    }
    else{
        const updatedItem = {
            ...existingCartItem,
            quantity : existingCartItem.quantity-1,
        }
        updatedItems[CartItemIndx] = updatedItem
    }

            return {...state, items :updatedItems}

  }

  return state;
}
export  function CartContextProvider({ children }) {
 const[cart , dispatchCartAction] = useReducer(cartReducer, { items: [] });

 function addItem(item){
  dispatchCartAction({type:'add_Item' , item});
 }

  function removeItem(item){
  dispatchCartAction({type:'remove_Item' , id});
 }

 const ContextValue = {
  items: cart.items,
  addItem,
  removeItem,
 };

  return <CartContext.Provider value={ContextValue}>{children}</CartContext.Provider>;
}
export default CartContext;
