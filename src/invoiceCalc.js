import React, { useState } from 'react';  

function InvoiceCalc() {  
  const [formData, setFormData] = useState({  
    productName: '',  
    productPrice: '',  
    productDiscount: '',  
  });  
  const [products, setProducts] = useState([]);  

  const handleChange = (e) => {  
    const { name, value } = e.target;  
    setFormData((prevData) => ({...prevData,[name]: value,}));  
  };  

  const addProduct = () => {  
    const price = parseFloat(formData.productPrice);  
    const discount = parseFloat(formData.productDiscount) || 0;  

    if (formData.productName && !isNaN(price) && !isNaN(discount)) {  
      const newProduct = {  
        name: formData.productName,  
        price: price,  
        discount: discount,  
      };  

      setProducts((prevProducts) => [...prevProducts, newProduct]);  

    } else {  
      alert('Please enter valid product details');  
    }  
  };  

  const calculateTotal = () => {  
    return products.reduce((total, product) => {  
      const discountedPrice = product.price - (product.price * (product.discount / 100));  
      return total + discountedPrice;  
    }, 0).toFixed(2);  
  };  

  return (  
    <div className="max-w-lg mx-auto mt-10 p-6 border rounded-lg shadow-lg bg-white">  
      <h1 className="text-2xl font-bold text-center mb-4">Invoice Calculation</h1>  
      <div className="flex flex-col space-y-4">  
        <input  
          type="text"  
          name="productName"  
          value={formData.productName}  
          onChange={handleChange}  
          placeholder="Product Name"  
          className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"  
        />  
        <input  
          type="number"  
          name="productPrice"  
          value={formData.productPrice}  
          onChange={handleChange}  
          placeholder="Price"  
          min="0"  
          className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"  
        />  
        <input  
          type="number"  
          name="productDiscount"  
          value={formData.productDiscount}  
          onChange={handleChange}  
          placeholder="Discount (%)"  
          className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"  
        />  
        <button  
          onClick={addProduct}  
          className="bg-purple-400 text-white px-4 py-2 rounded hover:bg-blue-600"  
        >  
          Add Product  
        </button>  
      </div>  

      <h2 className="text-xl font-semibold mt-4">Product List</h2>  
      <table className="w-full border border-gray-300 mt-2">  
        <thead>  
          <tr>  
            <th className="border p-2">Product Name</th>  
            <th className="border p-2">Price</th>  
            <th className="border p-2">Discount (%)</th>  
            <th className="border p-2">Final Price</th>  
          </tr>  
        </thead>  
        <tbody>  
          {products.map((product, index) => {  
            const discountedPrice = (product.price - (product.price * (product.discount / 100))).toFixed(2);  
            return (  
              <tr key={index}>  
                <td className="border p-2">{product.name}</td>  
                <td className="border p-2">${product.price.toFixed(2)}</td>  
                <td className="border p-2">{product.discount}%</td>  
                <td className="border p-2">${discountedPrice}</td>  
              </tr>  
            );  
          })}  
        </tbody>  
      </table>  

      <h3 className="font-bold mt-4">Total Price: <span className="text-blue-600">${calculateTotal()}</span></h3>  
    </div>  
  );  
}  

export default InvoiceCalc;