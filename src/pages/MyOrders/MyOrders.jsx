import React from 'react'
import './MyOrders.css'
import { useState } from 'react'
import { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'
import { useEffect } from 'react'
import axios from 'axios'
import { assets } from '../../assets/assets'
import { toast } from "react-toastify";


const MyOrders = () => {
    
    const [data,setData]=useState([])
    const {url,token}=useContext(StoreContext)
   

    const fetchOrders=async()=>{
        const response=await axios.post(url+'/api/order/userorders',{},{headers:{token}})
        setData(response.data.data)
    }
    const deleteOrderHandler = async (orderId) => {
        try {
            const response = await axios.post(url+"/api/order/delete", { orderId });
            if (response.data.success) {
                toast.success("Order deleted");
                fetchOrders();  
            } else {
                toast.error("Error deleting order");
            }
        } catch (error) {
            console.error("Error deleting order:", error);
            toast.error("Error");
        }
    };

    useEffect(()=>{
        if(token){
            fetchOrders()
        }
    },[token])

  return (
    <div className='my-orders'>
        <h2>My Orders</h2>
        <div className="container">
            {data.map((order,index)=>{
                return (
                    <div className="my-orders-order">
                        <img src={assets.parcel_icon} alt="" />
                        <p>{order.items.map((item,index)=>{
                            if(index===order.items.length-1){
                                return item.name+" x "+item.quantity
                            }else{
                                return item.name+" x "+item.quantity+", "
                            }
                        })}</p>
                        <p>${order.amount}</p>
                        <p>Items: {order.items.length}</p>
                        
                        <p><span>&#x25cf;</span><b>{order.status}</b></p>
                        <button onClick={fetchOrders}>Track Order</button>
            <img onClick={()=>deleteOrderHandler(order._id)} src={assets.delete_icon} alt="" style={{width:"30px"}}/>
                        
                    </div>
                )
            })}
        </div>
    </div>
  )
}

export default MyOrders
