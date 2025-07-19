import { createContext,useContext,useState,useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import GetRequests from "../services/getRequests";
import postRequestWithAuth from "../services/postRequestWithAuth";
import { parse, formatISO } from "date-fns";
import { toast } from "react-toastify";
const AppContext =  createContext();
export const AppProvider = ({ children }) => {
    const [scroll,setScroll] = useState(true);
    const [userCart,setUserCart] = useState([])
    const [products,setProducts] = useState([])
    const [filteredItems,setFilteredItems] = useState(products)
    const [category,setCategory] = useState("")
    const [input,setInput] = useState("")
    const [currentUser,setCurrentUser] = useState("")
    const [currentSupervisior,setCurrentSupervisior] = useState("")
    const [progress,setProgress] = useState(0)
    const [orders,setOrders] = useState([])
    const [searchPageFilter,setSearchPageFilter] = useState("")
    const [productId,setProductId] = useState("")
    const [productPrice,setProductPrice] = useState("")
    const [productQuantity,setProductQuantity] = useState("")
    


    const devLog = (...args) => {
      if(import.meta.env.VITE_NODE_ENV === 'development')
      {
        console.log(...args);
      }
    }
  // this useEffect is for calculating the screen size change for diffrent navbars for smaller and bigger sizes 
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

const handleGetCartItems = async() => {
      try{
        
        const cartItems = await GetRequests("userCart")
        
        if(cartItems.status == 201){
  
          devLog(cartItems.res.message)
          setUserCart(cartItems.res.userCart)
          
        }
        }catch(err)
        {
          devLog(err)
        }
    }

    const handleGetProducts = async() => {
        try{
    
          const productDetails = await GetRequests("productUpload")
          if(productDetails.status == 201)
          {
            setProducts(productDetails.res.products);
          }
          }catch(err)
          {
            devLog(err)
          }
      }


      const handleGetOrders = async() => {
        try{
          const orderDetails = await GetRequests("userOrders")
          if(orderDetails.status == 201)
          {
            setOrders(orderDetails.res.userOrder)
          }
        }catch(err){
          devLog(err)
        }
      }
      useEffect(() => {
        handleGetProducts()
        if(localStorage.getItem('token')){
          handleGetCartItems()
          handleGetOrders()
        }
      },[])

      // this is a search filter for both the home and search pages
      const handleSearchFilter = () => {
        let result = [...products]
        if(input.trim() !== "")
        {
          result = result.filter(product => product.title.toLowerCase().includes(input.toLowerCase()))
        }

        const sortOptions = category || searchPageFilter;
        if(sortOptions === "Low-to-High")
        {
            result.sort((a,b) => a.price - b.price)
        }else if(sortOptions === "High-to-Low"){
            
            result.sort((a,b) => b.price - a.price)
        }
        setFilteredItems(result)
        }
        
        
      
      

    // this handles the user logout

    const handleLogOut = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('userRole')
        localStorage.removeItem('email')
        localStorage.removeItem('userName')
        setCurrentUser("");
        setTimeout(() => window.location.href = "/", 0)
    }

    const handleSupervisorLogOut = (location) => {
      const timeout = setTimeout(() => {

        if(location.pathname === '/supervisior/adminAccess')
        {
          localStorage.removeItem('sToken');
          localStorage.removeItem('newUserRole');
          window.location.href = '/'
        }
      },1000)

      return () => clearTimeout(timeout)
    }

    // this handles order placements
    const handleOrder = async(productId,productPrice,productQuantity) => {
      try{

          const order = [{
              productId: productId,
              productPrice: productPrice,
              productQuantity: productQuantity,
          }]
          const req = await postRequestWithAuth({email: localStorage.getItem('email'),products: order},'userOrders/placeOrder')
          
          if(req.status == 404 || req.status == 403 || req.status == 400)
          {
              toast.error(req.message)
              return devLog(req.message);
          }
          devLog(req.message)
      }catch(err)
      {
          devLog("something went wrong", err);
      }
  }

    // this logs users out when their token is expired
    useEffect(() => {
      const token = localStorage.getItem('token');
      if(token)
      {
        const decode = jwtDecode(token)
        const now = Date.now() / 1000;
        const remainingTime = decode.exp - now;

        if(remainingTime <= 0)
        {
          handleLogOut()
          toast.error("Your token has expired! Please login again.")
          
        }else{
          const timeout = setTimeout(() => {
            handleLogOut()
            toast.error("Your token has expired! Please login again.")

          },remainingTime * 1000)


          return () => clearTimeout(timeout)
        }

      }
    },[])

    // this logs supervisors out when their token is expired
    useEffect(() => {
      const token = localStorage.getItem('sToken');
      if(token)
      {
        const decode = jwtDecode(token)
        const now = Date.now() / 1000;
        const remainingTime = decode.exp - now;

        if(remainingTime <= 0)
        {
          toast.error("Your token has expired! Please login again.")
          handleSupervisorLogOut()

        }else{
          const timeout = setTimeout(() => {
            
            toast.error("Your token has expired! Please login again.")
            handleSupervisorLogOut()
          },remainingTime * 1000)


          return () => clearTimeout(timeout)
        }

      }
    },[])


    const calculateProgress = (orderDate, deliveryDate) => {
      const now = new Date();
      const start = new Date(orderDate);
      const end = new Date(deliveryDate);
    
      const total = end - start;
      const elapsed = now - start;
    
      const progress = Math.min((elapsed / total) * 100, 100);
      return Math.max(progress, 0); // clamp between 0–100
    };
    
    
    // this measures the delivery bar progress
    useEffect(() => {
      if(orders.length === 0) return;

      // const order = orders[0];
      const progressMap = {}
      orders.forEach((order) => {
        if(order.createdAt && order.orderDeliveryDate)
        {
          try{
            const createdAt = new Date(order.createdAt)
            const parseDate = parse(order.orderDeliveryDate,"d MMM yyyy",new Date());
            if(!isNaN(createdAt) && !isNaN(parseDate))
            {

              const progressValue = calculateProgress(createdAt, parseDate);
              progressMap[order._id] = progressValue
            }else{
              devLog("Invalid date: ")
            }

          }catch(err)
          {
            devLog(err)
          }
        }
      })
      setProgress(progressMap)        

    },[orders])


    
    return(
        <AppContext.Provider
            value={{
                scroll,
                setScroll,
                userCart,
                setUserCart,
                products,
                setProducts,
                filteredItems,
                setFilteredItems,
                category,
                setCategory,
                input,
                currentUser,
                setInput,
                handleGetCartItems,
                handleGetProducts,
                handleSearchFilter,
                setCurrentUser,
                setCurrentSupervisior,
                currentSupervisior,
                handleLogOut,
                handleGetOrders,
                progress,
                orders,
                searchPageFilter,
                setSearchPageFilter,
                handleSupervisorLogOut,
                handleOrder,
                productId,
                productPrice,
                productQuantity,
                setProductId,
                setProductPrice,
                setProductQuantity,
                devLog,
              
            }}
        >
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => useContext(AppContext)