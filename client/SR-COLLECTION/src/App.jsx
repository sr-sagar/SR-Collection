import './App.css'
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import { useState, useEffect } from 'react';
import AppRoutes from './AppRoutes';
import { useAppContext } from './context/AppContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  

  const {products,setFilteredItems} = useAppContext();

  const [btn,setBtn] = useState(false)
  const[btnValue,setBtnValue] = useState("LogIn")
  

useEffect(() => {
  setFilteredItems(products)
},[products])



  const routes = [
    '/',
    '/search',
    '/cart',
    '/profile',
    '/homeItems/products/:id',
    '/cartItems/products/:id',
    '/order/:id',
    '/user/signup',
    '/user/login',
  ]
  return (
    <>
      <Router>
          <AppRoutes  btn={btn} setBtn={setBtn} btnValue={btnValue} setBtnValue={setBtnValue} />
          <ToastContainer 
            position='top-center'
            autoClose={4000}
            hideProgressBar={false}
            newestOnTop={false}
            pauseOnFocusLoss
            draggable
            closeOnClick
            pauseOnHover
            theme='light'
          />
      </Router>
    </>
  )
}

export default App
