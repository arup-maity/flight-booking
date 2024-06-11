import React from 'react'
import { cn } from '../utils';

const ModalFooter = ({ children, className }) => {
   return (
      <div className={cn(`flex shrink-0 flex-wrap items-center justify-end p-3`)}>
         {children}
      </div>
   )
}

export default ModalFooter