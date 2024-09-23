import React, { useContext } from "react";
import logo from "/logo.jpg";
import Button from "../UI/Button";
import { CartContext } from "../store/CartContext";
import { UserProgressContext } from "../store/UserProgressContext";

export default function Header() {
 const {items}= useContext(CartContext)
 const {showCart} = useContext(UserProgressContext)

 const totalItems = items.reduce((total,item)=>{
  return total+item.quantity
 },0)
  return (
    <header id="main-header">
      <div id="title">
        <img src={logo} alt="Food Logo" />
        <h1>ReactFood</h1>
      </div>
      <nav>
        <Button textOnly onClick={()=>showCart()}>Cart({totalItems})</Button>
      </nav>
    </header>
  );
}
