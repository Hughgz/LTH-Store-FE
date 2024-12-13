import "./styles/main.scss";
// import components
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
// import pages
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import CartPage from "./pages/Cart";
import CheckoutPage from "./pages/Checkout";
import Admin from "./pages/AdminPanel";
import Account from "./pages/Account";
import Authentication from "./pages/Authentication";
import Wishlist from "./pages/Wishlist";

import { Routes, Route, useLocation } from "react-router-dom";

function App() {
  const location = useLocation();
  const showHeaderFooter = location.pathname !== "/checkout";

  return (
    <div>
      {showHeaderFooter && <Header></Header>}
      <Routes>
        <Route path="/" element={<Home location={location}></Home>} />
        <Route
          path="/ProductDetail/:nameAlias"
          element={<ProductDetail></ProductDetail>}
        />
        <Route
          path="/authentication"
          element={<Authentication></Authentication>}
        />
        <Route path="/cart" element={<CartPage></CartPage>} />
        <Route path="/checkout" element={<CheckoutPage></CheckoutPage>} />
        <Route path="/admin" element={<Admin></Admin>} />
        <Route path="/account" element={<Account></Account>} />
        <Route path="/shop" element={<Shop></Shop>} />
        <Route path="/wishlist" element={<Wishlist></Wishlist>} />
      </Routes>
      {showHeaderFooter && <Footer></Footer>}
    </div>
  );
}

export default App;
