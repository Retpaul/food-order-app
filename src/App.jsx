import Cart from "./components/Cart/Cart";
import Checkout from "./components/Checkout/Checkout";
import Header from "./components/Header";
import Meals from "./components/meal/Meals";
import CartContextProvider from "./store/CartContext";
import UserProgressContextProvider from "./store/UserProgressContext";

function App() {
  return (
    <CartContextProvider>
      <UserProgressContextProvider>
        <Header />
        <Meals /> 
        <Cart />
        <Checkout />
      </UserProgressContextProvider>
    </CartContextProvider>
  );
}

export default App;
