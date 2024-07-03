'use client'
import { cn } from '@/ui-components/utils';
import React, { useEffect, useState } from 'react'

interface PropsType {
   columns: any[];
   data: any[];
   sort?: any;
   loading?: boolean;
}
const AirportTable: React.FC<PropsType> = ({ columns = [], data = [], sort, loading }) => {
   const [sortOrder, setSortOrder] = useState<any>({})
   const [selectAll, setSelectAll] = useState(false);
   const [products, setProducts] = useState<any>([]);

   useEffect(() => {
      // 2. Update selectAll state efficiently:
      if (products.length > 0) {
         const allOnPageChecked = data.every((row) => products.includes(row?.id));
         setSelectAll(allOnPageChecked);
      }
   }, [data, products])

   const handleSelectAll = (event: any) => {
      const checked = event.target.checked;
      const newProducts = checked ? data?.map((product) => product.id) : [];
      setSelectAll(checked);
      setProducts(newProducts);
   };

   const handleProductCheck = (productId: number, event: any) => {
      // 1. Update products state immutably:
      setProducts((prevProducts: any) => {
         const newProducts = event.target.checked
            ? [...prevProducts, productId] // Add if checked
            : prevProducts.filter((id: number) => id !== productId); // Remove if unchecked
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
               <th className='!w-8 py-2 border'>
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
            {
               loading ?
                  new Array(9).fill(9)?.map((index) => (
                     <tr key={index}>
                        <td className='border p-4'></td>
                        <td className='border p-4'>
                           <div className="h-3 w-20 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                        </td>
                        <td className='border p-4'>
                           <div className="h-3 w-20 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                        </td>
                        <td className='border p-4'>
                           <div className="h-3 w-20 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                        </td>
                        <td className='border p-4'>
                           <div className="h-3 w-20 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                        </td>
                     </tr>
                  ))
                  :
                  data?.length === 0 &&
                  <tr>
                     <td colSpan={columns.length + 1} className='text-center text-gray-400'>No data</td>
                  </tr>
            }
            {data.map((row, index) => (
               <tr key={index}>
                  <td className='!w-8 text-center border p-2'>
                     <input type="checkbox" checked={products.includes(row.id)} onChange={(e) => handleProductCheck(row.id, e)} className='w-4 h-4' />
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