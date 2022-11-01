import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import AuthForm from "../features/auth/AuthForm";
import Home from "../features/home/Home";
import AllProducts from "../features/allProducts/AllProducts";
import SingleProduct from "../features/singleProducts/SingleProduct";
import AdminPage from "../features/admin/AdminPage";
import Cart from "../features/localCart/Cart";
import EditProductForm from "../features/admin/EditProductsForm";

import { me } from "./store";

/**
 * COMPONENT
 */

const AppRoutes = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const isAdmin = useSelector((state) => state.auth.me.isAdmin);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(me());
  }, []);

  return (
    <div>
      {isLoggedIn ? (
        isAdmin ? (
          <Routes>
            <Route path="/*" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/home" element={<Home />} />
            <Route path="/products" element={<AllProducts />} />
            <Route path="/products/:productId" element={<SingleProduct />} />
            <Route path="/adminPage" element={<AdminPage />} />
            <Route
              path="/adminPage/product/:productId"
              element={<EditProductForm />}
            />
          </Routes>
        ) : (
          <Routes>
            <Route path="/*" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/home" element={<Home />} />
            <Route path="/products" element={<AllProducts />} />
            <Route path="/products/:productId" element={<SingleProduct />} />
            {/* <Route path="/adminPage" element={<AdminPage />} />
            <Route
              path="/adminPage/product/:productId"
              element={<EditProductForm />}
            /> */}
          </Routes>
        )
      ) : (
        <Routes>
          <Route
            path="/*"
            element={<AuthForm name="login" displayName="Login" />}
          />
          <Route
            path="/login"
            element={<AuthForm name="login" displayName="Login" />}
          />
          <Route
            path="/signup"
            element={<AuthForm name="signup" displayName="Sign Up" />}
          />
          <Route path="/products" element={<AllProducts />} />
          <Route path="/products/:productId/*" element={<SingleProduct />} />
          <Route path="/cart" element={<Cart />} />
          {/* <Route path="/adminPage" element={<AdminPage />} />
          <Route path = "/adminPage/product/:productId" element = {<EditProductForm />} /> */}
        </Routes>
      )}
    </div>
  );
};

export default AppRoutes;
