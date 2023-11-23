//The router

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "../App";
import ShopPage from "../components/shopPage/ShopPage";
import TestPage from "../pages/TestPage";
import ProductPage from "../components/productPage/ProductPage";
import Cart from "../components/cart/Cart";
import Checkout from "../components/checkoutPage/Checkout";
import Confirmation from "../components/checkoutPage/Confirmation";
import LoginPage from "../components/loginPage/LoginPage";
import RegisterPage from "../components/registerPage/RegisterPage";
import FaceLoginPage from "../components/faceLoginPage/FaceLoginPage";
import FaceRegisterPage from "../components/faceRegisterPage/FaceRegister";
import FaceAuth from "../components/faceRegisterPage/FaceAuth";

export default function MyRouter() {
  return (
    <Router>
      <Routes>
        <Route path='groupproject/' element={<App />}>
          <Route index element={<ShopPage />} />
          <Route
            // exact
            path='/groupproject/category/:productCategory/'
            element={<ProductPage />}
          />
          <Route
            // exact
            path='/groupproject/category/:productCategory/:subCategory'
            element={<ProductPage />}
          />
          <Route
            // exact
            path='/groupproject/category/:productCategory/:subCategory/:option'
            element={<ProductPage />}
          />
          <Route
            // exact
            path='/groupproject/search/:searchValue'
            element={<TestPage />}
          />
          <Route
            // exact
            path='/groupproject/checkout'
            element={<Checkout />}
          />
          <Route
            // exact
            path='/groupproject/checkout/confirm'
            element={<Confirmation />}
          />
          <Route
            // exact
            path='/groupproject/signin'
            element={<LoginPage />}
          />
          <Route
            // exact
            path='/groupproject/signup'
            element={<RegisterPage />}
          />
          <Route
            // exact
            path='/groupproject/facelogin'
            element={<FaceLoginPage />}
          />

          <Route
            // exact
            path='/groupproject/faceregister'
            element={<FaceRegisterPage />}
          />
          <Route exact path='/groupproject/cart' element={<Cart />} />
          <Route path='/groupproject/faceAuth' element={<FaceAuth />} />
        </Route>
      </Routes>
    </Router>
  );
}
