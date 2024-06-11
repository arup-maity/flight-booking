'use client'
import React, { useEffect, useMemo, useRef } from 'react'
import { DropdownContext } from './Context';
import { cn } from '../utils';
import DropdownHeader from './DropdownHeader';
import DropdownMenu from './DropdownMenu';
import DropdownItem from './DropdownItem';
type PropsTypes = {
   children: React.ReactNode;
   className?: string;
   tag?: string;
};

const Dropdown: React.FC<PropsTypes> = ({ children, className, tag = '' }) => {
   const [open, setOpen] = React.useState<string>('');
   const ref = useRef(null)
   const Tag = tag || 'div'

   useEffect(() => {
      const handleClickOutside = (event) => {
         if (ref.current && !ref.current.contains(event.target)) {
            // Handle outside click logic here
            setOpen('')
            // document.body.style.overflow = "auto";
         }
      };
      document.addEventListener('click', handleClickOutside);
      return () => {
         document.removeEventListener('click', handleClickOutside);
      };
   }, []);

   function toggle(value: string) {
      if (open === value) {
         setOpen('')
         // document.body.style.overflow = "auto";
      } else {
         setOpen(value)
         // document.body.style.overflow = "hidden";
      }
   }
   const dropdownContext = useMemo(() => ({ open, toggle }), [open]);

   return (
      <DropdownContext.Provider value={dropdownContext}>
         <Tag ref={ref} className={cn(`relative inline-block`, className)}>{children}</Tag>
      </DropdownContext.Provider>
   )
}

Dropdown.displayName = "Dropdown";
export default Object.assign(Dropdown, {
   Header: DropdownHeader,
   Menu: DropdownMenu,
   Item: DropdownItem
});
