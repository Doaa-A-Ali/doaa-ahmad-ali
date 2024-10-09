import React, { useState } from 'react';  

function DataSorting() {  
    const [data, setData] = useState([]); // لتخزين البيانات  
    const [searchTerm, setSearchTerm] = useState(''); // لتخزين مصطلح البحث  
    const [sortConfig, setSortConfig] = useState(null); // لتخزين إعدادات الفرز  
    const [newItem, setNewItem] = useState({ name: '', email: '', birthdate: '', phone: '' }); // لتخزين بيانات الإدخال الجديدة  

    const requestSort = (key) => {  
        let direction = 'ascending';  
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {  
            direction = 'descending';  
        }  
        setSortConfig({ key, direction });  
    };  

    const sortedData = () => {  
        let sortableItems = [...data];  
        if (sortConfig !== null) {  
            sortableItems.sort((a, b) => {  
                if (a[sortConfig.key] < b[sortConfig.key]) {  
                    return sortConfig.direction === 'ascending' ? -1 : 1;  
                }  
                if (a[sortConfig.key] > b[sortConfig.key]) {  
                    return sortConfig.direction === 'ascending' ? 1 : -1;  
                }  
                return 0;  
            });  
        }  
        return sortableItems;  
    };  

    const filteredData = sortedData().filter(item => {  
        return (  
            item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||  
            item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||  
            item.birthdate.includes(searchTerm) || // تحقق من الصيغة الخاصة بك  
            item.phone.includes(searchTerm)  
        );  
    });  

    const handleInputChange = (e) => {  
        const { name, value } = e.target;  
        setNewItem({ ...newItem, [name]: value });  
    };  

    const handleAddItem = (e) => {  
        e.preventDefault();  
        setData([...data, newItem]); // إضافة العنصر الجديد إلى البيانات  
        setNewItem({ name: '', email: '', birthdate: '', phone: '' }); // إعادة تعيين النموذج  
    };  

    return (  
        <div className="m-4">  
            <form onSubmit={handleAddItem} className="mb-4">  
                <input  
                    type="text"  
                    name="name"  
                    placeholder="Name"  
                    value={newItem.name}  
                    onChange={handleInputChange}  
                    className="border p-2 mr-2"  
                    required  
                />  
                <input  
                    type="email"  
                    name="email"  
                    placeholder="Email"  
                    value={newItem.email}  
                    onChange={handleInputChange}  
                    className="border p-2 mr-2"  
                    required  
                />  
                <input  
                    type="date"  
                    name="birthdate"  
                    value={newItem.birthdate}  
                    onChange={handleInputChange}  
                    className="border p-2 mr-2"  
                    required  
                />  
                <input  
                    type="text"  
                    name="phone"  
                    placeholder="Phone"  
                    value={newItem.phone}  
                    onChange={handleInputChange}  
                    className="border p-2 mr-2"  
                    required  
                />  
                <button type="submit" className="border p-2 bg-blue-500 text-white">Add</button>  
            </form>  

            <input  
                type="text"  
                placeholder="Search..."  
                value={searchTerm}  
                onChange={(e) => setSearchTerm(e.target.value)}  
                className="border p-2 mb-4"  
            />  
            <table className="min-w-full border border-gray-300">  
                <thead>  
                    <tr>  
                        <th onClick={() => requestSort('name')} className="border p-2 cursor-pointer">Name</th>  
                        <th onClick={() => requestSort('email')} className="border p-2 cursor-pointer">Email</th>  
                        <th onClick={() => requestSort('birthdate')} className="border p-2 cursor-pointer">Birthdate</th>  
                        <th onClick={() => requestSort('phone')} className="border p-2 cursor-pointer">Phone</th>  
                    </tr>  
                </thead>  
                <tbody>  
                    {filteredData.map((item, index) => (  
                        <tr key={index}>  
                            <td className="border p-2">{item.name}</td>  
                            <td className="border p-2">{item.email}</td>  
                            <td className="border p-2">{item.birthdate}</td>  
                            <td className="border p-2">{item.phone}</td>  
                        </tr>  
                    ))}  
                </tbody>  
            </table>  
        </div>  
    );  
}  

export default DataSorting;