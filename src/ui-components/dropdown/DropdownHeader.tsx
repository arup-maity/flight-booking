'use client'
import React from 'react'
import { DropdownContext } from './Context';
import { cn } from '../utils';
type PropsTypes = {
   children: React.ReactNode;
   className?: string;
   id: string;
};
type ContextType = {
   open?: boolean;
   toggle: (value: string) => void;
}

const DropdownHeader: React.FC<PropsTypes> = ({ children, className, id }) => {
   const { toggle } = React.useContext<ContextType>(DropdownContext);

   return (
      <div role='button' className={cn(`inline-block text-sm text-center select-none align-middle border border-gray-500 rounded py-[0.35rem] px-3`, className)} onClick={() => toggle(id)}>
         {children}
         {/* <div className="ms-1.5">
            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" aria-hidden="true" height="1.2em" width="1.2em" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z" clipRule="evenodd"></path></svg>
         </div> */}
      </div>
   )
}

export default DropdownHeader