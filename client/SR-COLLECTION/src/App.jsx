import './App.css'
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import { useState, useEffect } from 'react';
import Home from "./components/home"
import Search from "./components/search"
import Cart from "./components/cart"
import Profile from "./components/profile"
import HomeItems from './components/homeItems';
import CartItems from './components/cartItems';
import UserOrders from './components/userOrders';
import Orders from './components/orders';
function App() {
  
  const [category,setCategory] = useState("")
  const [input,setInput] = useState("")
  const [fetchData,setData] = useState([])

  const [scroll,setScroll] = useState(true);


  useEffect(() => {
      const mediaQuery = window.matchMedia('(min-width: 768px)');
      const handleMediaQuery = (e) => {
          if(e.matches){
              setScroll(false);
          }
          else{
              setScroll(true);
          }
      };
      handleMediaQuery(mediaQuery);
      mediaQuery.addEventListener('change', handleMediaQuery);
      return() => {
          mediaQuery.removeEventListener('change', handleMediaQuery);
      };
  },[])


  const arr = [ 
        
    {"name" : "ajrak dress piece hell this is a trial", id: 1, price: 200},
    {"name" : "dress piece", id: 2, price: 300},
    {"name" : "langdi patta", id: 3, price: 400},
    {"name" : "sarre", id: 4, price: 100},
    {"name" : "dupatta", id: 5, price: 50},
    {"name" : "dress", id: 6, price: 900},
]
  const fetchDataFunc = (id) => {
    try{
      let d = fetch(`https://fakestoreapi.com/products/${id}`).then(res=> res.json()).catch((err) => console.error(err))
      


    }catch(err){
      console.log(err);
    }
    
  } 
  fetchDataFunc(1);

const [filteredItems,setFilteredItems] = useState(arr)

const handleSearchFilter = () => {
  console.log(category)
  if(category == "Low-to-High")
  {
      const res = [...arr].sort((a,b) => a.price - b.price)
      setFilteredItems(res)
      return;
  }
  if(input.trim() != "")
  {
      const search  = [...arr].filter(res => res.name.toLowerCase().includes(input.toLowerCase()))
      setFilteredItems(search)
      return;

  }else{

      setFilteredItems(arr)
  }
}
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home category={category} setCategory={setCategory} input={input} setInput={setInput} filteredItems={filteredItems} handleSearchFilter={handleSearchFilter} scroll={scroll}/>}/>
          <Route path='/search' element={<Search category={category} setCategory={setCategory} input={input} setInput={setInput} filteredItems={filteredItems} setFilteredItems={setFilteredItems} handleSearchFilter={handleSearchFilter} scroll={scroll}/>}/>
          <Route path='/cart' element={<Cart  filteredItems={filteredItems} scroll={scroll}/>}/>
          <Route path='/profile' element={<Profile scroll={scroll}/>}/>
          <Route path='/items/:id' element={<HomeItems />}/>
          <Route path='/order/:id' element={<Orders />}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
