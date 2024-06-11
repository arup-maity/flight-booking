'use client'
import { cn } from '@/ui-components/utils';
import React, { useEffect, useState } from 'react'

interface PropsType {
   columns: any[];
   data: any[];
   sort?: any;
}

const UserTable: React.FC<PropsType> = ({ columns = [], data = [], sort }) => {
   const [sortOrder, setSortOrder] = useState<any>({})
   const [selectAll, setSelectAll] = useState(false);
   const [products, setProducts] = useState<number[]>([]);

   useEffect(() => {
      // 2. Update selectAll state efficiently:
      if (products.length > 0) {
         const allOnPageChecked = data.every((row: any) => products.includes(row?.id));
         setSelectAll(allOnPageChecked);
      }
   }, [data, products])

   const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
      const checked = event.target.checked;
      const newProducts = checked ? data?.map((product) => product.id) : [];
      setSelectAll(checked);
      setProducts(newProducts);
   };

   const handleProductCheck = (productId: number, event: React.ChangeEvent<HTMLInputElement>) => {
      // 1. Update products state immutably:
      setProducts((prevProducts) => {
         const newProducts = event.target.checked
            ? [...prevProducts, productId] // Add if checked
            : prevProducts.filter((id) => id !== productId); // Remove if unchecked
         return newProducts;
      })
   };

   const sortData = (columnName: string, sortOrder: string) => {
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
               {columns.map((column: any) => (
                  <th key={column.title} className={cn(`text-left p-2 border`, column.className)}>
                     {column.title}
                     {column.sortable && (
                        <span className='ms-4'>
                           <button onClick={() => sortData(column.dataIndex, 'asc')} className={`${sortOrder[column?.dataIndex] === 'asc' ? 'text-gray-500' : 'text-gray-300'}`}>
                              <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 20 20" aria-hidden="true" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                           </button>
                           <button onClick={() => sortData(column.dataIndex, 'desc')} className={`${sortOrder[column?.dataIndex] === 'desc' ? 'text-gray-500' : 'text-gray-300'}`}>
                              <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 20 20" aria-hidden="true" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M14.707 12.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
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
                        {column.dataIndex ?
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

export default UserTable