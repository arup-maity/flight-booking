'use client'
import { cn } from '@/ui-components/utils';
import React, { useEffect, useState } from 'react'


const AirportTable = ({ columns = [], data = [], sort }) => {
   const [sortOrder, setSortOrder] = useState({})
   const [selectAll, setSelectAll] = useState(false);
   const [products, setProducts] = useState([]);

   useEffect(() => {
      // 2. Update selectAll state efficiently:
      if (products.length > 0) {
         const allOnPageChecked = data.every((row) => products.includes(row?.id));
         setSelectAll(allOnPageChecked);
      }
   }, [data, products])

   const handleSelectAll = (event) => {
      const checked = event.target.checked;
      const newProducts = checked ? data?.map((product) => product.id) : [];
      setSelectAll(checked);
      setProducts(newProducts);
   };

   const handleProductCheck = (productId, event) => {
      // 1. Update products state immutably:
      setProducts((prevProducts) => {
         const newProducts = event.target.checked
            ? [...prevProducts, productId] // Add if checked
            : prevProducts.filter((id) => id !== productId); // Remove if unchecked
         return newProducts;
      })
   };

   const sortData = (columnName, sortOrder) => {
      setSortOrder({ [columnName]: sortOrder })
      sort?.({ column: columnName, sortOrder: sortOrder })
   };

   return (
      <table className='w-full'>
         <thead>
            <tr>
               <th className='w-12 text-left py-2 px-4 border'>
                  <input type="checkbox" checked={selectAll} onChange={handleSelectAll} className='w-4 h-4' />
               </th>
               {columns.map((column) => (
                  <th key={column.title} className={cn(`text-left p-2 border`, column.className)}>
                     {column.title}
                     {column.sortable && (
                        <span className='ms-4'>
                           <button onClick={() => sortData(column.dataIndex, 'asc')} className={`${sortOrder[column.dataIndex] === 'asc' ? 'text-gray-500' : 'text-gray-300'}`}>
                              &#8593;
                           </button>
                           <button onClick={() => sortData(column.dataIndex, 'desc')} className={`${sortOrder[column.dataIndex] === 'desc' ? 'text-gray-500' : 'text-gray-300'}`}>
                              &#8595;
                           </button>
                        </span>
                     )}
                  </th>
               ))}
            </tr>
         </thead>
         <tbody>
            {data.map((row, index) => (
               <tr key={index}>
                  <td className='border py-2 px-4'>
                     <div className="">
                        <input type="checkbox" checked={products.includes(row.id)} onChange={(e) => handleProductCheck(row.id, e)} className='w-4 h-4' />
                     </div>
                  </td>
                  {columns.map((column) => (
                     <td key={column.title} className={cn(`border p-2`, column.className)}>
                        {column?.dataIndex ?
                           (
                              <div className="line-clamp-2">
                                 {row[column.dataIndex]}
                              </div>
                           )
                           : column.render(row)}
                     </td>
                  ))}
               </tr>
            ))}
         </tbody>
      </table>
   )
}

export default AirportTable