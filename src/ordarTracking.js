import React, { useState, useEffect } from 'react';  

const INITIAL_STATUS = "New Order";  
// Update statuses after 1 minute  
const STATUS_UPDATE_TIMES = {  
  [INITIAL_STATUS]: 60000,   
  "Preparing": 60000,   
  "Ready for Delivery": 60000,   
  "Delivered": 60000  
};  

function OrderTracking() {  
  const [orderId, setOrderId] = useState('');  
  const [customerName, setCustomerName] = useState('');  
  const [foodRequest, setFoodRequest] = useState('');  
  const [orders, setOrders] = useState([]);  

  const addOrder = () => {  
    if (orderId && customerName && foodRequest) {  
      const newOrder = {  
        orderId,  
        customerName,  
        foodRequest,  
        status: INITIAL_STATUS,  
        creationTime: Date.now(),  
      };  
      setOrders([...orders, newOrder]);  
      resetForm();  
    } else {  
      alert('Please fill in all order details.');  
    }  
  };  

  const resetForm = () => {  
    setOrderId('');  
    setCustomerName('');  
    setFoodRequest('');  
  };  

  const updateStatus = (index, newStatus) => {  
    const updatedOrders = [...orders];  
    updatedOrders[index].status = newStatus;  
    setOrders(updatedOrders);  
  };  

  useEffect(() => {  
    const interval = setInterval(() => {  
      const now = Date.now();  
      setOrders(prevOrders =>  
        prevOrders.map(order => {  
          const passedTime = now - order.creationTime;  
          let newStatus = order.status;  

          if (newStatus === INITIAL_STATUS && passedTime > STATUS_UPDATE_TIMES[INITIAL_STATUS]) {  
            newStatus = "Preparing";  
          } else if (newStatus === "Preparing" && passedTime > STATUS_UPDATE_TIMES["Preparing"]) {  
            newStatus = "Ready for Delivery";  
          } else if (newStatus === "Ready for Delivery" && passedTime > STATUS_UPDATE_TIMES["Ready for Delivery"]) {  
            newStatus = "Delivered";  
          }  

          return { ...order, status: newStatus };  
        })  
      );  
    }, 60000);   

    return () => clearInterval(interval);  
  }, []);  

  return (  
    <div className="max-w-lg mx-auto mt-10 p-6 border rounded-lg shadow-lg bg-white">  
      <h1 className="text-2xl font-bold text-center mb-4">Order Tracking System</h1>  
      <div className="flex flex-col space-y-4">  
        <input  
          type="text"  
          value={orderId}  
          onChange={(e) => setOrderId(e.target.value)}  
          placeholder="Order ID"  
          className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"  
        />  
        <input  
          type="text"  
          value={customerName}  
          onChange={(e) => setCustomerName(e.target.value)}  
          placeholder="Customer Name"  
          className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"  
        />  
        <input  
          type="text"  
          value={foodRequest}  
          onChange={(e) => setFoodRequest(e.target.value)}  
          placeholder="Food Request"  
          className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"  
        />  
        <button  
          onClick={addOrder}  
          className="bg-purple-400 text-white px-4 py-2 rounded hover:bg-indigo-300"  
        >  
          Add Order  
        </button>  
      </div>  

      <h2 className="text-xl font-semibold mt-4">Order List</h2>  
      <table className="w-full border border-gray-300 mt-2">  
        <thead>  
          <tr>  
            <th className="border p-2">Order ID</th>  
            <th className="border p-2">Customer</th>  
            <th className="border p-2">Food Request</th>  
            <th className="border p-2">Status</th>  
          </tr>  
        </thead>  
        <tbody>  
          {orders.map((order, index) => (  
            <tr key={index}>  
              <td className="border p-2">{order.orderId}</td>  
              <td className="border p-2">{order.customerName}</td>  
              <td className="border p-2">{order.foodRequest}</td>  
              <td className="border p-2">{order.status}</td>  
            </tr>  
          ))}  
        </tbody>  
      </table>  
    </div>  
  );  
}  

export default OrderTracking;