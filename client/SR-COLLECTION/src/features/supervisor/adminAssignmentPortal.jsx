import React, {useState} from "react";
import supervisorGetRequests from "../../services/supervisorGetRequest";
import { useEffect } from "react";
import UsersComponent from "./usersComponent";
import SmallerScreensNavbar from "../../components/layout/smallerScreensNavbar";
import LargerScreensNavbar from "../../components/layout/largerScreensNavbar";
import { useAppContext } from "../../context/AppContext";
import Button from "../../components/common/button";
import supervisorPostRequestWithAuth from "../../services/supervisorPostRequestWithAuth";
import UserOrdersManagement from "./userOrdersManagement";
import ProductManagement from "./productManagement";
import { toast } from "react-toastify";
const AdminAssignmentPortal = () => {
    const [user,setUser] = useState([])
    const [orders,setOrders] = useState([])
    const [prodcts,setProducts] = useState([])
    const {scroll} = useAppContext();
    const [selectValue,setSelectValue] = useState("")
    const [statusSelectValue,setStatusSelectValue] = useState("")
    const [userId,setUserId] = useState(null)
    const [orderId,setOrderId] = useState(null)
    // const [productId,setProductId] = useState(null)
    const [deliveryDate,setDeliveryDate] = useState('')
    const [orderNumber,setOrderNumber] = useState('')
    const {currentSupervisior, products,devLog} = useAppContext();

    const handleGetUser = async() => {
        const req = await supervisorGetRequests('supervisior/adminAccess');
        if(req.status == 201)
        {
            devLog("users retrived successfully.");
            setUser(req.res.user)
        }
        else{
            toast.error(req.res.message)
            devLog(req.res.message)

        }

    } 

    const handleGetOrders = async() => {
        const req = await supervisorGetRequests('supervisior/userOrders');
        if(req.status == 201)
        {
            devLog("orders retrived successfully.");
            setOrders(req.res.order)
        }
        else{
            toast.error(req.res.message)
            devLog(req.res.message)

        }

    } 
     
    const handleUserRoleChange = async() => {
        const newRoleData = {
            email: currentSupervisior,
            userId: userId,
            newUserRole: selectValue,
        }
        const req = await supervisorPostRequestWithAuth(newRoleData, 'supervisior/userRoleChange')

        if(req.status == 200)
        {
            localStorage.setItem('newUserRole', req.newUserRole)
            toast.success("user role changed.")
            handleGetUser()

        }
        else{
            devLog(req.message)
            toast.error("Something went wrong.")
        }
    }
    const handleUserOrderStatus = async() => {
        const newOrderStatus = {
            email: currentSupervisior,
            orderId: orderId,
            newOrderStatus: statusSelectValue,
        }
        const req = await supervisorPostRequestWithAuth(newOrderStatus, 'supervisior/userOrderStatusChange')

        if(req.status == 200)
        {
            toast.success("order status changed.")
            handleGetOrders()
        }
        else{
            devLog(req.message)
            toast.error("Something went wrong.")
        }
    }

    const handleSetDeliveryDate = async() => {
        const deliverDateCheck = deliveryDate === ''
        const deliveryDateData = {
            email: currentSupervisior,
            orderId: orderId,
            newDeliveryDate: deliveryDate,
        }
        
        if(deliverDateCheck !== '')
        {
            const res = supervisorPostRequestWithAuth(deliveryDateData, "supervisior/userOrderDeliveryDateChange");
            if(res.status == 200)
            {
                toast.success("Delivery Date Set");
            }
            else{
                devLog(res.message)
                toast.error(res.message)

            }

        }
    }

    const handleSetOrderNumber = async() => {
        const orderNumberCheck = orderNumber === ''
        const orderNumaberData = {
            email: currentSupervisior,
            orderId: orderId,
            newOrderNumber: orderNumber,
        }
        
        if(orderNumberCheck !== '')
        {
            const res = await supervisorPostRequestWithAuth(orderNumaberData, "supervisior/userOrderNumberChange");
            if(res.status === 200)
            {
                toast.success("Order Number Set");
            }
            else{
                devLog(res.message)
                toast.error(res.message)
            }

        }
    }

    const handleFunctionCall = () => {
        if(statusSelectValue !== "")
        {
            handleUserOrderStatus()
            return;
        }
        if(deliveryDate !== '')
        {
            handleSetDeliveryDate()
            return;
        }
        if(orderNumber !== '')
        {
            handleSetOrderNumber()
            return;
        }
        if(statusSelectValue !== "" && deliveryDate !== '' && orderNumber === '')
        {
            handleUserOrderStatus()
            handleSetDeliveryDate()
            return;
        }
        if(statusSelectValue !== "" && deliveryDate === '' && orderNumber !== '')
        {
            handleUserOrderStatus()
            handleSetOrderNumber()
            return;

        }
    }

    const handleDeleteProduct = async(productId) => {
        const productDetails = {
            email: currentSupervisior,
            productId: productId,
        }
        const res = await supervisorPostRequestWithAuth(productDetails,"supervisior/deleteProduct");
        if(res.status === 201)
        {
            toast.success("product deleted successfully.",res.message);
        }
        else{
            devLog(res.message)
            toast.error(res.message);
        }
    }

    useEffect(() => {
        handleGetUser()
        handleGetOrders()

    },[])

    return(
        <div className="absolute top-0 left-0 w-full h-full ">
            <header className="w-full max-h-[15%] pb-5 bg-[#F4F5F7] justify-center items-center object-center  ">
                {scroll?
                    <SmallerScreensNavbar />
                :
                    <LargerScreensNavbar />
                }
            </header>
            <main className="w-full  h-[85%]  relative  p-2 overflow-y-auto">
                <div className="w-full h-full ">
                    <h2 className="flex items-center justify-center">USERS</h2>
                    <div className="w-full  flex flex-col h-[40%] space-y-4  bg-[#F4F5F7] shadow-md p-1">
                        <div className="w-full h-[60%] flex flex-col space-y-2 overflow-y-auto pb-2" style={{scrollBarWidth: 'none'}}>

                            {user.length > 0? user.map((item) => (
                                <UsersComponent key={item._id} userName={item.userName} userEmail={item.email} userRole={item.userRole} selectValue={selectValue} setSelectValue={setSelectValue} setUserId={setUserId} userId={item._id}/>
                                ))

                                :
                                <div className="w-full p-2 mt-6 bg-[#F4F5F7]  shadow-md flex justify-center items-center">
                                <p >No users yet.</p>
                            </div>
                            }
                        </div>
                        <div className="flex h-[10%] relative items-center justify-center w-full mt-2">
                            <Button btnText={"Submit"} isLink={false} onClick={() => handleUserRoleChange()}/>
                        </div>
                    </div>
                    <h2 className="flex items-center justify-center mt-4 mb-2">ORDERS</h2>
                    <div className="w-full  flex flex-col h-[40%] space-y-4  bg-[#F4F5F7] shadow-md p-1">

                        <div className="w-full h-[70%] flex flex-col space-y-2 overflow-y-auto pb-2 pt-1" style={{scrollBarWidth: 'none'}}>

                            {orders.length > 0? orders.map((item) => (
                                <UserOrdersManagement key={item._id}  selectValue={statusSelectValue} setStatusSelectValue={setStatusSelectValue} setOrderId={setOrderId} orderId={item._id} userName={item.userName} userPhoneNumber={item.userPhoneNumber} deliveryDate={deliveryDate} setDeliveryDate={setDeliveryDate} orderNumber={orderNumber} setOrderNumber={setOrderNumber} orderAddressCity={item.userAddressCity} orderHomeAddress={item.userHomeAddress} />
                                ))
                            
                                :
                                <div className="w-full p-2 mt-6 bg-[#F4F5F7]  shadow-md flex justify-center items-center">
                                    <p >No orders yet.</p>
                                </div>
                            }
                        </div>
                        <div className="flex h-[10%] relative items-center justify-center w-full mt-2">
                            <Button 
                                btnText={"Submit"} 
                                isLink={false} 
                                onClick={() => handleFunctionCall()}/>
                        </div>
                        

                    </div>

                    <h2 className="flex items-center justify-center mt-4 mb-2">PRODUCTS</h2>
                    <div className="w-full  flex flex-col h-[40%] space-y-4  bg-[#F4F5F7] shadow-md p-1">

                        <div className="w-full h-[70%] flex flex-col space-y-2 overflow-y-auto pb-2 pt-1" style={{scrollBarWidth: 'none'}}>

                            {products.length > 0? products.map((item) => (
                                <ProductManagement key={item._id}  productId={item._id}  createdAt={item.createdAt} title={item.title} handleDeleteProduct={handleDeleteProduct}/>
                                ))
                            
                                :
                                <div className="w-full p-2 mt-6 bg-[#F4F5F7]  shadow-md flex justify-center items-center">
                                    <p >No orders yet.</p>
                                </div>
                            }
                        </div>
                        
                    </div>
                </div>
            </main>
        </div>
    )
}

export default AdminAssignmentPortal;