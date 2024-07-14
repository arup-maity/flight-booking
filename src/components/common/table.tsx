'use client'
import React, { useEffect, useState } from 'react'
import { cn } from '@/ui-components/utils';

interface PropsType {
   columns: any[];
   data: any[];
   sort?: any;
   loading?: boolean;
   deleteRows?: (rowId: number[]) => void;
}

const Table: React.FC<PropsType> = ({ columns = [], data = [], sort, loading = false, deleteRows }) => {
   const [sortOrder, setSortOrder] = useState<any>({})
   const [selectAll, setSelectAll] = useState(false);
   const [selectedRow, setSelectedRow] = useState<number[]>([]);

   useEffect(() => {
      // Update selectAll state efficiently:
      if (selectedRow.length > 0) {
         const allOnPageChecked = data.every((row: any) => selectedRow.includes(row?.id));
         setSelectAll(allOnPageChecked);
      }
   }, [data, selectedRow])

   useEffect(() => {
      deleteRows?.([])
      setSelectedRow([])
   }, [data])

   const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
      const checked = event.target.checked;
      const newProducts = checked ? data?.map((product) => product.id) : [];
      setSelectAll(checked);
      setSelectedRow(newProducts);
      deleteRows?.(newProducts);
   };

   const handleProductCheck = (productId: number, event: React.ChangeEvent<HTMLInputElement>) => {
      // 1. Update products state immutably:
      setSelectedRow((prevProducts) => {
         const newProducts = event.target.checked
            ? [...prevProducts, productId] // Add if checked
            : prevProducts.filter((id) => id !== productId); // Remove if unchecked
         return newProducts;
      })
      // 
      const newProducts = event.target.checked
         ? [...selectedRow, productId] // Add if checked
         : selectedRow.filter((id) => id !== productId);
      deleteRows?.(newProducts)
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
                     <span className='text-base font-montserrat font-medium'>{column.title}</span>
                     {column.sortable && (
                        <span className='ms-4'>
                           <button onClick={() => sortData(column.index, 'asc')} className={`${sortOrder[column?.index] === 'asc' ? 'text-gray-500' : 'text-gray-300'}`}>
                              <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 20 20" aria-hidden="true" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                           </button>
                           <button onClick={() => sortData(column.index, 'desc')} className={`${sortOrder[column?.index] === 'desc' ? 'text-gray-500' : 'text-gray-300'}`}>
                              <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 20 20" aria-hidden="true" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M14.707 12.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
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
                  <tr>
                     <td colSpan={columns.length + 1} className='text-center text-gray-400 p-9'>Loading ...</td>
                  </tr>
                  :
                  data?.length === 0 ?
                     <tr>
                        <td colSpan={columns.length + 1} className='text-center text-gray-400 p-9'>No data</td>
                     </tr>
                     :
                     data.map((row, index) => (
                        <tr key={index}>
                           <td className='border py-2 px-4'>
                              <div className="">
                                 <input type="checkbox" checked={selectedRow.includes(row.id)} onChange={(e) => handleProductCheck(row.id, e)} className='w-4 h-4' />
                              </div>
                           </td>
                           {columns.map((column) => (
                              <td key={column.title} className={cn(`border p-2`, column.className)}>
                                 {column.dataIndex ? row[column.dataIndex] : column.render(row)}
                              </td>
                           ))}
                        </tr>
                     ))
            }
         </tbody>
      </table>
   )
}

export default Table