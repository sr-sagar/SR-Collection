import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home"
import Search from "./features/search/search"
import Cart from "./features/cart/cart"
import Profile from "./features/profile/profile"
import OrderPage from './features/order/orderPage'
import ProductsPage from './features/products/productsPage';
import SignUp from './features/auth/signup';
import LogIn from './features/auth/login';
import AdminProductsUpload from './features/admin/adminProductsUpload';
import { useAppContext } from "./context/AppContext";
import ManageUserPassword from "./features/profile/manageUserPassword";
import ManageUserDetails from "./features/profile/manageUserDetails";
import SupervisiorLogIn from "./features/auth/supervisiorLogIn";
import AdminAssignmentPortal from "./features/supervisor/adminAssignmentPortal";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import PaymentPage from "./features/products/paymentPage";
const AppRoutes = ({ btn, setBtn,btnValue,setBtnValue}) => {
    const {category,setCategory,input,setInput,filteredItems,setFilteredItems,handleSearchFilter,scroll,userCart,handleGetCartItems,productPrice} = useAppContext()
    const location = useLocation();
    useEffect(() => {
      const prevPath = sessionStorage.getItem('prevPath');
      const currentPath = location.pathname;

      sessionStorage.setItem('prevPath', currentPath);
      const sTokenExist = localStorage.getItem('sToken');

      if(sTokenExist && 
        prevPath === "/supervisior/adminAccess" &&
        currentPath !== "/supervisior/adminAccess"
      ){
          localStorage.removeItem('sToken');
          localStorage.removeItem('newUserRole');
        }

      },[location.pathname])
        
    return(
        <Routes>
            <Route path='/' element={<Home category={category} setCategory={setCategory} input={input} setInput={setInput} filteredItems={filteredItems} handleSearchFilter={handleSearchFilter} scroll={scroll}/>}/>
            <Route path='/search' element={<Search category={category} setCategory={setCategory} input={input} setInput={setInput} filteredItems={filteredItems} setFilteredItems={setFilteredItems} handleSearchFilter={handleSearchFilter} scroll={scroll}/>}/>
            <Route path='/cart' element={<Cart  filteredItems={userCart} scroll={scroll} handleGetCartItems={handleGetCartItems}/>}/>
            <Route path='/profile' element={<Profile scroll={scroll} btn={btn} setBtn={setBtn} btnValue={btnValue} setBtnValue={setBtnValue}/>}/>
            <Route path='homeItems/products/:id' element={<ProductsPage scroll={scroll} filteredItems={filteredItems}/>}/>
            <Route path='cartItems/products/:id' element={<ProductsPage scroll={scroll} filteredItems={filteredItems}/>}/>
            <Route path='/order/:id' element={<OrderPage />}/>
            <Route path='/user/signup' element={<SignUp scroll={scroll}/>}/>
            <Route path='/user/login' element={<LogIn scroll={scroll}/>}/>
            <Route path='/admin/addProducts' element={<AdminProductsUpload scroll={scroll}/>}/>
            <Route path='/userAccount/manageAccount' element={<ManageUserPassword scroll={scroll}/>}/>
            <Route path='/userAccount/editDetails' element={<ManageUserDetails scroll={scroll}/>}/>
            <Route path='/supervisior/login' element={<SupervisiorLogIn scroll={scroll}/>}/>
            <Route path='/supervisior/adminAccess' element={<AdminAssignmentPortal scroll={scroll}/>}/>
            <Route path='/productsPage/PaymentPage' element={<PaymentPage scroll={scroll} productPrice={productPrice}/>}/>
        </Routes>
    )
}

export default AppRoutes;