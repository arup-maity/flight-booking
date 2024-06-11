import React, { ReactNode, useMemo } from 'react'

interface AccordionProps {
   children: ReactNode;
}
export const DropdownContext = React.createContext({});

const DropdownGroup: React.FC<AccordionProps> = ({ children }) => {
   const [open, setOpen] = React.useState<String | Number>('');

   function toggle(value: String | Number) {
      setOpen(value)
      console.log('first', value)
   }
   const dropdownContext = useMemo(() => ({ open, toggle }), [open]);

   return (
      <DropdownContext.Provider value={dropdownContext}>
         <div>{children}</div>
      </DropdownContext.Provider>
   )
}
DropdownGroup.displayName = 'Dropdown'
export default Object.assign(DropdownGroup);
